import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

export default function Home() {
  const [activeSession, setActiveSession] = useState(1);

  return (
    <div className="flex w-full h-screen">
      <Sidebar onSelectSession={setActiveSession} onCreateNewSession={() => setActiveSession(Date.now())} />
      <ChatWindow activeSession={activeSession} />
    </div>
  );
}
