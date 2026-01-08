export type VocabularyItem = {
    english: string
    translation: string
    category: string
    example?: string
    pronunciation?: string
}

export const VOCABULARY_LIBRARY: Record<string, Record<string, VocabularyItem[]>> = {
    Spanish: {
        'es-1': [
            { english: 'Hello', translation: 'Hola', category: 'greeting' },
            { english: 'Good morning', translation: 'Buenos días', category: 'greeting' },
            { english: 'Good afternoon', translation: 'Buenas tardes', category: 'greeting' },
            { english: 'Goodbye', translation: 'Adiós', category: 'greeting' },
            { english: 'Please', translation: 'Por favor', category: 'common' },
            { english: 'Thank you', translation: 'Gracias', category: 'common' },
            { english: 'Yes', translation: 'Sí', category: 'common' },
            { english: 'No', translation: 'No', category: 'common' },
        ]
    },
    French: {
        'fr-1': [
            { english: 'Hello', translation: 'Bonjour', category: 'greeting' },
            { english: 'Good evening', translation: 'Bonsoir', category: 'greeting' },
            { english: 'Goodbye', translation: 'Au revoir', category: 'greeting' },
            { english: 'Please', translation: "S'il vous plaît", category: 'common' },
            { english: 'Thank you', translation: 'Merci', category: 'common' },
            { english: 'Yes', translation: 'Oui', category: 'common' },
            { english: 'No', translation: 'Non', category: 'common' },
        ]
    },
    German: {
        'de-1': [
            { english: 'Hello', translation: 'Hallo', category: 'greeting' },
            { english: 'Good morning', translation: 'Guten Morgen', category: 'greeting' },
            { english: 'Goodbye', translation: 'Auf Wiedersehen', category: 'greeting' },
            { english: 'Please', translation: 'Bitte', category: 'common' },
            { english: 'Thank you', translation: 'Danke', category: 'common' },
            { english: 'Yes', translation: 'Ja', category: 'common' },
            { english: 'No', translation: 'Nein', category: 'common' },
        ]
    },
    Italian: {
        'it-1': [
            { english: 'Hello', translation: 'Ciao', category: 'greeting' },
            { english: 'Good morning', translation: 'Buongiorno', category: 'greeting' },
            { english: 'Goodbye', translation: 'Arrivederci', category: 'greeting' },
            { english: 'Please', translation: 'Per favore', category: 'common' },
            { english: 'Thank you', translation: 'Grazie', category: 'common' },
            { english: 'Yes', translation: 'Sì', category: 'common' },
            { english: 'No', translation: 'No', category: 'common' },
        ]
    },
    Portuguese: {
        'pt-1': [
            { english: 'Hello', translation: 'Olá', category: 'greeting' },
            { english: 'Good morning', translation: 'Bom dia', category: 'greeting' },
            { english: 'Goodbye', translation: 'Adeus', category: 'greeting' },
            { english: 'Please', translation: 'Por favor', category: 'common' },
            { english: 'Thank you', translation: 'Obrigado', category: 'common' },
            { english: 'Yes', translation: 'Sim', category: 'common' },
            { english: 'No', translation: 'Não', category: 'common' },
        ]
    },
    Japanese: {
        'ja-1': [
            { english: 'Hello', translation: 'Konnichiwa (こんにちは)', category: 'greeting' },
            { english: 'Good morning', translation: 'Ohayou gozaimasu (おはようございます)', category: 'greeting' },
            { english: 'Goodbye', translation: 'Sayounara (さようなら)', category: 'greeting' },
            { english: 'Please', translation: 'Onegaishimasu (お願いします)', category: 'common' },
            { english: 'Thank you', translation: 'Arigatou (ありがとう)', category: 'common' },
            { english: 'Yes', translation: 'Hai (はい)', category: 'common' },
            { english: 'No', translation: 'Iie (いいえ)', category: 'common' },
        ]
    },
    Chinese: {
        'zh-1': [
            { english: 'Hello', translation: 'Nǐ hǎo (你好)', category: 'greeting' },
            { english: 'Good morning', translation: 'Zǎo ān (早安)', category: 'greeting' },
            { english: 'Goodbye', translation: 'Zàijiàn (再见)', category: 'greeting' },
            { english: 'Please', translation: 'Qǐng (请)', category: 'common' },
            { english: 'Thank you', translation: 'Xièxiè (谢谢)', category: 'common' },
            { english: 'Yes', translation: 'Shì (是)', category: 'common' },
            { english: 'No', translation: 'Bù (不)', category: 'common' },
        ]
    },
    Korean: {
        'ko-1': [
            { english: 'Hello', translation: 'Annyeonghaseyo (안녕하세요)', category: 'greeting' },
            { english: 'Good morning', translation: 'Jo-eun achim (좋은 아침)', category: 'greeting' },
            { english: 'Goodbye', translation: 'Annyeonghi gyeseyo (안녕히 계세요)', category: 'greeting' },
            { english: 'Please', translation: 'Juseyo (주세요)', category: 'common' },
            { english: 'Thank you', translation: 'Gamsahamnida (감사합니다)', category: 'common' },
            { english: 'Yes', translation: 'Ne (네)', category: 'common' },
            { english: 'No', translation: 'Aniyo (아니요)', category: 'common' },
        ]
    },
    Hindi: {
        'hi-1': [
            { english: 'Hello', translation: 'Namaste (नमस्ते)', category: 'greeting' },
            { english: 'Good morning', translation: 'Suprabhat (सुप्रभात)', category: 'greeting' },
            { english: 'Goodbye', translation: 'Alvida (अलविदा)', category: 'greeting' },
            { english: 'Please', translation: 'Kripya (कृपया)', category: 'common' },
            { english: 'Thank you', translation: 'Dhanyavaad (धन्यवाद)', category: 'common' },
            { english: 'Yes', translation: 'Haan (हाँ)', category: 'common' },
            { english: 'No', translation: 'Nahi (नहीं)', category: 'common' },
        ],
        'hi-2': [
            { english: 'How are you?', translation: 'Aap kaise hain? (आप कैसे हैं?)', category: 'phrases' },
            { english: 'I am fine', translation: 'Main theek hoon (मैं ठीक हूँ)', category: 'phrases' },
            { english: 'What is your name?', translation: 'Aapka naam kya hai? (आपका नाम क्या है?)', category: 'phrases' },
            { english: 'My name is...', translation: 'Mera naam ... hai (मेरा नाम ... है)', category: 'phrases' },
            { english: 'Excuse me', translation: 'Maaf kijiye (माफ़ कीजिये)', category: 'common' },
        ],
        'hi-3': [
            { english: 'One', translation: 'Ek (एक)', category: 'words' },
            { english: 'Two', translation: 'Do (दो)', category: 'words' },
            { english: 'Three', translation: 'Teen (तीन)', category: 'words' },
            { english: 'Four', translation: 'Chaar (चार)', category: 'words' },
            { english: 'Five', translation: 'Paanch (पांच)', category: 'words' },
            { english: 'Ten', translation: 'Dus (दस)', category: 'words' },
        ],
        'hi-4': [
            { english: 'Family', translation: 'Parivaar (परिवार)', category: 'relationships' },
            { english: 'Friend', translation: 'Dost (दोस्त)', category: 'relationships' },
            { english: 'Parents', translation: 'Mata-Pita (माता-पिता)', category: 'relationships' },
            { english: 'Brother', translation: 'Bhai (भाई)', category: 'relationships' },
            { english: 'Sister', translation: 'Behan (बहन)', category: 'relationships' },
        ],
        'hi-5': [
            { english: 'Way/Path', translation: 'Rasta (रास्ता)', category: 'directions' },
            { english: 'Market', translation: 'Bazaar (बाज़ार)', category: 'places' },
            { english: 'Station', translation: 'Station (स्टेशन)', category: 'places' },
            { english: 'Where', translation: 'Kahan (कहाँ)', category: 'common' },
            { english: 'Left', translation: 'Baayein (बायें)', category: 'directions' },
            { english: 'Right', translation: 'Daayein (दायें)', category: 'directions' },
        ],
        'hi-6': [
            { english: 'How much?', translation: 'Kitne ka hai? (कितने का है?)', category: 'shopping' },
            { english: 'Expensive', translation: 'Mehenga (महंगा)', category: 'shopping' },
            { english: 'Cheap', translation: 'Sasta (सस्ता)', category: 'shopping' },
            { english: 'Shop', translation: 'Dukaan (दुकान)', category: 'shopping' },
            { english: 'Money', translation: 'Paise (पैसे)', category: 'shopping' },
        ],
        'hi-7': [
            { english: 'To wake up', translation: 'Uthna (उठना)', category: 'verbs' },
            { english: 'Work', translation: 'Kaam (काम)', category: 'common' },
            { english: 'To sleep', translation: 'Sona (सोना)', category: 'verbs' },
            { english: 'Morning', translation: 'Subah (सुबह)', category: 'time' },
            { english: 'Night', translation: 'Raat (रात)', category: 'time' },
        ],
        'hi-8': [
            { english: 'Rain', translation: 'Barish (बारिश)', category: 'weather' },
            { english: 'Heat/Summer', translation: 'Garmi (गर्मी)', category: 'weather' },
            { english: 'Cold/Winter', translation: 'Thand (ठंड)', category: 'weather' },
            { english: 'Sun', translation: 'Sooraj (सूरज)', category: 'weather' },
            { english: 'Wind', translation: 'Hawa (हवा)', category: 'weather' },
        ],
        'hi-9': [
            { english: 'Was', translation: 'Tha (था)', category: 'grammar' },
            { english: 'Yesterday/Tomorrow', translation: 'Kal (कल)', category: 'time' },
            { english: 'Childhood', translation: 'Bachpan (बचपन)', category: 'time' },
            { english: 'Old', translation: 'Purana (पुराना)', category: 'adjectives' },
            { english: 'King', translation: 'Raja (राजा)', category: 'noun' },
        ],
        'hi-10': [
            { english: 'I believe', translation: 'Mera manna hai (मेरा मानना ​​​​है)', category: 'phrases' },
            { english: 'Agree', translation: 'Sahmat (सहमत)', category: 'verbs' },
            { english: 'Opposition', translation: 'Virodh (विरोध)', category: 'nouns' },
            { english: 'Opinion', translation: 'Rai (राय)', category: 'nouns' },
            { english: 'True', translation: 'Sach (सच)', category: 'common' },
        ],
        'hi-11': [
            { english: 'Story', translation: 'Kahani (कहानी)', category: 'literature' },
            { english: 'Poem', translation: 'Kavita (कविता)', category: 'literature' },
            { english: 'Culture', translation: 'Sanskriti (संस्कृति)', category: 'culture' },
            { english: 'Art', translation: 'Kala (कला)', category: 'culture' },
            { english: 'Book', translation: 'Kitaab (किताब)', category: 'noun' },
        ],
        'hi-12': [
            { english: 'Business', translation: 'Vyapaar (व्यापार)', category: 'business' },
            { english: 'Meeting', translation: 'Baithak (बैठक)', category: 'business' },
            { english: 'Job', translation: 'Naukri (नौकरी)', category: 'business' },
            { english: 'Office', translation: 'Daftar (दफ्तर)', category: 'places' },
            { english: 'Success', translation: 'Safalta (सफलता)', category: 'noun' },
        ]
    }
}
