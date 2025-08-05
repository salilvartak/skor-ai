import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Mic, MicOff } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { cn } from "@/lib/utils";

// Message type
interface Message {
  text: string;
  sender: 'user' | 'bot';
}

// Load API key from .env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ VITE_GEMINI_API_KEY environment variable is not set.");
}

console.log("✅ Loaded Gemini API Key:", apiKey); // Debug log

// Initialize Gemini client if API key exists
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI?.getGenerativeModel({ model: "gemini-2.5-flash" });
const chat = model?.startChat({
  generationConfig: {
    maxOutputTokens: 2000, 
    temperature: 0.7,
  },
});

// Suggested questions
const suggestedQuestions = [ 
  'Find me Valorant tournaments to take part in.', 
  'What is FaZe Clans current win rate on the map Inferno in CS2', 
  'Who won the League of Legends World Championship in 2022?', 
];

const GeminiChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);

  // useRef to keep track of the SpeechRecognition instance
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Check API key and initialize SpeechRecognition on mount
  useEffect(() => {
    if (!apiKey) {
      setError("API key not found. Please set VITE_GEMINI_API_KEY in your .env file.");
    }
    
    // Check for browser support and initialize the Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        // Automatically send the message after a pause in speech
        setTimeout(() => handleSendMessage(transcript), 500); 
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    } else {
      console.warn('Web Speech API is not supported by this browser.');
    }
  }, []);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading || error || !chat) return;

    // Modify the user's message to request structured data.
    const modifiedMessage = `${messageText}. `;

    const newMessage: Message = { text: messageText, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log("📤 Sending modified message to Gemini:", modifiedMessage);
      const result = await chat.sendMessage(modifiedMessage);

      console.log("📥 Full Gemini Response:", result);
      const botResponseText = result?.response?.text?.() ?? '';
      console.log("🧠 Gemini Response Text:", botResponseText);

      if (!botResponseText.trim()) {
        throw new Error("Empty or invalid response from Gemini API.");
      }

      const botMessage: Message = { text: botResponseText, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);

    } catch (apiError) {
      console.error('❌ Error calling Gemini API:', apiError);
      setMessages(prev => [...prev, {
        text: 'Sorry, I am unable to connect to the AI or received an empty response. Please check your API key and network connection.',
        sender: 'bot'
      }]);
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

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Your browser does not support the Web Speech API. Please use a browser like Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  if (error) {
    return (
      <div className="w-full max-w-lg h-[600px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-4">
        <p className="text-red-500 font-bold text-center">{error}</p>
        <p className="text-sm text-gray-400 mt-2 text-center">
          Please check your `.env` file and restart the server.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col mb-10">
      {/* Header */}
      <div className="p-4 border-b border-white/20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="\assets\hunter_icon.png" alt="Gemini Logo" className="w-8 h-8" />
          <span className="text-white font-bold">Agent Hunter</span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm scrollbar-thin scrollbar-thumb-accent scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
            <img src="\assets\hunter_icon.png" alt="Gemini Logo" className="w-12 h-12 mb-2" />
            <p>Ask me anything about the World of Esports!</p>
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
                  <img src="\assets\hunter_icon.png" alt="Gemini Logo" className="w-5 h-5" />
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

      {/* Input */}
      <div className="p-4 border-t border-white/20 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Agent Hunter..."
          className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
        <button
          onClick={handleVoiceInput}
          disabled={isLoading}
          className={cn(
            "text-gray-400 hover:text-accent transition disabled:opacity-50",
            isListening && "text-red-500 hover:text-red-600 animate-pulse"
          )}
        >
          {isListening ? <Mic className="w-5 h-5 text-accent" /> : <Mic className="w-5 h-5" />}
        </button>
        <button
          onClick={() => handleSendMessage(input)}
          disabled={isLoading || !input.trim()}
          className="text-gray-400 hover:text-accent transition disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default GeminiChatbot;