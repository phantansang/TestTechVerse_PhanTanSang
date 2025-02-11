export const sendChatMessage = async (message: string): Promise<string> => {
    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
  
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error("Failed to send message:", error);
      return "Oops! Something went wrong.";
    }
  };
  