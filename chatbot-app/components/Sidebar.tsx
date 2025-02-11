import React from "react";

const Sidebar = () => {
  return (
    <div className="w-1/4 bg-gray-800 text-white p-4">
      <h2 className="text-lg font-bold mb-4">Chat Sessions</h2>
      <ul>
        <li className="p-2 hover:bg-gray-700 cursor-pointer">Session 1</li>
        <li className="p-2 hover:bg-gray-700 cursor-pointer">Session 2</li>
      </ul>
    </div>
  );
};

export default Sidebar;
