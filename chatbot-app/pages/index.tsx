import React, { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sidebar";

const Home = () => {
    const [activeSession, setActiveSession] = useState<number>(1);
    const [sessions, setSessions] = useState<{ id: number; name: string }[]>([]);
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedSessions = localStorage.getItem("chatList");
        setSessions(storedSessions ? JSON.parse(storedSessions) : [{ id: 1, name: "New Chat" }]);
      }
    }, []);
  
    const createNewSession = () => {
      const newSession = { id: Date.now(), name: `Chat ${sessions.length + 1}` };
      const updatedSessions = [...sessions, newSession];
  
      setSessions(updatedSessions);
      setActiveSession(newSession.id);
  
      if (typeof window !== "undefined") {
        localStorage.setItem("chatList", JSON.stringify(updatedSessions));
      }
    };

    const updateSessionName = (sessionId: number, newName: string) => {
      setSessions((prevSessions) =>
        prevSessions.map((session) => (session.id === sessionId ? { ...session, name: newName } : session))
      );
    
      localStorage.setItem(
        "chatList",
        JSON.stringify(sessions.map((session) => (session.id === sessionId ? { ...session, name: newName } : session)))
      );
    };
    

  return (
    <div className="flex h-screen">
      <Sidebar 
  activeSessionId={activeSession} 
  onSelectSession={setActiveSession}
  onUpdateSessionName={updateSessionName} 
  onCreateNewSession={createNewSession} 
/>

      <div className="flex-1 flex flex-col">
        <ChatWindow activeSession={activeSession} />
      </div>
    </div>
  );
};

export default Home;
