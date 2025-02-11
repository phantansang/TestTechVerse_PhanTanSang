import React from "react";
import InputBox from "./InputBox";

const ChatWindow = () => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto bg-white">
        <div className="mb-4">Chat messages will appear here</div>
      </div>
      <InputBox />
    </div>
  );
};

export default ChatWindow;
