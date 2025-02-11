import React, { useState } from "react";

interface Session {
  id: number;
  name: string;
}

interface SidebarProps {
  onSelectSession: (sessionId: number) => void;
  onCreateNewSession: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectSession, onCreateNewSession }) => {
  const [sessions, setSessions] = useState<Session[]>([{ id: 1, name: "New Chat" }]);

  const createNewSession = () => {
    const newSession = { id: sessions.length + 1, name: `Chat ${sessions.length + 1}` };
    setSessions((prev) => [...prev, newSession]);
    onCreateNewSession();
  };

  return (
    <div className="w-64 p-4 border-r bg-gray-900 text-white flex flex-col">
      <button onClick={createNewSession} className="mb-4 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
        + New Chat
      </button>
      <div className="flex-1 overflow-y-auto">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="p-3 cursor-pointer hover:bg-gray-700 rounded-lg"
            onClick={() => onSelectSession(session.id)}
          >
            {session.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
