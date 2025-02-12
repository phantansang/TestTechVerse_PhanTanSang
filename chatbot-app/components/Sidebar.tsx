import React, { useEffect, useState } from "react";

interface Session {
  id: number;
  name: string;
}

interface SidebarProps {
  activeSessionId: number;
  onSelectSession: (sessionId: number) => void;
  onCreateNewSession: (newSessionId: number) => void;
  onUpdateSessionName: (sessionId: number, newName: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSessionId, onSelectSession, onCreateNewSession, onUpdateSessionName }) => {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSessions = localStorage.getItem("chatList");
      setSessions(storedSessions ? JSON.parse(storedSessions) : [{ id: 1, name: "New Chat" }]);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chatList", JSON.stringify(sessions));
    }
  }, [sessions]);

  const createNewSession = () => {
    const newSessionId = Date.now();

    setSessions((prevSessions) => {
      const updatedSessions = [...prevSessions];

      // Đổi tên session hiện tại nếu nó là "New Chat"
      const currentSessionIndex = updatedSessions.findIndex((s) => s.id === activeSessionId);
      if (currentSessionIndex !== -1 && updatedSessions[currentSessionIndex].name === "New Chat") {
        const chatNumber = updatedSessions.filter((s) => s.name.startsWith("Chat")).length + 1;
        updatedSessions[currentSessionIndex].name = `Chat ${chatNumber}`;
        onUpdateSessionName(activeSessionId, updatedSessions[currentSessionIndex].name);
      }

      // Thêm session mới với tên "New Chat"
      updatedSessions.push({ id: newSessionId, name: "New Chat" });

      return updatedSessions;
    });

    onCreateNewSession(newSessionId);
  };

  return (
    <div className="w-64 h-full bg-gray-100 p-4">
      <h2 className="text-lg font-bold mb-4">Chat Sessions</h2>
      <button className="w-full bg-blue-500 text-white p-2 rounded-lg mb-4" onClick={createNewSession}>
        + New Chat
      </button>
      <ul>
        {sessions.map((session) => (
          <li
            key={session.id}
            className={`p-2 cursor-pointer rounded-lg ${session.id === activeSessionId ? "bg-blue-300 font-bold" : "hover:bg-gray-300"}`}
            onClick={() => onSelectSession(session.id)}
          >
            {session.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
