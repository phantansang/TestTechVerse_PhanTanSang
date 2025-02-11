import React, { useEffect, useState } from "react";

interface Session {
  id: number;
  name: string;
}

interface SidebarProps {
  onSelectSession: (sessionId: number) => void;
  onCreateNewSession: (newSessionId: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectSession, onCreateNewSession }) => {
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
    const newSession = { id: Date.now(), name: `Chat ${sessions.length + 1}` };
    setSessions([...sessions, newSession]);
    onCreateNewSession(newSession.id);
  };

  return (
    <div className="w-64 h-full bg-gray-100 p-4">
      <h2 className="text-lg font-bold mb-4">Chat Sessions</h2>
      <button className="w-full bg-blue-500 text-white p-2 rounded-lg mb-4" onClick={createNewSession}>
        + New Chat
      </button>
      <ul>
        {sessions.map((session) => (
          <li key={session.id} className="p-2 cursor-pointer hover:bg-gray-300 rounded-lg" onClick={() => onSelectSession(session.id)}>
            {session.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
