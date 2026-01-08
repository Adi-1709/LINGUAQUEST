
const apiKey = 'AIzaSyA0MErRTZHF2ycMrQuYrvHE3rDDs1ia438';
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function listModels() {
    console.log('Fetching available models...');
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            console.error('Error fetching models:', JSON.stringify(data, null, 2));
            return;
        }

        if (data.models) {
            console.log('\nAvailable Models (supporting generateContent):');
            let found = false;
            data.models.forEach(model => {
                // Check if model supports content generation
                if (model.supportedGenerationMethods && model.supportedGenerationMethods.includes('generateContent')) {
                    console.log(`- ${model.name} (${model.displayName})`);
                    found = true;
                }
            });
            if (!found) console.log('No models found that support generateContent.');
        } else {
            console.log('No models property in response.');
            console.log(JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('Network Error:', error);
    }
}

listModels();
