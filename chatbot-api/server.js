const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ message: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error fetching response from OpenRouter:", error);
    res.status(500).json({ error: "Failed to connect to OpenRouter API" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend is running on http://localhost:${PORT}`);
});
