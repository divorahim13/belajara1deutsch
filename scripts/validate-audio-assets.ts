import fs from 'fs';
import path from 'path';

const AUDIO_DIR = path.join(process.cwd(), 'public', 'audio');
const MANIFEST_PATH = path.join(AUDIO_DIR, 'audio-manifest.json');

function main() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('❌ audio-manifest.json not found!');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
  let hasErrors = false;
  let trackCount = 0;

  for (const [trackId, data] of Object.entries<any>(manifest)) {
    trackCount++;
    
    // Check missing fields
    if (!data.audioUrl || !data.chapterId || !data.segments) {
      console.error(`❌ ${trackId} is missing required manifest fields`);
      hasErrors = true;
    }

    // Check file exists
    const fullPath = path.join(process.cwd(), 'public', data.audioUrl);
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ Missing audio file for ${trackId} at ${fullPath}`);
      hasErrors = true;
    }

    // Validate segments
    if (data.segments.length === 0) {
      console.error(`❌ ${trackId} has no segments`);
      hasErrors = true;
    }

    // Validate api calls
    if (data.audioUrl.includes('/api/tts')) {
      console.error(`❌ ${trackId} still uses /api/tts`);
      hasErrors = true;
    }
  }

  if (hasErrors) {
    console.error('\nValidation failed. Please fix the errors above.');
    process.exit(1);
  }

  console.log(`✅ All ${trackCount} audio tracks validated successfully.`);
}

main();
