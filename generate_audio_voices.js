import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

let OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  try {
    const envFile = fs.readFileSync('.env.local', 'utf8');
    const match = envFile.match(/OPENAI_API_KEY=([^\s]+)/);
    if (match) {
      OPENAI_API_KEY = match[1];
    }
  } catch (e) {
    // ignore
  }
}

if (!OPENAI_API_KEY) {
  console.error("ERROR: OPENAI_API_KEY is not set in .env.local");
  process.exit(1);
}

const API_URL = "https://api.openai.com/v1/audio/speech";

const generateAudio = async (text, voice, outputPath) => {
  console.log(`Generating line: "${text}" with voice ${voice}...`);
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tts-1",
        voice: voice,
        input: text,
        speed: 1.0, 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`API Error for ${outputPath}:`, errorData);
      return false;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    fs.writeFileSync(outputPath, buffer);
    return true;
  } catch (error) {
    console.error(`Request failed for ${outputPath}:`, error);
    return false;
  }
};

const conversations = [
  {
    output: 'kapitel-1-horen.mp3',
    lines: [
      { voice: 'onyx', text: 'Hallo Maria! Tut mir leid, dass ich zu spät bin.' },
      { voice: 'nova', text: 'Kein Problem. Was ist passiert?' },
      { voice: 'onyx', text: 'Ich bin mit dem Bus gefahren, aber es gab einen Stau, weil es einen Unfall gegeben hat.' },
      { voice: 'nova', text: 'Oh nein! Hast du schon gegessen?' },
      { voice: 'onyx', text: 'Ja, ich habe zu Hause Pizza gegessen.' }
    ]
  },
  {
    output: 'kapitel-1-horen-2.mp3',
    lines: [
      { voice: 'shimmer', text: 'Entschuldigung, haben Sie noch Käsekuchen?' },
      { voice: 'onyx', text: 'Tut mir leid, der Käsekuchen ist leider aus. Aber wir haben noch Apfelstrudel.' },
      { voice: 'shimmer', text: 'Gut, dann nehme ich ein Stück Apfelstrudel und einen Kaffee, bitte.' },
      { voice: 'onyx', text: 'Mit Milch und Zucker?' },
      { voice: 'shimmer', text: 'Nur Milch, bitte.' }
    ]
  },
  {
    output: 'kapitel-2-horen.mp3',
    lines: [
      { voice: 'onyx', text: 'Lena, was möchtest du nach der Schule machen?' },
      { voice: 'nova', text: 'Ich weiß es noch nicht genau. Früher wollte ich Medizin studieren. Aber jetzt denke ich über eine Ausbildung nach.' },
      { voice: 'onyx', text: 'Warum eine Ausbildung?' },
      { voice: 'nova', text: 'Weil ich praktisch arbeiten möchte. Ich durfte letztes Jahr ein Praktikum im Krankenhaus machen. Es war toll, aber ein Studium ist mir vielleicht zu theoretisch.' }
    ]
  },
  {
    output: 'kapitel-2-horen-2.mp3',
    lines: [
      { voice: 'shimmer', text: 'Guten Tag, Herr Weber. Sie interessieren sich für das Praktikum in unserer IT-Abteilung?' },
      { voice: 'onyx', text: 'Ja, genau. Ich habe gerade mein Abitur gemacht und möchte Informatik studieren. Vor dem Studium möchte ich aber praktische Erfahrungen sammeln.' },
      { voice: 'shimmer', text: 'Sehr gut. Haben Sie denn schon Programmierkenntnisse?' },
      { voice: 'onyx', text: 'Ja, ich habe in der Schule schon mit Python und Java gearbeitet.' }
    ]
  }
];

async function main() {
  const publicAudioDir = path.join(process.cwd(), 'public', 'audio');
  const tempDir = path.join(process.cwd(), 'temp_audio');
  
  if (!fs.existsSync(publicAudioDir)) fs.mkdirSync(publicAudioDir, { recursive: true });
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

  const silencePath = path.join(tempDir, 'silence.mp3');
  // Generate 1.2 seconds of silence matching OpenAI TTS specs (24000Hz, mono)
  console.log("Generating silence.mp3...");
  execSync(`ffmpeg -f lavfi -i anullsrc=r=24000:cl=mono -t 1.2 -acodec libmp3lame -b:a 128k "${silencePath}" -y`);

  for (let c = 0; c < conversations.length; c++) {
    const convo = conversations[c];
    console.log(`\nProcessing ${convo.output}...`);
    
    let listContent = "";
    const listTxtPath = path.join(tempDir, `list_${c}.txt`);
    
    for (let i = 0; i < convo.lines.length; i++) {
      const line = convo.lines[i];
      const segmentPath = path.join(tempDir, `c${c}_l${i}.mp3`);
      
      await generateAudio(line.text, line.voice, segmentPath);
      await new Promise(resolve => setTimeout(resolve, 500)); // anti rate limit
      
      // FFmpeg requires forward slashes or escaped backslashes for paths in the concat list
      const safeSegmentPath = segmentPath.replace(/\\/g, '/');
      const safeSilencePath = silencePath.replace(/\\/g, '/');
      
      listContent += `file '${safeSegmentPath}'\n`;
      if (i < convo.lines.length - 1) {
        listContent += `file '${safeSilencePath}'\n`;
      }
    }
    
    fs.writeFileSync(listTxtPath, listContent);
    
    const finalOutputPath = path.join(publicAudioDir, convo.output);
    console.log(`Concatenating files for ${convo.output}...`);
    // Removed -c copy to force re-encoding. This ensures stream consistency and fixes the playback abruptly stopping.
    execSync(`ffmpeg -f concat -safe 0 -i "${listTxtPath}" -b:a 128k "${finalOutputPath}" -y`);
    console.log(`Successfully completed ${convo.output}`);
  }
  
  console.log("Cleaning up temp files...");
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log("All done!");
}

main();
