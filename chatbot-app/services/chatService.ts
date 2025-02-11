export const fetchChatResponse = async (): Promise<string> => {
    try {
      const response = await fetch("http://localhost:5000/api/chatbot");
      const data = await response.json();
      return data.message || "Sorry, I don't understand.";
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      return "Sorry, something went wrong.";
    }
  };
  