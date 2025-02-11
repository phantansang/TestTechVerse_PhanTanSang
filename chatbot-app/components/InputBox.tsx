import React, { useState } from "react";
import chatbotData from "../public/data/chatbot.json"; // Import mock data

interface InputBoxProps {
  onSendMessage: (text: string, sender: "user" | "bot") => void;
}

const InputBox: React.FC<InputBoxProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;

    // Gửi tin nhắn của user
    onSendMessage(message, "user");
    setMessage("");

    // Chọn phản hồi ngẫu nhiên từ chatbot
    const botResponse =
      chatbotData.responses[
        Math.floor(Math.random() * chatbotData.responses.length)
      ];

    // Gửi tin nhắn của bot sau 1s
    setTimeout(() => onSendMessage(botResponse, "bot"), 1000);
  };

  return (
    <div className="p-4 border-t bg-gray-100">
      <div className="flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-md"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default InputBox;
