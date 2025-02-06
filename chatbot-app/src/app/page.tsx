"use client"
import { useState } from "react";
import { Send } from "lucide-react";
import chatData from "../../data/chatbot";

export default function Home() {
  const [messages, setMessages] = useState(chatData.initialMessages);
  const [input, setInput] = useState("");
  const [chats, ] = useState(chatData.recentChats);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { text: input, sender: "user" };
    setMessages([...messages, newMessage]);
    setInput("");
    
    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [...prev, chatData.botResponse]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-64 bg-gray-800 p-4">
        <h2 className="text-lg font-bold mb-4">Recent Chats</h2>
        <ul className="space-y-2">
          {chats.map((chat, index) => (
            <li key={index} className="p-2 bg-gray-700 rounded-md cursor-pointer">
              {chat}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col flex-1 p-4">
        <h1 className="text-xl font-bold text-center mb-4">ChatGPT Clone</h1>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === "user" ? "bg-blue-500 ml-auto" : "bg-gray-700"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex items-center border-t border-gray-700 p-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 bg-gray-800 border-none rounded-md text-white"
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} className="ml-2 p-2 bg-blue-600 rounded-md">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
