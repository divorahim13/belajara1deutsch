import fs from 'fs';
import path from 'path';

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

const generateAudio = async (text, outputPath) => {
  console.log(`Generating audio for: ${outputPath}...`);
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tts-1",
        voice: "onyx",
        input: text,
        speed: 1.0, 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`API Error for ${outputPath}:`, errorData);
      return;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    fs.writeFileSync(outputPath, buffer);
    console.log(`Successfully saved ${outputPath}`);
  } catch (error) {
    console.error(`Request failed for ${outputPath}:`, error);
  }
};

const texts = [
  {
    path: path.join(process.cwd(), 'public', 'audio', 'kapitel-1-horen.mp3'),
    text: "Hallo Maria! ... ... ... ... ... ... Tut mir leid, dass ich zu spät bin. ... ... ... ... ... ... Kein Problem. Was ist passiert? ... ... ... ... ... ... Ich bin mit dem Bus gefahren, aber es gab einen Stau, weil es einen Unfall gegeben hat. ... ... ... ... ... ... Oh nein! Hast du schon gegessen? ... ... ... ... ... ... Ja, ich habe zu Hause Pizza gegessen."
  },
  {
    path: path.join(process.cwd(), 'public', 'audio', 'kapitel-1-horen-2.mp3'),
    text: "Entschuldigung, haben Sie noch Käsekuchen? ... ... ... ... ... ... Tut mir leid, der Käsekuchen ist leider aus. Aber wir haben noch Apfelstrudel. ... ... ... ... ... ... Gut, dann nehme ich ein Stück Apfelstrudel und einen Kaffee, bitte. ... ... ... ... ... ... Mit Milch und Zucker? ... ... ... ... ... ... Nur Milch, bitte."
  },
  {
    path: path.join(process.cwd(), 'public', 'audio', 'kapitel-2-horen.mp3'),
    text: "Lena, was möchtest du nach der Schule machen? ... ... ... ... ... ... Ich weiß es noch nicht genau. Früher wollte ich Medizin studieren. Aber jetzt denke ich über eine Ausbildung nach. ... ... ... ... ... ... Warum eine Ausbildung? ... ... ... ... ... ... Weil ich praktisch arbeiten möchte. Ich durfte letztes Jahr ein Praktikum im Krankenhaus machen. Es war toll, aber ein Studium ist mir vielleicht zu theoretisch."
  },
  {
    path: path.join(process.cwd(), 'public', 'audio', 'kapitel-2-horen-2.mp3'),
    text: "Guten Tag, Herr Weber. Sie interessieren sich für das Praktikum in unserer IT-Abteilung? ... ... ... ... ... ... Ja, genau. Ich habe gerade mein Abitur gemacht und möchte Informatik studieren. Vor dem Studium möchte ich aber praktische Erfahrungen sammeln. ... ... ... ... ... ... Sehr gut. Haben Sie denn schon Programmierkenntnisse? ... ... ... ... ... ... Ja, ich habe in der Schule schon mit Python und Java gearbeitet."
  }
];

async function main() {
  const publicAudioDir = path.join(process.cwd(), 'public', 'audio');
  if (!fs.existsSync(publicAudioDir)) {
    fs.mkdirSync(publicAudioDir, { recursive: true });
  }

  for (const item of texts) {
    await generateAudio(item.text, item.path);
    // Add a small delay between requests to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log("All audio generation complete!");
}

main();
