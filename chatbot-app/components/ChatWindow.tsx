import React, { useState, useEffect, useRef } from "react";
import InputBox from "./InputBox";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const ChatWindow = ({ activeSession }: { activeSession: number }) => {
  const [sessions, setSessions] = useState<{ [key: number]: Message[] }>({ 1: [] });
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const addMessage = (text: string, sender: "user" | "bot") => {
    setSessions((prev) => ({
      ...prev,
      [activeSession]: [...(prev[activeSession] || []), { id: Date.now(), text, sender }],
    }));
  };

  useEffect(() => {
    // Cuộn xuống cuối khi có tin nhắn mới
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: "smooth" });
  }, [sessions]);

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto">
        {(sessions[activeSession] || []).map((msg) => (
          <div
            key={msg.id}
            className={`p-3 my-1 max-w-xs rounded-lg ${
              msg.sender === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200"
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
