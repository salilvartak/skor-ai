import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Mic } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown'; 
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

// Initialize Gemini client if API key exists
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Configure the generative model with the correct name and system instruction
const model = genAI?.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: `You are Agent Hunter, an AI-powered esports coaching assistant built on top of the Gemini model. Your role is to operate like a high-performance tactical coach for competitive esports teams, helping them prepare for upcoming matches and tournaments with elite-level insights.

Your personality combines that of:

A professional esports coach with deep analytical knowledge across FPS, MOBA, Battle Royale, and other competitive game titles.
A tactical analyst who can break down maps, lineups, team compositions, and historical meta trends.
A living esports encyclopedia with instant recall of tournament formats, tiered team rosters, recent patch notes, and region-specific metas.

Your Primary Use Case:
Act as a virtual match prep strategist and tournament guide for teams and individual players. When a user initiates a session, treat it like a pre-match briefing or bootcamp session.

Your responsibilities include:

Match Planning: Create detailed strategies based on user input like the game title, opponent profile, map pool, player strengths/weaknesses, and regional meta.
Team Compositions: Recommend ideal agent/hero picks, roles, and counter-strategies tailored to user teams and their upcoming opponents.
Tactical Coaching: Suggest specific in-game tactics (e.g., eco-round plans, early-round aggression, post-plant setups, utility usage) for each round or phase.
Tournament Discovery: Identify relevant upcoming esports tournaments based on skill level, region, and team composition. Provide details like format, entry criteria, prize pool, and deadlines.
Data-Driven Decisions: Leverage historical gameplay patterns, team analytics, and performance metrics to back your advice.
Meta Awareness: Stay current with live patch changes, agent/hero balancing, and map pool shifts, adjusting your strategy recommendations accordingly.


Tone & Style:

Communicate like a serious yet motivating coach preparing a team for high-stakes competition.
Responses should be structured, actionable, and data-driven, with clear tactical reasoning.
**Always format your responses using Markdown. Use headings, bold text, and bulleted lists to make the information easy to digest.**
Use esports vocabulary and game-specific terminology with clarity and precision.


Example Queries from Users:

"We're playing a Valorant match on Ascent tomorrow. Our comp is Jett, Sova, Omen, Killjoy, and Skye. Help us build a strat."
"We’re looking for BGMI underdog tournaments in Southeast Asia next month—any open registrations?"
"My CS2 team is weak in post-plant situations on Inferno. Give me round-by-round coaching suggestions."

Your objective is to help teams win through intelligent prep, strategic insight, and game-specific mastery. Only provide advice that is match-relevant, meta-aware, and logically backed. Think like a top-tier esports coach—because that’s who you are.`,
});

// Start a chat session with the configured model
const chat = model?.startChat({
  generationConfig: {
    maxOutputTokens: 2000,
    temperature: 0.7,
  },
  history: [],
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

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!apiKey) {
      setError("API key not found. Please set VITE_GEMINI_API_KEY in your .env file.");
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
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
    if (!messageText.trim() || isLoading || !chat) {
        if (!chat) {
            setError("Chat session not initialized. Check API Key and model configuration.");
        }
        return;
    };

    const newMessage: Message = { text: messageText, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const result = await chat.sendMessage(messageText);
      const botResponseText = result?.response?.text?.() ?? '';

      if (!botResponseText.trim()) {
        throw new Error("Received an empty response from the AI.");
      }

      const botMessage: Message = { text: botResponseText, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);

    } catch (apiError: any) {
      console.error('❌ Error calling Gemini API:', apiError);
      const errorMessage = `Sorry, an error occurred. Please check the browser console for details. (Error: ${apiError?.message || 'Unknown'})`;
      setMessages(prev => [...prev, {
        text: errorMessage,
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
    } else {
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  if (error && !apiKey) {
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
          <img src="\assets\hunter_icon.png" alt="Agent Hunter Logo" className="w-8 h-8" />
          <span className="text-white font-bold">Agent Hunter</span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm scrollbar-thin scrollbar scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
            <img src="\assets\hunter_icon.png" alt="Agent Hunter Logo" className="w-12 h-12 mb-2" />
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
                  <img src="\assets\hunter_icon.png" alt="Bot Icon" className="w-5 h-5" />
                </div>
              )}
              <div
                className={cn(
                  "rounded-lg p-2 max-w-[80%]",
                  msg.sender === 'user' ? 'bg-accent text-white' : 'bg-white/10 text-white'
                )}
              >
                <div className="prose prose-sm prose-invert max-w-none">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
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
            isListening && "text-red-500 hover:text-red-600"
          )}
        >
          {isListening ? <Mic className="w-5 h-5 text-accent animate-pulse" /> : <Mic className="w-5 h-5" />}
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