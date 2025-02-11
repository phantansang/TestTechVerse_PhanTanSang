const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const chatbotData = JSON.parse(fs.readFileSync(path.join(__dirname, "chatbot.json"), "utf-8"));

// API để lấy phản hồi ngẫu nhiên
app.get("/api/chatbot", (req, res) => {
  const randomResponse = chatbotData.responses[Math.floor(Math.random() * chatbotData.responses.length)];
  res.json({ message: randomResponse });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend is running on http://localhost:${PORT}`);
});
