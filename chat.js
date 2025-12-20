export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Only POST allowed" });
    }

    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: "No message provided" });
    }

    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: userMessage }]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        const aiReply =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Sorry, I could not understand.";

        res.status(200).json({ reply: aiReply });

    } catch (error) {
        res.status(500).json({ error: "AI server error" });
    }
}
