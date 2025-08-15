export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.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}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error connecting to ChatGPT" });
  }
}