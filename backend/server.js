import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log("Gemini Key Loaded?", GEMINI_API_KEY ? "✅ Yes" : "❌ No");

app.get("/api/list-models", async (req, res) => {
  if (!GEMINI_API_KEY) {
    return res.status(400).json({ error: "GEMINI_API_KEY not set in environment" });
  }

  const versions = ["v1", "v1beta"];
  let lastError = null;

  for (const ver of versions) {
    try {
      const url = 'https://generativelanguage.googleapis.com/${ver}/models?key=${GEMINI_API_KEY}';
      const resp = await axios.get(url, { timeout: 10000 });
      return res.json({ apiVersionTried: ver, data: resp.data });
    } catch (err) {
      lastError = err;
    }
  }

  return res.status(500).json({
    error: "Unable to list models",
    details: lastError?.response?.data || lastError?.message,
  });
});

app.post("/api/symptom-check", async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms) {
      return res.status(400).json({ error: "Please provide symptoms" });
    }

    const prompt = `
You are a medical assistant. Analyze these symptoms: "${symptoms}".
Provide the output in this format:

Possible Conditions:
• condition 1
• condition 2

Severity:
• Mild / Moderate / Severe

Next Steps:
• step 1
• step 2

See a Doctor If:
• step 1
• step 2

⚠ End with: "This is for educational purposes only and not medical advice."
`;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + GEMINI_API_KEY,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI.";

    res.json({ reply });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "⚠ Error reaching AI server. Please check API key or try again.",
      details: error.response?.data,
    });
  }
});

app.listen(PORT, () => {
  console.log('✅ Backend running at http://localhost:${PORT}');
});