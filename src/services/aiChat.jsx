export async function sendMessage(prompt) {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer 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',
          //  Authorization: 'Bearer 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', // updated trip api key as prev was expired 
        'HTTP-Referer': window.location.href,       // Used by OpenRouter for tracking
        'X-Title': 'AI Trip Planner',               // Optional, gives context to OpenRouter
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct:free', // You can change the model here
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed API call with status ${response.status}`);
    }

    const data = await response.json();
    const rawContent = data?.choices?.[0]?.message?.content; //  Step 1: Get raw content from API

    // Step 2: Try to parse it as JSON (after cleaning)
    try {
      const cleaned = rawContent.replace(/^```json|```$/g, '').trim(); // 🧹 Remove ```json or ``` wrappers
      const parsed = JSON.parse(cleaned); //  Parse to JSON
      return parsed; //  Return parsed JSON object
    } catch (jsonError) {
      console.error(" Failed to parse AI response as JSON:", jsonError);
      return null; //  Fallback if parsing fails
    }

  } catch (error) {
    console.error(" Error in sendMessage:", error);
    return null;
  }
}
