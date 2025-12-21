export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    res.status(200).json({ reply: "Backend is working fine" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
