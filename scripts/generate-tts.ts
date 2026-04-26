import fs from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';
import { hoerenData } from '../app/dashboard/data/hoeren-data';
import { config } from 'dotenv';
config({ path: '.env.local' });

const AUDIO_DIR = path.join(process.cwd(), 'public', 'audio');
const TEMP_DIR = path.join(AUDIO_DIR, '.temp');
const MANIFEST_PATH = path.join(AUDIO_DIR, 'audio-manifest.json');

async function ensureDirs() {
  if (!existsSync(AUDIO_DIR)) mkdirSync(AUDIO_DIR, { recursive: true });
  if (!existsSync(TEMP_DIR)) mkdirSync(TEMP_DIR, { recursive: true });
}

function getDuration(filePath: string): number {
  try {
    const output = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`);
    return parseFloat(output.toString().trim());
  } catch (error) {
    console.error('Error getting duration for', filePath, error);
    return 0;
  }
}

async function generateLineAudio(text: string, voice: string, hash: string): Promise<string> {
  const filePath = path.join(TEMP_DIR, `${hash}.mp3`);
  if (existsSync(filePath)) {
    return filePath;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is missing");

  console.log(`Generating TTS for: ${text.substring(0, 30)}...`);
  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'tts-1',
      input: text,
      voice: voice,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API Error: ${err}`);
  }

  const buffer = await response.arrayBuffer();
  await fs.writeFile(filePath, Buffer.from(buffer));
  return filePath;
}

async function concatAudio(inputPaths: string[], outputPath: string) {
  // Create a concat list file
  const listPath = path.join(TEMP_DIR, 'concat.txt');
  const listContent = inputPaths.map(p => `file '${p.replace(/'/g, "'\\''")}'`).join('\n');
  await fs.writeFile(listPath, listContent);

  if (existsSync(outputPath)) {
    await fs.unlink(outputPath);
  }

  execSync(`ffmpeg -f concat -safe 0 -i "${listPath}" -c copy "${outputPath}"`);
  await fs.unlink(listPath);
}

async function main() {
  await ensureDirs();
  
  let manifest: any = {};
  if (existsSync(MANIFEST_PATH)) {
    try {
      manifest = JSON.parse(await fs.readFile(MANIFEST_PATH, 'utf-8'));
    } catch(e) {}
  }

  let totalTracksCreated = 0;

  for (const [chapterId, exercises] of Object.entries(hoerenData)) {
    const chapterDir = path.join(AUDIO_DIR, `kapitel-${chapterId}`);
    if (!existsSync(chapterDir)) mkdirSync(chapterDir, { recursive: true });

    for (const exercise of exercises) {
      // Create hash based on all dialogue text + voice
      const trackContentString = exercise.dialogue.map(d => `${d.text}|${d.voice}`).join('||');
      const trackHash = crypto.createHash('sha256').update(trackContentString).digest('hex').substring(0, 8);
      const trackFileName = `${exercise.trackId}-${trackHash}.mp3`;
      const trackFilePath = path.join(chapterDir, trackFileName);
      const trackUrl = `/audio/kapitel-${chapterId}/${trackFileName}`;

      // Check if this exact track already exists in manifest and matches hash
      if (manifest[exercise.trackId] && manifest[exercise.trackId].scriptHash === trackHash && existsSync(trackFilePath)) {
        console.log(`[SKIP] ${exercise.trackId} - Already exists`);
        continue;
      }

      console.log(`[PROCESS] Generating ${exercise.trackId}...`);
      
      const segments = [];
      const tempPaths = [];
      let currentMs = 0;

      for (let i = 0; i < exercise.dialogue.length; i++) {
        const line = exercise.dialogue[i];
        const lineHash = crypto.createHash('sha256').update(`${line.text}|${line.voice}`).digest('hex');
        
        try {
          const tempPath = await generateLineAudio(line.text, line.voice, lineHash);
          tempPaths.push(tempPath);
          
          const durationSeconds = getDuration(tempPath);
          const durationMs = Math.round(durationSeconds * 1000);
          
          segments.push({
            segmentId: `${exercise.trackId}-seg-${i}`,
            speaker: line.speaker,
            text: line.text,
            startMs: currentMs,
            endMs: currentMs + durationMs
          });
          
          currentMs += durationMs;
        } catch (error) {
          console.error(`Failed to generate audio for ${exercise.trackId} segment ${i}`, error);
          process.exit(1);
        }
      }

      // Concat
      try {
        await concatAudio(tempPaths, trackFilePath);
        
        manifest[exercise.trackId] = {
          chapterId: parseInt(chapterId),
          trackId: exercise.trackId,
          title: exercise.title,
          audioUrl: trackUrl,
          scriptHash: trackHash,
          durationMs: currentMs,
          segments: segments
        };

        totalTracksCreated++;
        console.log(`[SUCCESS] Created ${trackFilePath}`);
        
        // Save manifest progressively
        await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
      } catch (e) {
        console.error(`Failed to concat ${exercise.trackId}`, e);
      }
    }
  }

  console.log(`\nDone! Generated ${totalTracksCreated} new tracks.`);
}

main().catch(console.error);
