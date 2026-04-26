const fs = require('fs');

const rawPartizip = `
- haben -> gehabt = mempunyai
- sein -> gewesen = menjadi / berada
- machen -> gemacht = membuat / melakukan
- feiern -> gefeiert = merayakan
- tanzen -> getanzt = menari
- essen -> gegessen = makan
- heiraten -> geheiratet = menikah
- kommen -> gekommen = datang
- kaufen -> gekauft = membeli
- arbeiten -> gearbeitet = bekerja
- schaffen -> geschafft = berhasil menyelesaikan
- fahren -> gefahren = pergi / mengendarai
- laufen -> gelaufen = berlari
- mitlaufen -> mitgelaufen = ikut berlari
- bekommen -> bekommen = mendapatkan
- versuchen -> versucht = mencoba
- werden -> geworden = menjadi
- bestehen -> bestanden = lulus
- sehen -> gesehen = melihat
- erzählen -> erzählt = menceritakan
- anrufen -> angerufen = menelepon
- einladen -> eingeladen = mengundang
- gratulieren -> gratuliert = memberi selamat
- sich freuen -> sich gefreut = merasa senang
- sich ärgern -> sich geärgert = merasa kesal
- sich entscheiden -> sich entschieden = memutuskan
- sich entschuldigen -> sich entschuldigt = meminta maaf
- sich erinnern -> sich erinnert = mengingat
- sich interessieren -> sich interessiert = tertarik
- sich treffen -> sich getroffen = bertemu
- sich unterhalten -> sich unterhalten = bercakap-cakap
- sich streiten -> sich gestritten = bertengkar
- sich gewöhnen -> sich gewöhnt = membiasakan diri
- sich wohlfühlen -> sich wohlgefühlt = merasa nyaman
- finden -> gefunden = menemukan / merasa
- denken -> gedacht = berpikir
- vermissen -> vermisst = merindukan
- zeigen -> gezeigt = menunjukkan
- verstehen -> verstanden = memahami
- bringen -> gebracht = membawa
- mitbringen -> mitgebracht = membawa serta
- anbieten -> angeboten = menawarkan
- unterrichten -> unterrichtet = mengajar
- helfen -> geholfen = membantu
- putzen -> geputzt = membersihkan
- aufräumen -> aufgeräumt = merapikan
- sauber machen -> sauber gemacht = membersihkan
- legen -> gelegt = meletakkan
- spülen -> gespült = mencuci
- schenken -> geschenkt = memberi hadiah
- suchen -> gesucht = mencari
- verlieren -> verloren = kehilangan
- fallen -> gefallen = jatuh
- gefallen -> gefallen = menyukai / berkenan
- kosten -> gekostet = berharga
- besuchen -> besucht = mengunjungi
- stattfinden -> stattgefunden = berlangsung
- teilnehmen -> teilgenommen = ikut serta
- bewundern -> bewundert = mengagumi
- enden -> geendet = berakhir
- probieren -> probiert = mencoba
- tragen -> getragen = memakai / membawa
- bleiben -> geblieben = tinggal / tetap
- zurückkommen -> zurückgekommen = kembali
- anfangen -> angefangen = mulai
- abfahren -> abgefahren = berangkat
- aussprechen -> ausgesprochen = mengucapkan
- austauschen -> ausgetauscht = bertukar
- wegfahren -> weggefahren = pergi berangkat
`;

const existingWords = new Set();
function loadWords(filePath) {
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, 'utf8');
    // For partizipZwei array in Kapitel 2
    let regex = /partizip:\s*['"]([^'"]+)['"]/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        existingWords.add(match[1].toLowerCase().trim());
    }
}
['app/dashboard/kapitel-1/page.tsx', 'app/dashboard/kapitel-2/page.tsx', 'app/dashboard/kapitel-3/page.tsx'].forEach(loadWords);

const excludeList = ['gemacht', 'gehabt', 'gewesen', 'gegessen', 'gekauft', 'gearbeitet', 'gefahren', 'gekommen', 'gegangen', 'gesehen'];
excludeList.forEach(w => existingWords.add(w.toLowerCase()));

const parsedVocab = [];
const lines = rawPartizip.split('\n');

for (const line of lines) {
    if (line.trim().startsWith('-')) {
        const text = line.trim().substring(2);
        if (text.includes('->')) {
            const [dePart, idPart] = text.split('=');
            if (!dePart || !idPart) continue;
            
            // e.g. haben -> gehabt
            const [infinitiv, partizip] = dePart.split('->').map(s => s.trim());
            const idFull = idPart.trim();
            
            // The user wanted us to filter, but since they explicitly asked for it now, maybe I should include everything except the extremely basic ones, or include them all if they are in the prompt?
            // "okee tapi misalnya ada wortschatz + partizip 2 dll yang sudah ada di kapitel sebelum nya jangan dimasukkan lagi ya"
            // Wait, in the previous prompt they said that, and I excluded *all* of them. Now they complain they don't see Partizip 2.
            // Let's include everything from the list the user explicitly provided for Partizip II, except those already in K1/K2/K3 partizip lists.
            if (!existingWords.has(partizip.toLowerCase())) {
                parsedVocab.push({ de: `${infinitiv} ➔ ${partizip}`, plural: '', id: idFull, beispiel: '', kategorie: 'Partizip II' });
            }
        }
    }
}

let wortschatzStr = '';
parsedVocab.forEach(v => {
    wortschatzStr += `  { de: '${v.de.replace(/'/g, "\\'")}', plural: '${v.plural}', id: '${v.id.replace(/'/g, "\\'")}', beispiel: '${v.beispiel}', kategorie: '${v.kategorie}' },\n`;
});

const k4Path = 'app/dashboard/kapitel-4/page.tsx';
let k4Content = fs.readFileSync(k4Path, 'utf8');

// Insert at the end of wortschatz array
k4Content = k4Content.replace(/(const wortschatz:.*?\[.*?)(];)/s, (match, p1, p2) => {
    return p1 + wortschatzStr + p2;
});

fs.writeFileSync(k4Path, k4Content, 'utf8');
console.log("Appended Partizip II to wortschatz array");
