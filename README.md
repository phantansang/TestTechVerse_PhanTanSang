# TestTechVerse_PhanTanSang
Test TechVerse
# Chatbot Application

This project consists of two parts:
1. **Frontend (chatbot-app)**: Built with Next.js and TypeScript.
2. **Backend (chatbot-api)**: Built with Express.js and integrated with OpenRouter API for AI-powered responses.

## Prerequisites
Before running the application, ensure you have the following installed:
- Node.js (v16 or later)
- npm or yarn

## Installation and Setup

### 1. Clone the Repository
```sh
git clone https://github.com/phantansang/TestTechVerse_PhanTanSang.git
cd chatbot-app
```

### 2. Install Dependencies
Run the following command in both `chatbot-app` and `chatbot-api` folders:
```sh
npm install
```

## Running the Application

### Start the Backend
1. Navigate to the `chatbot-api` folder:
   ```sh
   cd chatbot-api
   ```
2. Create a `.env` file in `chatbot-api` with your OpenRouter API key, OpenRouter supports creating free API keys using ChatGPT's model (You have to pay to use API keys):
   ```sh
   OPENROUTER_API_KEY=your_api_key_here
   ```
3. Start the backend server:
   ```sh
   npm run dev
   ```
   The backend should now be running at `http://localhost:5000`

### Start the Frontend
1. Navigate to the `chatbot-app` folder:
   ```sh
   cd chatbot-app
   ```
2. Start the Next.js application:
   ```sh
   npm run dev
   ```
   The frontend should now be running at `http://localhost:3000`

## Usage
- Open `http://localhost:3000` in your browser.
- Start a new chat session using the sidebar.
- Send a message and receive AI-generated responses.

