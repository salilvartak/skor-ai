import React, { useState, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { cn } from "@/lib/utils";

// Define the Message interface
interface Message {
  text: string;
  sender: 'user' | 'bot';
}

// Ensure the API key is present before initializing the client.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("VITE_GEMINI_API_KEY environment variable is not set.");
}

// Initialize the Gemini API client.
const genAI = new GoogleGenerativeAI('AIzaSyAwSWkIM04uzSSWv-NrBcUiqwGnKTJz31U');

// Initialize the chat session and model once.
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
const chat = model.startChat({
  generationConfig: {
    maxOutputTokens: 1000,
    temperature: 0.7,
  },
});

const suggestedQuestions = [
  'How can I improve my aim in Valorant?',
  'What are some effective strategies for playing Apex Legends?',
  'Explain the new updates in CS2.',
];

const GeminiChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Add a direct check for the API key on component mount
  useEffect(() => {
    if (!apiKey) {
      setError("API key not found. Please set VITE_GEMINI_API_KEY in your .env file.");
    }
  }, []);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading || error) return;

    const newMessage: Message = { text: messageText, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chat.sendMessage(messageText);
      const botResponseText = result.response.text();

      if (!botResponseText) {
        throw new Error("Empty response from API.");
      }

      const botResponse: Message = {
        text: botResponseText,
        sender: 'bot'
      };

      setMessages(prev => [...prev, botResponse]);

    } catch (apiError) {
      console.error('Error calling Gemini API:', apiError);
      setMessages(prev => [...prev, { text: 'Sorry, I am unable to connect to the AI or received an empty response. Please check your API key and network connection.', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  if (error) {
    return (
      <div className="w-full h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-4">
        <p className="text-red-500 font-bold text-center">{error}</p>
        <p className="text-sm text-gray-400 mt-2 text-center">
          Please check your `.env` file and restart the server.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="w-6 h-6 text-accent" />
          <span className="text-white font-bold">Skor AI Assistant</span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm scrollbar-thin scrollbar-thumb-accent scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
            <Bot className="w-12 h-12 mb-4 text-accent" />
            <p>Ask me anything about gaming strategy or your profile stats!</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {suggestedQuestions.map((q, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(q)}
                  className="text-xs text-blue-300 bg-white/5 border border-white/10 px-2 py-1 rounded-full hover:bg-white/20 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                "flex space-x-2 items-start",
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {msg.sender === 'bot' && (
                <div className="mt-1">
                  <Bot className="w-5 h-5 text-accent" />
                </div>
              )}
              <div
                className={cn(
                  "rounded-lg p-2 max-w-[80%]",
                  msg.sender === 'user' ? 'bg-accent text-white' : 'bg-white/10 text-white'
                )}
              >
                {msg.text}
              </div>
              {msg.sender === 'user' && (
                <div className="mt-1">
                  <User className="w-5 h-5 text-accent" />
                </div>
              )}
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex space-x-2 items-start">
            <div className="mt-1">
              <Bot className="w-5 h-5 text-accent" />
            </div>
            <div className="rounded-lg bg-white/10 p-2 max-w-[80%] text-white">
              <span className="animate-pulse">...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="p-4 border-t border-white/20 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Skor AI..."
          className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
        <button
          onClick={() => handleSendMessage(input)}
          disabled={isLoading}
          className="text-gray-400 hover:text-accent transition disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default GeminiChatbot;