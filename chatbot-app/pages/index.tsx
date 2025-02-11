import React, { useState } from "react";
import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [activeSession, setActiveSession] = useState(1);

  return (
    <div className="flex h-screen">
      <Sidebar onSelectSession={setActiveSession} onCreateNewSession={() => setActiveSession(Date.now())} />
      <div className="flex-1 flex flex-col">
        <ChatWindow activeSession={activeSession} />
      </div>
    </div>
  );
};

export default Home;
