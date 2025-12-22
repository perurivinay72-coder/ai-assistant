export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { message } = req.body;

  res.status(200).json({
    reply: "Backend connected successfully"
  });
}

