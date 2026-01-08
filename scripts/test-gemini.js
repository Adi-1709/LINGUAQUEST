
async function testGemini() {
  const apiKey = 'AIzaSyA0MErRTZHF2ycMrQuYrvHE3rDDs1ia438';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  console.log('Testing Gemini API Key...');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: 'Hello, say "API Key is working!"' }]
        }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', JSON.stringify(data, null, 2));
    } else {
      console.log('Success!');
      console.log('Response:', data.candidates[0].content.parts[0].text);
    }

  } catch (error) {
    console.error('Network/Script Error:', error);
  }
}

testGemini();
