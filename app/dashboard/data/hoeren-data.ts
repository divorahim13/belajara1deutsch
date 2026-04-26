

// Types
export type DialogueLine = {
  speaker: string;
  text: string;
  voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
};

export type HorenExercise = {
  id: number;
  trackId: string;
  title: string;
  desc: string;
  dialogue: DialogueLine[];
  questions: {
    q: string;
    options: string[];
    correct: number;
  }[];
};

export const hoerenData: Record<number, HorenExercise[]> = {
  1: [
    {
      id: 1,
      trackId: 'k1-track-1',
      title: 'Übung 1: Der Termin',
      desc: 'Dengarkan percakapan berikut und jawab pertanyaannya.',
      dialogue: [
        { speaker: "Lukas", voice: "onyx", text: "Hallo Maria! Tut mir leid, dass ich zu spät bin. Ich hoffe, du wartest noch nicht lange." },
        { speaker: "Maria", voice: "nova", text: "Hallo Lukas. Kein Problem. Ich bin auch erst seit fünf Minuten hier. Was ist denn passiert?" },
        { speaker: "Lukas", voice: "onyx", text: "Ich bin mit dem Bus gefahren, weil mein Auto kaputt ist. Aber es gab einen großen Stau in der Innenstadt." },
        { speaker: "Maria", voice: "nova", text: "Oh je! Warum gab es einen Stau? Ist etwas Schlimmes passiert?" },
        { speaker: "Lukas", voice: "onyx", text: "Ja, weil es leider einen Autounfall gegeben hat. Das war furchtbar, die Polizei war auch da." },
        { speaker: "Maria", voice: "nova", text: "Oh nein, das tut mir leid! Hauptsache dir geht es gut. Hast du denn heute schon etwas gegessen?" },
        { speaker: "Lukas", voice: "onyx", text: "Ja, zum Glück. Ich habe zu Hause schon eine leckere Pizza gegessen. Wir können aber gerne einen Kaffee trinken." }
      ],
      questions: [
        { q: "1. Warum ist Lukas zu spät?", options: ["Weil es einen Stau und Unfall gab.", "Weil er zu Hause Pizza gegessen hat.", "Weil er den Bus verpasst hat."], correct: 0 },
        { q: "2. Womit ist Lukas gefahren?", options: ["Mit dem Zug.", "Mit dem Bus.", "Mit dem Auto."], correct: 1 },
        { q: "3. Was hat Lukas vor dem Treffen gemacht?", options: ["Er hat Pizza gegessen.", "Er hat Maria angerufen.", "Er hat den Arzt besucht."], correct: 0 }
      ]
    },
    {
      id: 2,
      trackId: 'k1-track-2',
      title: 'Übung 2: Im Café',
      desc: 'Dengarkan pesanan pelanggan di sebuah kafe.',
      dialogue: [
        { speaker: "Kunde", voice: "onyx", text: "Guten Tag. Entschuldigung, haben Sie noch ein Stück Käsekuchen?" },
        { speaker: "Kellnerin", voice: "nova", text: "Guten Tag! Tut mir leid, der Käsekuchen ist leider schon aus. Wir hatten heute sehr viele Gäste." },
        { speaker: "Kunde", voice: "onyx", text: "Schade! Der Käsekuchen hier ist immer so gut. Was für Kuchen haben Sie denn noch?" },
        { speaker: "Kellnerin", voice: "nova", text: "Wir haben noch frischen Apfelstrudel und Schokoladentorte. Der Apfelstrudel ist sehr lecker und noch warm." },
        { speaker: "Kunde", voice: "onyx", text: "Gut, dann nehme ich ein Stück Apfelstrudel und einen großen Kaffee, bitte." },
        { speaker: "Kellnerin", voice: "nova", text: "Sehr gerne. Möchten Sie den Kaffee mit Milch und Zucker?" },
        { speaker: "Kunde", voice: "onyx", text: "Nur mit Milch, bitte. Ich trinke keinen Zucker. Und bringen Sie mir bitte auch ein Glas Wasser." },
        { speaker: "Kellnerin", voice: "nova", text: "Alles klar. Ein Apfelstrudel, ein Kaffee mit Milch und ein Glas Wasser. Das kommt sofort." }
      ],
      questions: [
        { q: "1. Was möchte der Kunde zuerst bestellen?", options: ["Apfelstrudel", "Käsekuchen", "Schokoladenkuchen"], correct: 1 },
        { q: "2. Was nimmt der Kunde am Ende?", options: ["Apfelstrudel und Tee", "Apfelstrudel und Kaffee", "Käsekuchen und Kaffee"], correct: 1 },
        { q: "3. Wie trinkt der Kunde seinen Kaffee?", options: ["Mit Milch und Zucker", "Schwarz", "Nur mit Milch"], correct: 2 }
      ]
    },
    {
      id: 3,
      trackId: 'k1-track-3',
      title: 'Übung 3: Verspätung am Bahnhof',
      desc: 'Dengarkan percakapan di stasiun kereta.',
      dialogue: [
        { speaker: "Lisa", voice: "nova", text: "Entschuldigung, ist der Zug nach München schon abgefahren? Ich kann ihn auf der Anzeigetafel nicht finden." },
        { speaker: "Markus", voice: "onyx", text: "Nein, er hat ungefähr 20 Minuten Verspätung. Er kommt voraussichtlich erst um Viertel nach drei." },
        { speaker: "Lisa", voice: "nova", text: "Oh je, wissen Sie vielleicht, warum der Zug Verspätung hat? Ich habe nämlich einen wichtigen Termin." },
        { speaker: "Markus", voice: "onyx", text: "Ja, es gab leider ein technisches Problem mit dem Signal. Deshalb müssen alle Züge langsam fahren." },
        { speaker: "Lisa", voice: "nova", text: "Vielen Dank für die Information! Wissen Sie auch, wo Gleis 5 ist? Ich bin zum ersten Mal hier." },
        { speaker: "Markus", voice: "onyx", text: "Ja, natürlich. Sie müssen einfach die Treppe da hinten runtergehen und dann durch den Tunnel." },
        { speaker: "Lisa", voice: "nova", text: "Treppe runter, und dann?" },
        { speaker: "Markus", voice: "onyx", text: "Und dann gehen Sie gleich nach rechts. Da ist Gleis 5. Sie können es nicht verfehlen." }
      ],
      questions: [
        { q: "1. Wohin fährt der Zug?", options: ["Nach Berlin", "Nach München", "Nach Hamburg"], correct: 1 },
        { q: "2. Warum hat der Zug Verspätung?", options: ["Viel Schnee.", "Zugführer krank.", "Technisches Problem."], correct: 2 },
        { q: "3. Wo ist Gleis 5?", options: ["Treppe runter, rechts.", "Treppe rauf, links.", "Gleich hier rechts."], correct: 0 }
      ]
    }
  ],
  2: [
    {
      id: 1,
      trackId: 'k2-track-1',
      title: 'Übung 1: Erinnerungen an die Schulzeit',
      desc: 'Dengarkan percakapan tentang masa sekolah.',
      dialogue: [
        { speaker: "Julia", voice: "nova", text: "Weißt du noch, wie es in der Grundschule war? Ich habe unsere alte Lehrerin, Frau Müller, sehr gemocht." },
        { speaker: "Tim", voice: "onyx", text: "Ja, sie war immer sehr nett. Aber Mathematik war mein Hassfach. Ich habe die Hausaufgaben nie verstanden." },
        { speaker: "Julia", voice: "nova", text: "Wirklich? Ich fand Mathe eigentlich ganz gut. Aber im Sportunterricht war ich furchtbar schlecht. Ich konnte nicht schnell laufen." },
        { speaker: "Tim", voice: "onyx", text: "Dafür hast du immer gute Noten in Deutsch und Englisch geschrieben. Du wolltest doch mal Übersetzerin werden, oder?" },
        { speaker: "Julia", voice: "nova", text: "Genau. Aber nach dem Abitur habe ich mich entschieden, Medizin zu studieren. Und was hast du nach der Schule gemacht?" },
        { speaker: "Tim", voice: "onyx", text: "Ich habe eine Ausbildung als Mechatroniker gemacht. Das war die beste Entscheidung für mich. Ich arbeite gerne mit meinen Händen." }
      ],
      questions: [
        { q: "1. Welches Fach mochte Tim in der Schule nicht?", options: ["Deutsch", "Sport", "Mathematik"], correct: 2 },
        { q: "2. Was war Julias Problem in der Schule?", options: ["Sie konnte nicht rechnen.", "Sie war schlecht in Sport.", "Sie hat die Lehrerin gehasst."], correct: 1 },
        { q: "3. Was hat Tim nach der Schule gemacht?", options: ["Er hat Medizin studiert.", "Er hat eine Ausbildung gemacht.", "Er wurde Übersetzer."], correct: 1 }
      ]
    },
    {
      id: 2,
      trackId: 'k2-track-2',
      title: 'Übung 2: Das Zeugnis',
      desc: 'Dengarkan percakapan tentang nilai rapor.',
      dialogue: [
        { speaker: "Mutter", voice: "shimmer", text: "Leon, zeigst du mir bitte dein Zeugnis? Das Schuljahr ist doch heute zu Ende." },
        { speaker: "Leon", voice: "echo", text: "Ja, hier ist es. Aber du darfst nicht böse sein, Mama. Ich habe in Englisch leider nur eine Vier." },
        { speaker: "Mutter", voice: "shimmer", text: "Eine Vier? Aber du hast doch so viel Vokabeln gelernt! Woran lag es denn?" },
        { speaker: "Leon", voice: "echo", text: "Die Grammatik war sehr schwer, besonders das Perfekt. Der Lehrer hat auch viele Überraschungstests geschrieben." },
        { speaker: "Mutter", voice: "shimmer", text: "Nun gut, dafür hast du in Biologie und Geschichte eine Zwei. Das ist wirklich toll! Du hast dich dort sehr verbessert." },
        { speaker: "Leon", voice: "echo", text: "Danke! Im nächsten Schuljahr möchte ich mich in Englisch mehr anstrengen. Vielleicht kannst du mir abends beim Lernen helfen?" }
      ],
      questions: [
        { q: "1. In welchem Fach hat Leon eine Vier?", options: ["Biologie", "Englisch", "Geschichte"], correct: 1 },
        { q: "2. Warum war Englisch schwer für Leon?", options: ["Er hat nicht gelernt.", "Die Grammatik war schwer.", "Der Lehrer war neu."], correct: 1 },
        { q: "3. In welchen Fächern war Leon gut?", options: ["Biologie und Geschichte", "Mathematik und Sport", "Deutsch und Kunst"], correct: 0 }
      ]
    },
    {
      id: 3,
      trackId: 'k2-track-3',
      title: 'Übung 3: Der erste Arbeitstag',
      desc: 'Dengarkan pengalaman hari pertama bekerja.',
      dialogue: [
        { speaker: "Sarah", voice: "nova", text: "Hallo Markus! Wie war dein erster Tag im neuen Büro?" },
        { speaker: "Markus", voice: "onyx", text: "Ziemlich anstrengend, aber gut. Meine Kollegen sind alle sehr freundlich und haben mir viel erklärt." },
        { speaker: "Sarah", voice: "nova", text: "Musstest du schon viel arbeiten oder haben sie dir nur alles gezeigt?" },
        { speaker: "Markus", voice: "onyx", text: "Am Vormittag hatte ich eine kleine Einführung. Danach musste ich schon meine ersten E-Mails an Kunden schreiben." },
        { speaker: "Sarah", voice: "nova", text: "Hast du denn schon einen eigenen Schreibtisch und einen Computer?" },
        { speaker: "Markus", voice: "onyx", text: "Ja, alles war schon vorbereitet. Morgen lerne ich dann das neue Software-Programm kennen." }
      ],
      questions: [
        { q: "1. Wie fand Markus seinen ersten Arbeitstag?", options: ["Langweilig", "Anstrengend, aber gut", "Schrecklich"], correct: 1 },
        { q: "2. Was hat Markus am Nachmittag gemacht?", options: ["Er hat Pause gemacht.", "Er hat E-Mails geschrieben.", "Er hat Software gelernt."], correct: 1 },
        { q: "3. Was macht Markus am nächsten Tag?", options: ["Er bekommt einen Schreibtisch.", "Er fährt zu Kunden.", "Er lernt das Software-Programm."], correct: 2 }
      ]
    }
  ],
  3: [
    {
      id: 1,
      trackId: 'k3-track-1',
      title: 'Übung 1: Medien im Alltag',
      desc: 'Dengarkan wawancara tentang penggunaan media.',
      dialogue: [
        { speaker: "Interviewer", voice: "echo", text: "Entschuldigung, darf ich Ihnen ein paar Fragen zum Thema Medien stellen? Wie oft nutzen Sie das Internet?" },
        { speaker: "Frau Schmidt", voice: "shimmer", text: "Ja, gerne. Ich bin eigentlich jeden Tag online. Ich lese morgens die Nachrichten auf meinem Tablet und schreibe viele E-Mails für die Arbeit." },
        { speaker: "Interviewer", voice: "echo", text: "Nutzen Sie auch soziale Netzwerke wie Instagram oder Facebook?" },
        { speaker: "Frau Schmidt", voice: "shimmer", text: "Nein, soziale Netzwerke mag ich nicht besonders. Das kostet mir zu viel Zeit. Aber ich schaue abends gerne Serien auf Streaming-Portalen." },
        { speaker: "Interviewer", voice: "echo", text: "Kaufen Sie noch gedruckte Zeitungen oder Bücher?" },
        { speaker: "Frau Schmidt", voice: "shimmer", text: "Zeitungen lese ich nur digital. Aber Bücher kaufe ich noch als echtes Papierbuch. Ich mag das Gefühl, ein Buch in der Hand zu halten." }
      ],
      questions: [
        { q: "1. Wofür nutzt Frau Schmidt das Internet am Morgen?", options: ["Für soziale Netzwerke", "Um Nachrichten zu lesen", "Um Spiele zu spielen"], correct: 1 },
        { q: "2. Warum mag sie keine sozialen Netzwerke?", options: ["Sie sind zu teuer.", "Sie kosten zu viel Zeit.", "Sie hat kein Smartphone."], correct: 1 },
        { q: "3. Was kauft sie noch als physisches Produkt?", options: ["Zeitungen", "Filme", "Bücher"], correct: 2 }
      ]
    },
    {
      id: 2,
      trackId: 'k3-track-2',
      title: 'Übung 2: Ein neues Smartphone',
      desc: 'Dengarkan percakapan di toko elektronik.',
      dialogue: [
        { speaker: "Verkäufer", voice: "onyx", text: "Guten Tag, wie kann ich Ihnen helfen? Suchen Sie ein bestimmtes Handy?" },
        { speaker: "Kundin", voice: "nova", text: "Guten Tag. Ja, mein altes Smartphone ist kaputtgegangen. Ich brauche ein neues, aber es soll nicht zu teuer sein." },
        { speaker: "Verkäufer", voice: "onyx", text: "Verstehe. Ist Ihnen die Kamera wichtig, oder brauchen Sie vor allem viel Speicherplatz?" },
        { speaker: "Kundin", voice: "nova", text: "Die Kamera ist mir sehr wichtig, weil ich im Urlaub viele Fotos mache. Der Akku sollte auch lange halten." },
        { speaker: "Verkäufer", voice: "onyx", text: "Dann empfehle ich Ihnen dieses Modell hier. Es hat eine exzellente Kamera und der Akku hält zwei Tage. Es kostet 350 Euro." },
        { speaker: "Kundin", voice: "nova", text: "Das klingt gut und der Preis ist in Ordnung. Hat das Gerät auch zwei Jahre Garantie?" },
        { speaker: "Verkäufer", voice: "onyx", text: "Ja, selbstverständlich. Wenn etwas kaputtgeht, reparieren wir es kostenlos." }
      ],
      questions: [
        { q: "1. Warum braucht die Kundin ein neues Handy?", options: ["Sie hat ihr altes verloren.", "Ihr altes Handy ist kaputt.", "Sie möchte ein moderneres."], correct: 1 },
        { q: "2. Was ist der Kundin besonders wichtig?", options: ["Viel Speicherplatz", "Gute Kamera und Akku", "Ein großes Display"], correct: 1 },
        { q: "3. Wie viel kostet das empfohlene Handy?", options: ["350 Euro", "450 Euro", "250 Euro"], correct: 0 }
      ]
    },
    {
      id: 3,
      trackId: 'k3-track-3',
      title: 'Übung 3: Probleme mit dem WLAN',
      desc: 'Dengarkan panggilan ke layanan pelanggan internet.',
      dialogue: [
        { speaker: "Support", voice: "fable", text: "Technischer Support von NetCom, guten Tag. Was kann ich für Sie tun?" },
        { speaker: "Herr Weber", voice: "onyx", text: "Guten Tag, hier spricht Weber. Mein Internet funktioniert seit heute Morgen nicht mehr. Das WLAN-Signal ist komplett weg." },
        { speaker: "Support", voice: "fable", text: "Das tut mir leid, Herr Weber. Haben Sie den Router schon einmal neu gestartet?" },
        { speaker: "Herr Weber", voice: "onyx", text: "Ja, das habe ich schon zweimal gemacht. Ich habe auch das Kabel überprüft, aber alles sieht normal aus. Die Lampe leuchtet nur rot." },
        { speaker: "Support", voice: "fable", text: "Ah, eine rote Lampe bedeutet, dass es eine Störung in der Leitung gibt. In Ihrer Straße gibt es momentan Bauarbeiten, das könnte der Grund sein." },
        { speaker: "Herr Weber", voice: "onyx", text: "Wie lange wird das dauern? Ich muss dringend im Home-Office arbeiten." },
        { speaker: "Support", voice: "fable", text: "Die Techniker sind bereits vor Ort. Bis heute Abend sollte das Internet wieder einwandfrei funktionieren. Wir bitten um Entschuldigung." }
      ],
      questions: [
        { q: "1. Welches Problem hat Herr Weber?", options: ["Sein Computer ist kaputt.", "Sein Internet funktioniert nicht.", "Sein Passwort ist falsch."], correct: 1 },
        { q: "2. Was hat Herr Weber bereits versucht?", options: ["Router neu gestartet", "Neues Kabel gekauft", "Die Techniker gerufen"], correct: 0 },
        { q: "3. Warum gibt es wahrscheinlich kein Internet?", options: ["Weil Herr Weber nicht bezahlt hat.", "Weil es Bauarbeiten in der Straße gibt.", "Weil der Router alt ist."], correct: 1 }
      ]
    }
  ],
  4: [
    {
      id: 1,
      trackId: 'k4-track-1',
      title: 'Übung 1: Schlechte Laune',
      desc: 'Warum haben Max, Bea und Anna schlechte Laune?',
      dialogue: [
        { speaker: "Max", voice: "onyx", text: "Hallo zusammen. Oh Mann, ich bin heute so genervt! Meine Abschlussprüfung heute Morgen war furchtbar schwer. Ich habe so viel dafür gelernt, aber ich habe bestimmt nicht bestanden." },
        { speaker: "Bea", voice: "nova", text: "Ach Max, reg dich nicht auf. Es wird schon nicht so schlimm sein. Du hast doch wochenlang dafür gelernt! Bei mir lief es heute aber auch schlecht. Ich hatte eine lange Diskussion mit meiner Chefin über meine Arbeitszeiten. Das war wirklich anstrengend und ich habe mich sehr geärgert." },
        { speaker: "Anna", voice: "shimmer", text: "Leute, ihr glaubt es nicht. Ich kann mein Handy nirgendwo finden! Ich habe schon überall gesucht, aber ich denke, es ist nicht mehr da. Ich habe es bestimmt in der U-Bahn verloren!" },
        { speaker: "Luca", voice: "alloy", text: "Puh, was für ein schlechter Tag für uns alle. Wir haben wohl heute alle Pech gehabt. Wir sollten etwas tun, um unsere Laune zu verbessern. Wie wäre es mit einem gemütlichen Abendessen?" }
      ],
      questions: [
        { q: "1. Wer hatte eine Diskussion mit der Chefin?", options: ["Bea", "Max", "Anna"], correct: 0 },
        { q: "2. Wer hatte eine schwere Prüfung?", options: ["Max", "Bea", "Luca"], correct: 0 },
        { q: "3. Wer denkt, dass das Handy verloren ist?", options: ["Luca", "Anna", "Bea"], correct: 1 }
      ]
    },
    {
      id: 2,
      trackId: 'k4-track-2',
      title: 'Übung 2: Alles wieder gut',
      desc: 'Was machen Anna, Max und Bea? Was machen sie nicht?',
      dialogue: [
        { speaker: "Max", voice: "onyx", text: "So, Leute, wir können nicht den ganzen Tag traurig sein. Jetzt räumen wir mal gemeinsam auf. Danach kochen wir etwas Leckeres, dann geht es uns bestimmt besser. Ich putze die Küche und bringe den Müll raus." },
        { speaker: "Anna", voice: "shimmer", text: "Das ist eine gute Idee, Max. Bewegung hilft immer gegen Stress. Ich räume die Bücher und Zeitschriften im Wohnzimmer auf. Die liegen überall herum." },
        { speaker: "Bea", voice: "nova", text: "Und ich helfe dir dabei, Anna. Ich kann auch den Boden saugen. Das Geschirr haben wir zum Glück gestern schon gespült, das müssen wir heute nicht mehr machen. So sind wir schnell fertig." },
        { speaker: "Luca", voice: "alloy", text: "Super! Und ich gehe schnell in den Supermarkt und kaufe die Zutaten für unser Abendessen ein. Was möchtet ihr essen?" }
      ],
      questions: [
        { q: "1. Wer putzt die Küche?", options: ["Max", "Bea", "Anna"], correct: 0 },
        { q: "2. Wer räumt die Bücher auf?", options: ["Anna", "Max", "Bea"], correct: 0 },
        { q: "3. Wer geht in den Supermarkt?", options: ["Luca", "Anna", "Max"], correct: 0 }
      ]
    },
    {
      id: 3,
      trackId: 'k4-track-3',
      title: 'Übung 3: Herzlichen Glückwunsch!',
      desc: 'Dengarkan percakapan tentang ucapan selamat.',
      dialogue: [
        { speaker: "Klara", voice: "nova", text: "Hallo Thomas! Herzlichen Glückwunsch zum Geburtstag! Ich wünsche dir alles Gute, viel Gesundheit und Erfolg im neuen Lebensjahr." },
        { speaker: "Thomas", voice: "onyx", text: "Vielen Dank, Klara! Ich freue mich sehr, dass du an mich gedacht hast. Komm doch heute Abend vorbei, wir feiern ein bisschen im Garten." },
        { speaker: "Klara", voice: "nova", text: "Oh, das ist eine tolle Idee. Soll ich etwas mitbringen? Einen Salat oder Getränke?" },
        { speaker: "Thomas", voice: "onyx", text: "Wenn du möchtest, kannst du gerne einen Salat mitbringen. Fleisch und Getränke habe ich schon eingekauft." },
        { speaker: "Klara", voice: "nova", text: "Abgemacht. Dann mache ich meinen berühmten Kartoffelsalat. Bis heute Abend!" }
      ],
      questions: [
        { q: "1. Warum gratuliert Klara Thomas?", options: ["Zum neuen Job", "Zum Geburtstag", "Zum neuen Haus"], correct: 1 },
        { q: "2. Was soll Klara zur Feier mitbringen?", options: ["Einen Salat", "Getränke", "Fleisch"], correct: 0 },
        { q: "3. Wo findet die Feier statt?", options: ["Im Restaurant", "Im Wohnzimmer", "Im Garten"], correct: 2 }
      ]
    }
  ],
  5: [
    {
      id: 1,
      trackId: 'k5-track-1',
      title: 'Übung 1: Vorstellungsgespräch im Hotel',
      desc: 'Hören Sie das Vorstellungsgespräch.',
      dialogue: [
        { speaker: "Personalchef", voice: "onyx", text: "Guten Tag, Herr Silva. Nehmen Sie bitte Platz. Ich habe Ihren Lebenslauf gelesen. Sie haben also schon Erfahrung in Hotels?" },
        { speaker: "Herr Silva", voice: "echo", text: "Guten Tag! Ja, genau. Ich habe drei Jahre in einem großen Hotel im Ausland an der Rezeption gearbeitet." },
        { speaker: "Personalchef", voice: "onyx", text: "Sehr gut. Suchen Sie eine Stelle in Teilzeit oder in Vollzeit?" },
        { speaker: "Herr Silva", voice: "echo", text: "Ich suche eine Stelle in Teilzeit, etwa 20 Stunden pro Woche. Ich studiere nämlich noch an der Universität." },
        { speaker: "Personalchef", voice: "onyx", text: "Das passt gut. Wir suchen jemanden für die Nachmittags- und Abendschichten. Ab wann könnten Sie anfangen?" }
      ],
      questions: [
        { q: "1. Wo hat Herr Silva vorher gearbeitet?", options: ["In einem Restaurant", "In einem Hotel im Ausland", "In einer Bank"], correct: 1 },
        { q: "2. Was für eine Stelle sucht Herr Silva?", options: ["Vollzeit", "Nur am Wochenende", "Teilzeit (20 Stunden)"], correct: 2 },
        { q: "3. Warum möchte er nicht Vollzeit arbeiten?", options: ["Weil er noch studiert.", "Weil er Kinder hat.", "Weil er müde ist."], correct: 0 }
      ]
    },
    {
      id: 2,
      trackId: 'k5-track-2',
      title: 'Übung 2: Ein Job für Max',
      desc: 'Max sucht einen Nebenjob.',
      dialogue: [
        { speaker: "Max", voice: "echo", text: "Hey Leute, ich brauche unbedingt einen Job. Das Geld reicht hinten und vorne nicht." },
        { speaker: "Anna", voice: "shimmer", text: "Hast du schon die Stellenanzeigen im Internet gelesen? In dem Café an der Ecke suchen sie eine Aushilfe." },
        { speaker: "Max", voice: "echo", text: "Echt? Weißt du, wie viel man da verdient? Ist der Lohn gut?" },
        { speaker: "Anna", voice: "shimmer", text: "Ich glaube, das Gehalt liegt bei 12 Euro pro Stunde. Außerdem sind die Kollegen dort sehr nett." },
        { speaker: "Max", voice: "echo", text: "Das klingt super. Ich schreibe gleich eine Bewerbung und gehe heute Nachmittag mal vorbei." }
      ],
      questions: [
        { q: "1. Welches Problem hat Max?", options: ["Er ist krank.", "Er braucht Geld und sucht einen Job.", "Er findet seine Schlüssel nicht."], correct: 1 },
        { q: "2. Wo soll Max laut Anna arbeiten?", options: ["In einem Café an der Ecke", "In einer Fabrik", "Im Supermarkt"], correct: 0 },
        { q: "3. Wie viel verdient man dort pro Stunde?", options: ["10 Euro", "15 Euro", "12 Euro"], correct: 2 }
      ]
    },
    {
      id: 3,
      trackId: 'k5-track-3',
      title: 'Übung 3: Auf der Bank',
      desc: 'Ein neues Konto eröffnen.',
      dialogue: [
        { speaker: "Kunde", voice: "onyx", text: "Guten Morgen. Ich möchte gerne ein Girokonto eröffnen." },
        { speaker: "Bankangestellte", voice: "nova", text: "Guten Morgen. Sehr gerne. Haben Sie Ihren Pass und die Meldebescheinigung dabei?" },
        { speaker: "Kunde", voice: "onyx", text: "Ja, hier bitte. Ich brauche das Konto für meinen Lohn. Bekomme ich auch eine Bankkarte?" },
        { speaker: "Bankangestellte", voice: "nova", text: "Natürlich. Ich fülle das Formular aus, Sie müssen hier nur noch unterschreiben. Die Karte schicken wir Ihnen per Post. Die Geheimzahl kommt ein paar Tage später." },
        { speaker: "Kunde", voice: "onyx", text: "Wunderbar. Kann ich mit der Karte auch kostenlos Geld abheben?" },
        { speaker: "Bankangestellte", voice: "nova", text: "An allen unseren Automaten ist das Abheben und Einzahlen gebührenfrei. Auch Überweisungen machen Sie einfach am Automaten oder online." }
      ],
      questions: [
        { q: "1. Was möchte der Kunde?", options: ["Geld überweisen", "Ein Girokonto eröffnen", "Einen Kredit beantragen"], correct: 1 },
        { q: "2. Welche Dokumente hat der Kunde dabei?", options: ["Führerschein", "Pass und Meldebescheinigung", "Nur den Pass"], correct: 1 },
        { q: "3. Wie bekommt er die Geheimzahl (PIN)?", options: ["Gleich in der Bank", "Per E-Mail", "Per Post ein paar Tage nach der Karte"], correct: 2 }
      ]
    },
    {
      id: 4,
      trackId: 'k5-track-4',
      title: 'Übung 4: Auf der Behörde',
      desc: 'Warten auf dem Amt.',
      dialogue: [
        { speaker: "Frau Müller", voice: "shimmer", text: "Entschuldigung, ich brauche eine Meldebescheinigung. Muss ich hier lange warten?" },
        { speaker: "Beamter", voice: "fable", text: "Haben Sie schon eine Nummer gezogen? Die Wartezeit beträgt aktuell etwa 45 Minuten. Es ist heute sehr voll auf der Behörde." },
        { speaker: "Frau Müller", voice: "shimmer", text: "Ja, ich habe Nummer 42. Wissen Sie, ob ich hier auch meinen Pass verlängern kann?" },
        { speaker: "Beamter", voice: "fable", text: "Nein, für den Pass müssen Sie in den ersten Stock zu Zimmer 12. Aber dafür müssen Sie erst dieses Formular ausfüllen." },
        { speaker: "Frau Müller", voice: "shimmer", text: "Vielen Dank für die Information. Dann fülle ich das Formular gleich mal aus, während ich warte." }
      ],
      questions: [
        { q: "1. Was braucht Frau Müller zuerst?", options: ["Einen neuen Pass", "Eine Meldebescheinigung", "Ein Visum"], correct: 1 },
        { q: "2. Wie lange ist die Wartezeit?", options: ["10 Minuten", "Eine Stunde", "Etwa 45 Minuten"], correct: 2 },
        { q: "3. Was muss sie für den Pass machen?", options: ["In Zimmer 12 gehen und ein Formular ausfüllen", "Morgen wiederkommen", "Gar nichts"], correct: 0 }
      ]
    },
    {
      id: 5,
      trackId: 'k5-track-5',
      title: 'Übung 5: Bei der Polizei',
      desc: 'Ein Diebstahl wird gemeldet.',
      dialogue: [
        { speaker: "Polizistin", voice: "nova", text: "Polizeiinspektion Mitte, was kann ich für Sie tun?" },
        { speaker: "Herr Wagner", voice: "onyx", text: "Guten Tag. Ich möchte einen Diebstahl anzeigen. Mir wurde gerade mein Portemonnaie gestohlen." },
        { speaker: "Polizistin", voice: "nova", text: "Das tut mir leid. Wo ist das genau passiert?" },
        { speaker: "Herr Wagner", voice: "onyx", text: "In der U-Bahn Linie 3, zwischen Hauptbahnhof und Universität. In dem Portemonnaie waren mein Ausweis, 50 Euro und meine Bankkarte." },
        { speaker: "Polizistin", voice: "nova", text: "Haben Sie Ihre Bankkarte schon gesperrt? Das ist sehr wichtig. Danach nehmen wir das Protokoll auf." },
        { speaker: "Herr Wagner", voice: "onyx", text: "Ja, die Karte habe ich sofort per Handy gesperrt." }
      ],
      questions: [
        { q: "1. Warum ist Herr Wagner bei der Polizei?", options: ["Er hatte einen Unfall.", "Er möchte einen Diebstahl anzeigen.", "Er hat ein Portemonnaie gefunden."], correct: 1 },
        { q: "2. Wo ist der Diebstahl passiert?", options: ["Im Supermarkt", "Auf der Straße", "In der U-Bahn"], correct: 2 },
        { q: "3. Was befand sich im Portemonnaie?", options: ["Nur Geld", "Ausweis, 50 Euro und Bankkarte", "Schlüssel und Handy"], correct: 1 }
      ]
    },
    {
      id: 6,
      trackId: 'k5-track-6',
      title: 'Übung 6: Höfliche Bitten im Büro',
      desc: 'Bitten mit Konjunktiv II.',
      dialogue: [
        { speaker: "Herr Weber", voice: "onyx", text: "Frau Schmidt, hätten Sie einen Moment Zeit? Könnten Sie mir bitte helfen?" },
        { speaker: "Frau Schmidt", voice: "nova", text: "Natürlich, Herr Weber. Was gibt es?" },
        { speaker: "Herr Weber", voice: "onyx", text: "Könnten Sie vielleicht das Fenster schließen? Es ist ziemlich kalt hier im Büro. Und dürften Sie danach diese Dokumente für mich kopieren?" },
        { speaker: "Frau Schmidt", voice: "nova", text: "Gerne. Ich mache das Fenster sofort zu. Wie viele Kopien brauchen Sie?" },
        { speaker: "Herr Weber", voice: "onyx", text: "Drei Stück, bitte. Das ist sehr höflich von Ihnen. Vielen Dank!" }
      ],
      questions: [
        { q: "1. Warum bittet Herr Weber, das Fenster zu schließen?", options: ["Weil es regnet.", "Weil es laut ist.", "Weil es kalt im Büro ist."], correct: 2 },
        { q: "2. Welche Aufgabe soll Frau Schmidt danach erledigen?", options: ["Kaffee kochen", "Dokumente kopieren", "Den Chef anrufen"], correct: 1 },
        { q: "3. Wie viele Kopien braucht Herr Weber?", options: ["Zwei", "Drei", "Fünf"], correct: 1 }
      ]
    },
    {
      id: 7,
      trackId: 'k5-track-7',
      title: 'Übung 7: Interview: Stadt oder Land?',
      desc: 'Vor- und Nachteile der Stadt.',
      dialogue: [
        { speaker: "Interviewer", voice: "echo", text: "Wir machen heute eine Umfrage: Wohnen Sie lieber in der Stadt oder auf dem Land?" },
        { speaker: "Passantin", voice: "shimmer", text: "Ganz klar in der Stadt! Ich wohne direkt im Zentrum. Die Vorteile sind toll: Kinos, Theater, viele Geschäfte. Ich liebe das Leben hier." },
        { speaker: "Interviewer", voice: "echo", text: "Gibt es für Sie keine Nachteile?" },
        { speaker: "Passantin", voice: "shimmer", text: "Doch, natürlich. Der Verkehr ist schlimm und die Luft ist nicht so gut wie auf dem Land. Manchmal ist es auch nachts sehr laut." },
        { speaker: "Interviewer", voice: "echo", text: "Möchten Sie später vielleicht aufs Land ziehen, wenn Sie mehr Ruhe und Natur brauchen?" },
        { speaker: "Passantin", voice: "shimmer", text: "Nein, ich glaube nicht. Ich bin ein echtes Stadtkind!" }
      ],
      questions: [
        { q: "1. Was mag die Passantin an der Stadt?", options: ["Die frische Luft", "Die Ruhe", "Kinos, Theater und Geschäfte im Zentrum"], correct: 2 },
        { q: "2. Was ist laut der Passantin ein Nachteil?", options: ["Keine Einkaufsmöglichkeiten", "Viel Verkehr, schlechte Luft und Lärm", "Es ist zu teuer"], correct: 1 },
        { q: "3. Möchte die Frau später aufs Land ziehen?", options: ["Ja, wegen der Natur.", "Nein, sie ist ein Stadtkind.", "Vielleicht in zehn Jahren."], correct: 1 }
      ]
    }
  ],
  6: [
    {
      id: 1,
      trackId: 'k6-track-1',
      title: 'Übung 1: Am Fahrkartenschalter',
      desc: 'Membeli tiket kereta.',
      dialogue: [
        { speaker: "Kunde", voice: "onyx", text: "Guten Tag. Ich brauche eine Fahrkarte nach Hamburg, bitte. Für nächsten Dienstag." },
        { speaker: "Verkäufer", voice: "alloy", text: "Guten Tag. Möchten Sie morgens oder nachmittags fahren?" },
        { speaker: "Kunde", voice: "onyx", text: "Am liebsten vormittags, so gegen 10 Uhr. Gibt es da eine direkte Verbindung?" },
        { speaker: "Verkäufer", voice: "alloy", text: "Ja, der ICE um 10:24 Uhr fährt direkt nach Hamburg. Er kommt um 12:50 Uhr an. Möchten Sie erster oder zweiter Klasse fahren?" },
        { speaker: "Kunde", voice: "onyx", text: "Zweite Klasse reicht völlig. Haben Sie eine BahnCard?" },
        { speaker: "Verkäufer", voice: "alloy", text: "Das macht dann mit der BahnCard 50 genau 45 Euro. Möchten Sie auch eine Sitzplatzreservierung?" }
      ],
      questions: [
        { q: "1. Wohin möchte der Kunde fahren?", options: ["Nach Berlin", "Nach München", "Nach Hamburg"], correct: 2 },
        { q: "2. Wann fährt der Zug ab?", options: ["10:24 Uhr", "12:50 Uhr", "10:00 Uhr"], correct: 0 },
        { q: "3. Hat der Kunde eine BahnCard?", options: ["Ja, BahnCard 25", "Ja, BahnCard 50", "Nein"], correct: 1 }
      ]
    },
    {
      id: 2,
      trackId: 'k6-track-2',
      title: 'Übung 2: Berufswünsche',
      desc: 'Cita-cita dan karir.',
      dialogue: [
        { speaker: "Laura", voice: "shimmer", text: "Weißt du schon, was du nach dem Studium machen willst, Felix?" },
        { speaker: "Felix", voice: "echo", text: "Ich bin mir noch nicht ganz sicher. Wahrscheinlich werde ich Lehrer. Ich arbeite gerne mit Kindern und erkläre gerne Dinge." },
        { speaker: "Laura", voice: "shimmer", text: "Das passt gut zu dir! Ich möchte lieber in der Forschung arbeiten. Ich werde nächstes Jahr ein Praktikum in einem Labor machen." },
        { speaker: "Felix", voice: "echo", text: "Forschung klingt auch sehr spannend, aber man verbringt wohl den ganzen Tag im Labor. Ich brauche mehr Kontakt zu Menschen." }
      ],
      questions: [
        { q: "1. Welchen Beruf möchte Felix wahrscheinlich ergreifen?", options: ["Arzt", "Lehrer", "Forscher"], correct: 1 },
        { q: "2. Warum möchte Felix diesen Beruf?", options: ["Wegen dem hohen Gehalt", "Weil er gerne mit Kindern arbeitet", "Weil er Labore mag"], correct: 1 },
        { q: "3. Was plant Laura für das nächste Jahr?", options: ["Eine Weltreise", "Ein Praktikum im Labor", "Eine Ausbildung zur Lehrerin"], correct: 1 }
      ]
    },
    {
      id: 3,
      trackId: 'k6-track-3',
      title: 'Übung 3: Telefonieren am Arbeitsplatz',
      desc: 'Menerima telepon di kantor.',
      dialogue: [
        { speaker: "Sekretärin", voice: "nova", text: "Firma Müller & Co., guten Tag. Mein Name ist Berger. Was kann ich für Sie tun?" },
        { speaker: "Anrufer", voice: "onyx", text: "Guten Tag, hier spricht Schmidt von der Firma TechPro. Könnte ich bitte Herrn Klein sprechen?" },
        { speaker: "Sekretärin", voice: "nova", text: "Herr Klein ist im Moment leider in einer Besprechung. Kann ich ihm etwas ausrichten oder möchten Sie eine Nachricht hinterlassen?" },
        { speaker: "Anrufer", voice: "onyx", text: "Könnten Sie ihm bitte sagen, dass er mich wegen des neuen Vertrags zurückrufen soll? Er hat meine Nummer." },
        { speaker: "Sekretärin", voice: "nova", text: "Gerne, Herr Schmidt. Ich richte es ihm aus, sobald die Besprechung zu Ende ist." }
      ],
      questions: [
        { q: "1. Wen möchte der Anrufer sprechen?", options: ["Frau Berger", "Herrn Müller", "Herrn Klein"], correct: 2 },
        { q: "2. Warum kann der Anrufer ihn nicht sprechen?", options: ["Er ist im Urlaub.", "Er ist in einer Besprechung.", "Er ist krank."], correct: 1 },
        { q: "3. Was soll Herr Klein tun?", options: ["Den Vertrag unterschreiben", "Eine E-Mail schreiben", "Herrn Schmidt zurückrufen"], correct: 2 }
      ]
    }
  ],
  7: [
    {
      id: 1,
      trackId: 'k7-track-1',
      title: 'Übung 1: Verkehrsmittel in der Stadt',
      desc: 'Memilih transportasi umum.',
      dialogue: [
        { speaker: "Sarah", voice: "nova", text: "Wie fährst du normalerweise zur Arbeit, Paul? Nimmst du das Auto?" },
        { speaker: "Paul", voice: "onyx", text: "Nein, mit dem Auto dauert es wegen des Berufsverkehrs viel zu lange. Ich fahre lieber mit der U-Bahn." },
        { speaker: "Sarah", voice: "nova", text: "Ist die U-Bahn nicht oft sehr voll am Morgen?" },
        { speaker: "Paul", voice: "onyx", text: "Doch, das stimmt. Aber sie ist schnell und ich muss keinen Parkplatz suchen. Das ist ein großer Vorteil." },
        { speaker: "Sarah", voice: "nova", text: "Ich fahre meistens mit dem Fahrrad. Das ist gesund und umweltfreundlich. Aber bei Regen nehme ich auch den Bus." }
      ],
      questions: [
        { q: "1. Womit fährt Paul zur Arbeit?", options: ["Mit dem Auto", "Mit dem Fahrrad", "Mit der U-Bahn"], correct: 2 },
        { q: "2. Was ist ein Vorteil der U-Bahn für Paul?", options: ["Sie ist immer leer.", "Man muss keinen Parkplatz suchen.", "Sie ist kostenlos."], correct: 1 },
        { q: "3. Womit fährt Sarah bei Regen?", options: ["Mit der U-Bahn", "Mit dem Bus", "Mit dem Taxi"], correct: 1 }
      ]
    },
    {
      id: 2,
      trackId: 'k7-track-2',
      title: 'Übung 2: Nach dem Weg fragen',
      desc: 'Menanyakan arah.',
      dialogue: [
        { speaker: "Tourist", voice: "echo", text: "Entschuldigung, könnten Sie mir sagen, wie ich zum Bahnhof komme?" },
        { speaker: "Passantin", voice: "shimmer", text: "Ja, natürlich. Gehen Sie hier immer geradeaus bis zur großen Kreuzung. Dort biegen Sie links ab." },
        { speaker: "Tourist", voice: "echo", text: "Also geradeaus und dann links. Ist es noch weit von dort?" },
        { speaker: "Passantin", voice: "shimmer", text: "Nein, nicht sehr weit. Nach etwa 200 Metern sehen Sie auf der rechten Seite ein großes Postamt. Direkt dahinter ist der Bahnhof." },
        { speaker: "Tourist", voice: "echo", text: "Vielen Dank für Ihre Hilfe!" },
        { speaker: "Passantin", voice: "shimmer", text: "Gern geschehen. Einen schönen Tag noch." }
      ],
      questions: [
        { q: "1. Wohin möchte der Tourist?", options: ["Zur Post", "Zum Bahnhof", "Zur Kreuzung"], correct: 1 },
        { q: "2. In welche Richtung soll er an der Kreuzung gehen?", options: ["Rechts abbiegen", "Geradeaus weitergehen", "Links abbiegen"], correct: 2 },
        { q: "3. Welches Gebäude ist vor dem Bahnhof?", options: ["Ein Krankenhaus", "Ein großes Postamt", "Ein Supermarkt"], correct: 1 }
      ]
    },
    {
      id: 3,
      trackId: 'k7-track-3',
      title: 'Übung 3: Indirekte Fragen',
      desc: 'Pertanyaan tidak langsung di meja informasi.',
      dialogue: [
        { speaker: "Gast", voice: "onyx", text: "Entschuldigung, wissen Sie, ob das Museum heute geöffnet hat?" },
        { speaker: "Auskunft", voice: "nova", text: "Lassen Sie mich nachschauen. Ja, das Museum ist heute bis 18 Uhr geöffnet." },
        { speaker: "Gast", voice: "onyx", text: "Können Sie mir auch sagen, wie viel der Eintritt für Erwachsene kostet?" },
        { speaker: "Auskunft", voice: "nova", text: "Der normale Eintrittspreis beträgt 12 Euro. Studenten und Senioren zahlen 8 Euro." },
        { speaker: "Gast", voice: "onyx", text: "Vielen Dank. Dürfte ich noch fragen, wo ich Fahrkarten für den Bus kaufen kann?" },
        { speaker: "Auskunft", voice: "nova", text: "Die Fahrkarten bekommen Sie direkt am Automaten an der Bushaltestelle." }
      ],
      questions: [
        { q: "1. Wie lange ist das Museum geöffnet?", options: ["Bis 18 Uhr", "Bis 20 Uhr", "Es ist geschlossen"], correct: 0 },
        { q: "2. Wie viel kostet der Eintritt für Studenten?", options: ["12 Euro", "8 Euro", "Kostenlos"], correct: 1 },
        { q: "3. Wo kauft man die Busfahrkarten?", options: ["In der Auskunft", "Im Bus beim Fahrer", "Am Automaten an der Haltestelle"], correct: 2 }
      ]
    }
  ],
  8: [
    {
      id: 1,
      trackId: 'k8-track-1',
      title: 'Übung 1: Lernprobleme',
      desc: 'Masalah dalam belajar bahasa.',
      dialogue: [
        { speaker: "Ali", voice: "onyx", text: "Ich lerne jetzt seit sechs Monaten Deutsch, aber ich habe immer noch große Probleme mit den Artikeln. Der, die, das... es ist so verwirrend!" },
        { speaker: "Maria", voice: "nova", text: "Das kenne ich gut, Ali. Jeder, der Deutsch lernt, hat am Anfang Probleme damit. Du solltest die neuen Wörter immer zusammen mit dem Artikel lernen." },
        { speaker: "Ali", voice: "onyx", text: "Das versuche ich ja. Aber beim Sprechen vergesse ich sie trotzdem oft. Und die Grammatik mit Dativ und Akkusativ finde ich auch sehr schwer." },
        { speaker: "Maria", voice: "nova", text: "Vielleicht solltest du mehr deutsche Texte lesen. Das hilft, ein Gefühl für die Sprache zu bekommen. Und mach dir keine Sorgen, die Deutschen verstehen dich auch, wenn der Artikel mal falsch ist." }
      ],
      questions: [
        { q: "1. Womit hat Ali die größten Probleme?", options: ["Mit der Aussprache", "Mit den Artikeln (der, die, das)", "Mit dem Lesen"], correct: 1 },
        { q: "2. Welchen Rat gibt Maria?", options: ["Er soll aufhören zu lernen.", "Er soll Wörter mit dem Artikel lernen.", "Er soll einen neuen Lehrer suchen."], correct: 1 },
        { q: "3. Was hilft laut Maria noch beim Lernen?", options: ["Deutsche Lieder hören", "Deutsche Texte lesen", "Viele Grammatikübungen machen"], correct: 1 }
      ]
    },
    {
      id: 2,
      trackId: 'k8-track-2',
      title: 'Übung 2: Ratschläge geben',
      desc: 'Memberikan saran untuk masalah.',
      dialogue: [
        { speaker: "Tom", voice: "echo", text: "Ich bin so müde in letzter Zeit. Ich kann nachts einfach nicht gut schlafen." },
        { speaker: "Lisa", voice: "shimmer", text: "Das ist nicht gut. Trinkst du abends viel Kaffee oder schwarzen Tee?" },
        { speaker: "Tom", voice: "echo", text: "Ja, manchmal. Ich muss oft lange arbeiten und brauche Kaffee, um wach zu bleiben." },
        { speaker: "Lisa", voice: "shimmer", text: "Du solltest abends keinen Kaffee mehr trinken. Trink stattdessen Kräutertee. Und du könntest vor dem Schlafen noch einen kleinen Spaziergang machen." },
        { speaker: "Tom", voice: "echo", text: "Vielleicht hast du recht. Ich werde das heute Abend gleich ausprobieren." }
      ],
      questions: [
        { q: "1. Welches Problem hat Tom?", options: ["Er ist krank.", "Er kann nicht schlafen.", "Er hat keine Arbeit."], correct: 1 },
        { q: "2. Warum trinkt Tom abends oft Kaffee?", options: ["Weil er den Geschmack mag.", "Weil er oft lange arbeiten muss.", "Weil er Besuch hat."], correct: 1 },
        { q: "3. Welchen Ratschlag gibt Lisa?", options: ["Kräutertee trinken und spazieren gehen.", "Schlaftabletten nehmen.", "Früher ins Bett gehen."], correct: 0 }
      ]
    },
    {
      id: 3,
      trackId: 'k8-track-3',
      title: 'Übung 3: Eine Präsentation vorbereiten',
      desc: 'Persiapan presentasi di kelas.',
      dialogue: [
        { speaker: "Student", voice: "onyx", text: "Entschuldigung, Herr Müller. Ich muss nächste Woche eine Präsentation halten, bin aber sehr nervös." },
        { speaker: "Lehrer", voice: "fable", text: "Das ist ganz normal. Haben Sie Ihre Folien schon vorbereitet?" },
        { speaker: "Student", voice: "onyx", text: "Ja, die Folien sind fertig. Aber ich habe Angst, dass ich den Text vergesse, wenn ich vor der Klasse stehe." },
        { speaker: "Lehrer", voice: "fable", text: "Sie sollten den Text nicht auswendig lernen. Schreiben Sie sich nur Stichwörter auf kleine Karten. Und üben Sie den Vortrag ein paarmal laut zu Hause vor dem Spiegel." },
        { speaker: "Student", voice: "onyx", text: "Stichwortkarten sind eine gute Idee. Danke für den Tipp, Herr Müller!" }
      ],
      questions: [
        { q: "1. Warum ist der Student nervös?", options: ["Wegen einer Prüfung", "Wegen einer Präsentation", "Wegen seiner Noten"], correct: 1 },
        { q: "2. Wovor hat der Student Angst?", options: ["Dass die Folien schlecht sind", "Dass er zu leise spricht", "Dass er den Text vergisst"], correct: 2 },
        { q: "3. Was soll der Student auf die Karten schreiben?", options: ["Den ganzen Text", "Nur Stichwörter", "Bilder"], correct: 1 }
      ]
    }
  ],
  9: [
    {
      id: 1,
      trackId: 'k9-track-1',
      title: 'Übung 1: Sport machen',
      desc: 'Berbicara tentang olahraga.',
      dialogue: [
        { speaker: "Jens", voice: "onyx", text: "Ich muss unbedingt mehr Sport machen. Ich sitze den ganzen Tag im Büro und mein Rücken tut oft weh." },
        { speaker: "Klara", voice: "nova", text: "Warum kommst du nicht mit mir ins Fitnessstudio? Ich gehe dort dreimal pro Woche hin." },
        { speaker: "Jens", voice: "onyx", text: "Fitnessstudio finde ich ehrlich gesagt ein bisschen langweilig. Ich würde lieber etwas draußen machen oder in einem Team spielen." },
        { speaker: "Klara", voice: "nova", text: "Wie wäre es dann mit Fußball oder Tennis? Es gibt hier einen guten Tennisverein in der Nähe." },
        { speaker: "Jens", voice: "onyx", text: "Tennis! Das habe ich als Kind gespielt. Das ist eine tolle Idee. Ich werde mich gleich heute nach dem Verein erkundigen." }
      ],
      questions: [
        { q: "1. Warum möchte Jens Sport machen?", options: ["Weil er abnehmen will.", "Weil sein Rücken oft wehtut.", "Weil er für einen Marathon trainiert."], correct: 1 },
        { q: "2. Wo macht Klara Sport?", options: ["Im Tennisverein", "Im Park", "Im Fitnessstudio"], correct: 2 },
        { q: "3. Für welchen Sport entscheidet sich Jens?", options: ["Fußball", "Tennis", "Schwimmen"], correct: 1 }
      ]
    },
    {
      id: 2,
      trackId: 'k9-track-2',
      title: 'Übung 2: Das Fußballspiel',
      desc: 'Kekecewaan setelah pertandingan.',
      dialogue: [
        { speaker: "Tim", voice: "echo", text: "Hast du das Spiel gestern Abend gesehen? Ich bin so enttäuscht." },
        { speaker: "Lars", voice: "onyx", text: "Ja, leider. Unsere Mannschaft hat wirklich schlecht gespielt. Deshalb haben sie 3:0 verloren." },
        { speaker: "Tim", voice: "echo", text: "Sie haben am Anfang gut gekämpft, trotzdem haben sie in der zweiten Halbzeit viele Fehler gemacht. Der Torwart war heute auch nicht in Form." },
        { speaker: "Lars", voice: "onyx", text: "Stimmt. Aber das nächste Spiel ist gegen den Tabellenletzten. Ich hoffe sehr, dass sie dann wieder gewinnen." }
      ],
      questions: [
        { q: "1. Wie ging das Spiel aus?", options: ["1:0 gewonnen", "3:0 verloren", "0:0 unentschieden"], correct: 1 },
        { q: "2. Wann hat die Mannschaft besonders viele Fehler gemacht?", options: ["Am Anfang", "In der ersten Halbzeit", "In der zweiten Halbzeit"], correct: 2 },
        { q: "3. Was hofft Lars für das nächste Spiel?", options: ["Dass es abgesagt wird.", "Dass sie gegen den Tabellenletzten gewinnen.", "Dass der Torwart ausgewechselt wird."], correct: 1 }
      ]
    },
    {
      id: 3,
      trackId: 'k9-track-3',
      title: 'Übung 3: Reiseziele diskutieren',
      desc: 'Merencanakan liburan bersama.',
      dialogue: [
        { speaker: "Sophie", voice: "shimmer", text: "Hast du schon eine Idee, wohin wir im Sommerurlaub fahren wollen?" },
        { speaker: "Markus", voice: "onyx", text: "Ich würde sehr gerne ans Meer fahren, vielleicht nach Spanien oder Italien. Ich brauche Sonne und Strand." },
        { speaker: "Sophie", voice: "shimmer", text: "Ans Meer fahre ich auch gerne, trotzdem ist es dort im Sommer immer so voll und teuer. Deshalb schlage ich vor, dass wir in die Berge fahren. Dort können wir wandern." },
        { speaker: "Markus", voice: "onyx", text: "Wandern im Sommer? Das ist mir zu anstrengend. Wie wäre es mit einem Kompromiss: Wir fahren an einen See in Österreich. Dort können wir baden und du kannst in den Bergen wandern." },
        { speaker: "Sophie", voice: "shimmer", text: "Das ist ein super Vorschlag! Ein Seeufer in Österreich klingt wunderbar." }
      ],
      questions: [
        { q: "1. Wohin möchte Markus am liebsten fahren?", options: ["In die Berge", "Ans Meer", "In eine Großstadt"], correct: 1 },
        { q: "2. Warum möchte Sophie nicht dorthin?", options: ["Es ist zu kalt.", "Es ist zu weit weg.", "Es ist zu voll und teuer."], correct: 2 },
        { q: "3. Auf welchen Kompromiss einigen sie sich?", options: ["Sie bleiben zu Hause.", "Sie fahren an einen See in Österreich.", "Sie fahren im Winter in den Urlaub."], correct: 1 }
      ]
    }
  ],
  10: [
    {
      id: 1,
      trackId: 'k10-track-1',
      title: 'Übung 1: Zusammen wohnen',
      desc: 'Kehidupan di asrama mahasiswa.',
      dialogue: [
        { speaker: "Lena", voice: "nova", text: "Hi Martin, wie gefällt es dir eigentlich in deiner neuen Studenten-WG?" },
        { speaker: "Martin", voice: "onyx", text: "Es ist super! Meine Mitbewohner sind alle sehr nett. Wir kochen abends oft zusammen und teilen uns die Aufgaben im Haushalt." },
        { speaker: "Lena", voice: "nova", text: "Gibt es nie Streit wegen dem Putzen? In meiner alten WG war das immer ein großes Problem." },
        { speaker: "Martin", voice: "onyx", text: "Nein, wir haben einen klaren Putzplan. Jeder ist einmal in der Woche dran, das Bad zu reinigen oder die Küche aufzuräumen. Wenn sich alle daran halten, klappt das wunderbar." }
      ],
      questions: [
        { q: "1. Wo wohnt Martin?", options: ["In einem Hotel", "In einer WG (Wohngemeinschaft)", "Allein in einer Wohnung"], correct: 1 },
        { q: "2. Was machen die Mitbewohner oft abends?", options: ["Zusammen kochen", "Lernen", "Fernsehen"], correct: 0 },
        { q: "3. Wie vermeiden sie Streit beim Putzen?", options: ["Sie bezahlen eine Putzkraft.", "Sie putzen nie.", "Sie haben einen Putzplan."], correct: 2 }
      ]
    },
    {
      id: 2,
      trackId: 'k10-track-2',
      title: 'Übung 2: Die lauten Nachbarn',
      desc: 'Mengeluh tentang tetangga.',
      dialogue: [
        { speaker: "Herr Müller", voice: "fable", text: "Entschuldigung, Herr Klein. Haben Sie kurz Zeit? Es geht um gestern Abend." },
        { speaker: "Herr Klein", voice: "onyx", text: "Ja, natürlich. Was ist denn los, Herr Müller?" },
        { speaker: "Herr Müller", voice: "fable", text: "Die Musik aus Ihrer Wohnung war gestern Abend wirklich sehr laut. Und das bis nach Mitternacht! Ich konnte überhaupt nicht schlafen." },
        { speaker: "Herr Klein", voice: "onyx", text: "Oh, das tut mir schrecklich leid! Mein Bruder hatte Geburtstag und wir haben etwas gefeiert. Wir haben gar nicht gemerkt, wie laut es war." },
        { speaker: "Herr Müller", voice: "fable", text: "Es ist ja schön, dass Sie feiern, aber bitte informieren Sie mich das nächste Mal vorher oder machen Sie die Musik ab 22 Uhr leiser." },
        { speaker: "Herr Klein", voice: "onyx", text: "Selbstverständlich. Ich verspreche Ihnen, das kommt nicht wieder vor. Entschuldigen Sie bitte noch einmal." }
      ],
      questions: [
        { q: "1. Warum beschwert sich Herr Müller?", options: ["Herr Klein hat sein Auto falsch geparkt.", "Die Musik war gestern Abend zu laut.", "Herr Klein hat Müll auf den Flur gestellt."], correct: 1 },
        { q: "2. Welchen Grund gab es für die Lautstärke?", options: ["Ein Fußballspiel im Fernsehen", "Der Geburtstag des Bruders", "Ein neues Radio"], correct: 1 },
        { q: "3. Was fordert Herr Müller für die Zukunft?", options: ["Vorher informieren oder Musik ab 22 Uhr leise machen.", "Dass Herr Klein auszieht.", "Gar keine Musik mehr hören."], correct: 0 }
      ]
    },
    {
      id: 3,
      trackId: 'k10-track-3',
      title: 'Übung 3: Ein neues Haustier',
      desc: 'Membeli hewan peliharaan baru.',
      dialogue: [
        { speaker: "Mutter", voice: "shimmer", text: "Kinder, kommt mal her! Ich habe eine Überraschung für euch. Schaut mal in den Korb." },
        { speaker: "Lukas", voice: "echo", text: "Oh wow, ein kleiner Hund! Ist der für uns? Er ist so süß!" },
        { speaker: "Mutter", voice: "shimmer", text: "Ja, wir haben ihn heute aus dem Tierheim geholt. Aber erinnert euch an unsere Abmachung: Ihr müsst euch mit darum kümmern." },
        { speaker: "Anna", voice: "nova", text: "Natürlich, Mama! Ich werde jeden Tag nach der Schule mit ihm spazieren gehen." },
        { speaker: "Lukas", voice: "echo", text: "Und ich kümmere mich um sein Futter und gebe ihm frisches Wasser. Wie sollen wir ihn nennen?" },
        { speaker: "Mutter", voice: "shimmer", text: "Überlegt euch einen schönen Namen. Aber jetzt müssen wir erst einmal sein Körbchen ins Wohnzimmer stellen." }
      ],
      questions: [
        { q: "1. Was für ein Tier hat die Mutter mitgebracht?", options: ["Eine Katze", "Einen kleinen Hund", "Einen Vogel"], correct: 1 },
        { q: "2. Woher kommt das Tier?", options: ["Aus dem Tierheim", "Von einem Freund", "Aus der Zoohandlung"], correct: 0 },
        { q: "3. Welche Aufgabe übernimmt Anna?", options: ["Futter geben", "Spazieren gehen", "Das Körbchen sauber machen"], correct: 1 }
      ]
    }
  ],
  11: [
    {
      id: 1,
      trackId: 'k11-track-1',
      title: 'Übung 1: Ich hätte gern mehr Zeit',
      desc: 'Mengutarakan harapan dengan Konjunktiv II.',
      dialogue: [
        { speaker: "Dennis", voice: "onyx", text: "Ich habe in letzter Zeit so viel Stress im Büro. Ich arbeite jeden Tag bis 19 Uhr. Ich wünschte, ich hätte mehr Freizeit." },
        { speaker: "Saskia", voice: "nova", text: "Das ist wirklich hart. Wenn ich du wäre, würde ich mit dem Chef sprechen. Vielleicht kannst du deine Arbeitszeit reduzieren?" },
        { speaker: "Dennis", voice: "onyx", text: "Das habe ich mir auch schon überlegt. Ich würde so gerne wieder öfter Sport machen oder einfach mal ein Buch lesen." },
        { speaker: "Saskia", voice: "nova", text: "Dann solltest du das wirklich ändern. Geld ist nicht alles, Gesundheit und Freizeit sind viel wichtiger." }
      ],
      questions: [
        { q: "1. Was ist Dennis' Problem?", options: ["Er hat zu wenig Geld.", "Er hat zu viel Stress und zu wenig Freizeit.", "Er mag seinen Chef nicht."], correct: 1 },
        { q: "2. Was würde Saskia tun, wenn sie Dennis wäre?", options: ["Sie würde kündigen.", "Sie würde mit dem Chef sprechen.", "Sie würde länger arbeiten."], correct: 1 },
        { q: "3. Was würde Dennis in seiner Freizeit gerne machen?", options: ["Sport machen oder lesen", "Verreisen", "Schlafen"], correct: 0 }
      ]
    },
    {
      id: 2,
      trackId: 'k11-track-2',
      title: 'Übung 2: Träume und Wünsche',
      desc: 'Membicarakan impian masa depan.',
      dialogue: [
        { speaker: "Paul", voice: "echo", text: "Wenn du einen Wunsch frei hättest, was würdest du dir wünschen, Maria?" },
        { speaker: "Maria", voice: "shimmer", text: "Hmm, das ist eine gute Frage. Wenn ich viel Geld hätte, würde ich eine lange Weltreise machen. Ich würde gerne Südamerika und Asien sehen." },
        { speaker: "Paul", voice: "echo", text: "Das klingt fantastisch. Ich wäre gerne ein berühmter Musiker. Dann würde ich auf großen Bühnen spielen und hätte Fans auf der ganzen Welt." },
        { speaker: "Maria", voice: "shimmer", text: "Träumen ist etwas Schönes. Aber eigentlich bin ich mit meinem Leben hier auch ganz zufrieden." }
      ],
      questions: [
        { q: "1. Was würde Maria tun, wenn sie viel Geld hätte?", options: ["Ein Haus kaufen", "Eine Weltreise machen", "Ein Auto kaufen"], correct: 1 },
        { q: "2. Was wäre Paul gerne?", options: ["Ein berühmter Schauspieler", "Ein reicher Geschäftsmann", "Ein berühmter Musiker"], correct: 2 },
        { q: "3. Wie fühlt sich Maria eigentlich in ihrem aktuellen Leben?", options: ["Sehr unglücklich", "Ganz zufrieden", "Gestresst"], correct: 1 }
      ]
    },
    {
      id: 3,
      trackId: 'k11-track-3',
      title: 'Übung 3: Lebensphasen',
      desc: 'Wawancara tentang fase kehidupan.',
      dialogue: [
        { speaker: "Journalist", voice: "fable", text: "Herr Bauer, Sie sind jetzt 70 Jahre alt. Welche Lebensphase fanden Sie am schönsten?" },
        { speaker: "Herr Bauer", voice: "onyx", text: "Das ist schwer zu sagen. Die Studienzeit war toll, weil ich viele Freiheiten hatte. Aber die schönste Zeit war wohl, als meine Kinder klein waren." },
        { speaker: "Journalist", voice: "fable", text: "Gab es auch schwierige Zeiten in Ihrem Leben?" },
        { speaker: "Herr Bauer", voice: "onyx", text: "Oh ja. Als ich mit 40 meinen Job verloren habe, war das ein großer Schock. Aber ich habe mich beworben und schnell etwas Neues gefunden. Man lernt aus Krisen." },
        { speaker: "Journalist", voice: "fable", text: "Welchen Rat würden Sie jungen Menschen heute geben?" },
        { speaker: "Herr Bauer", voice: "onyx", text: "Genießt jeden Moment. Die Zeit vergeht viel schneller, als man denkt." }
      ],
      questions: [
        { q: "1. Welche Zeit fand Herr Bauer am schönsten?", options: ["Seine Schulzeit", "Die Zeit als Rentner", "Die Zeit, als seine Kinder klein waren"], correct: 2 },
        { q: "2. Was war ein schwerer Moment in seinem Leben?", options: ["Als er krank wurde", "Als er mit 40 seinen Job verlor", "Als er umziehen musste"], correct: 1 },
        { q: "3. Welchen Rat gibt er jungen Menschen?", options: ["Viel Geld sparen", "Jeden Moment genießen", "Viel arbeiten"], correct: 1 }
      ]
    }
  ],
  12: [
    {
      id: 1,
      trackId: 'k12-track-1',
      title: 'Übung 1: Auf dem Musikfestival',
      desc: 'Di festival musik.',
      dialogue: [
        { speaker: "Lukas", voice: "onyx", text: "Ist das nicht ein tolles Festival? Die Band, die gerade spielt, ist fantastisch!" },
        { speaker: "Mia", voice: "nova", text: "Ja, wirklich super. Weißt du, wie die Band heißt? Ich habe den Namen nicht verstanden." },
        { speaker: "Lukas", voice: "onyx", text: "Sie heißen 'Die Rocker'. Der Sänger, der das grüne T-Shirt trägt, hat eine unglaubliche Stimme." },
        { speaker: "Mia", voice: "nova", text: "Das stimmt. Aber es ist ziemlich heiß hier in der Menge. Lass uns doch nachher etwas zu trinken holen." },
        { speaker: "Lukas", voice: "onyx", text: "Gute Idee. Der Getränkestand, den wir vorhin gesehen haben, ist gleich dort drüben." }
      ],
      questions: [
        { q: "1. Wie findet Lukas die Band?", options: ["Langweilig", "Zu laut", "Fantastisch"], correct: 2 },
        { q: "2. Was hat der Sänger an?", options: ["Eine schwarze Jacke", "Ein grünes T-Shirt", "Einen roten Hut"], correct: 1 },
        { q: "3. Was schlägt Mia vor?", options: ["Nach Hause zu gehen", "Etwas zu essen kaufen", "Etwas zu trinken holen"], correct: 2 }
      ]
    },
    {
      id: 2,
      trackId: 'k12-track-2',
      title: 'Übung 2: Über Kunst sprechen',
      desc: 'Berbicara tentang lukisan pameran.',
      dialogue: [
        { speaker: "Elena", voice: "shimmer", text: "Schau mal, dieses Bild hier finde ich sehr interessant. Die Farben sind so leuchtend." },
        { speaker: "David", voice: "echo", text: "Meinst du das Bild, das dort drüben an der Wand hängt? Mir gefällt es nicht so gut. Es ist mir zu abstrakt." },
        { speaker: "Elena", voice: "shimmer", text: "Genau das meine ich. Ich mag abstrakte Kunst. Jeder kann darin etwas anderes sehen. Was erkennst du auf dem Bild?" },
        { speaker: "David", voice: "echo", text: "Für mich sieht es einfach aus wie ein bunter Fleck. Ich mag lieber Landschaftsbilder oder Porträts, auf denen man etwas Reales erkennt." }
      ],
      questions: [
        { q: "1. Wie findet Elena das Bild?", options: ["Sehr interessant", "Zu dunkel", "Langweilig"], correct: 0 },
        { q: "2. Warum gefällt das Bild David nicht?", options: ["Es ist zu klein.", "Es ist ihm zu abstrakt.", "Es ist zu teuer."], correct: 1 },
        { q: "3. Was mag David lieber?", options: ["Abstrakte Kunst", "Moderne Kunst", "Landschaftsbilder oder Porträts"], correct: 2 }
      ]
    },
    {
      id: 3,
      trackId: 'k12-track-3',
      title: 'Übung 3: Eine Einladung ins Kino',
      desc: 'Ajakan pergi ke bioskop.',
      dialogue: [
        { speaker: "Felix", voice: "onyx", text: "Hey Sarah, hast du am Freitagabend schon etwas vor? Jemand hat mir zwei Kinokarten geschenkt." },
        { speaker: "Sarah", voice: "nova", text: "Nein, am Freitag habe ich noch nichts geplant. Welcher Film läuft denn?" },
        { speaker: "Felix", voice: "onyx", text: "Es ist der neue Actionfilm, über den alle reden. Den Film, den der berühmte Regisseur aus Hollywood gemacht hat." },
        { speaker: "Sarah", voice: "nova", text: "Oh, Actionfilme sind eigentlich nicht so mein Ding. Hast du nicht Lust auf eine Komödie?" },
        { speaker: "Felix", voice: "onyx", text: "Leider gelten die Freikarten nur für diesen speziellen Film. Wenn du keine Lust hast, frage ich jemand anderen." },
        { speaker: "Sarah", voice: "nova", text: "Ach was, ich komme gerne mit. Ein Kinoabend ist immer schön, auch wenn es ein Actionfilm ist." }
      ],
      questions: [
        { q: "1. Was hat Felix bekommen?", options: ["Konzertkarten", "Zwei Kinokarten", "Theaterkarten"], correct: 1 },
        { q: "2. Welchen Film möchte Felix ansehen?", options: ["Eine Komödie", "Einen Dokumentarfilm", "Einen Actionfilm"], correct: 2 },
        { q: "3. Warum geht Sarah trotzdem mit?", options: ["Weil sie Actionfilme liebt.", "Weil ein Kinoabend immer schön ist.", "Weil Felix sie gezwungen hat."], correct: 1 }
      ]
    }
  ]
};
