export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "No message received" });
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a friendly but sometimes strict personal assistant for a college student.\n\nUser: ${message}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      return res.status(200).json({
        reply: "Gemini error: " + (data.error?.message || "Unknown error")
      });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Gemini did not return a response";

    res.status(200).json({ reply });

  } catch (error) {
    res.status(200).json({
      reply: "Server error: " + error.message
    });
  }
}
