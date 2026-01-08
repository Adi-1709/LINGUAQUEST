
const apiKey = 'AIzaSyA0MErRTZHF2ycMrQuYrvHE3rDDs1ia438';

const models = [
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-1.0-pro',
    'gemini-pro'
];

async function testModel(modelName) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    console.log(`\nTesting ${modelName}...`);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: 'Hello' }] }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(`❌ ${modelName}: Failed`);
            console.log(`   Error: ${data.error?.message || 'Unknown error'}`);
        } else {
            console.log(`✅ ${modelName}: Working`);
        }

    } catch (error) {
        console.log(`❌ ${modelName}: Network Error - ${error.message}`);
    }
}

async function runTests() {
    console.log('Starting Gemini Model Connectivity Tests...');
    for (const model of models) {
        await testModel(model);
    }
    console.log('\nTest Complete.');
}

runTests();
