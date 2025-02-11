import React, { useState } from "react";
import InputBox from "./InputBox";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (text: string, sender: "user" | "bot") => {
    setMessages((prev) => [...prev, { id: prev.length + 1, text, sender }]);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto bg-white">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 my-1 rounded-md ${
              msg.sender === "user" ? "bg-blue-200 self-end" : "bg-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <InputBox onSendMessage={addMessage} />
    </div>
  );
};

export default ChatWindow;
