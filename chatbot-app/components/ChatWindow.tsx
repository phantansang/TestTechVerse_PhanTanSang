import React, { useState, useEffect, useRef } from "react";
import { sendChatMessage } from "../services/chatService";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const ChatWindow = ({ activeSession }: { activeSession: number }) => {
  const [sessions, setSessions] = useState<{ [key: number]: Message[] }>({});
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [inputMessage, setInputMessage] = useState("");

  // Load chat sessions from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSessions = localStorage.getItem("chatSessions");
      setSessions(storedSessions ? JSON.parse(storedSessions) : {});
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [sessions]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
  
    const newMessage: Message = { id: Date.now(), text: inputMessage, sender: "user" };
  
    // Hiển thị tin nhắn người dùng ngay lập tức
    setSessions((prev) => {
      const updatedSessions = {
        ...prev,
        [activeSession]: [...(prev[activeSession] || []), newMessage],
      };
      localStorage.setItem("chatSessions", JSON.stringify(updatedSessions));
      return updatedSessions;
    });
  
    setInputMessage("");
  
    try {
      const response = await sendChatMessage(inputMessage);
      const botReply: Message = { id: Date.now() + 1, text: response, sender: "bot" };
  
      setSessions((prev) => {
        const updatedSessions = {
          ...prev,
          [activeSession]: [...(prev[activeSession] || []), botReply],
        };
        localStorage.setItem("chatSessions", JSON.stringify(updatedSessions));
        return updatedSessions;
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };  

  return (
    <div className="flex flex-col h-full bg-white shadow-md rounded-lg overflow-hidden">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
        {sessions[activeSession]?.map((msg) => (
          <div key={msg.id} className={`p-2 my-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="p-2 border-t flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
