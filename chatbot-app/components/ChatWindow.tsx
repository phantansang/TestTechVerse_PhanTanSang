import React, { useState } from "react";
import InputBox from "./InputBox";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const ChatWindow = ({ activeSession }: { activeSession: number }) => {
  const [sessions, setSessions] = useState<{ [key: number]: Message[] }>({
    1: [],
  });

  const addMessage = (text: string, sender: "user" | "bot") => {
    setSessions((prev) => ({
      ...prev,
      [activeSession]: [...(prev[activeSession] || []), { id: Date.now(), text, sender }],
    }));
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto bg-white">
        {(sessions[activeSession] || []).map((msg) => (
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
