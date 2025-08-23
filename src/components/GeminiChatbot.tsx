// src/pages/Home.tsx
import React, { useState } from 'react';
import { Send, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const suggestedQuestions = [
  'Find me Valorant tournaments to take part in.',
  "What is FaZe Clan's current win rate on the map Inferno in CS2?",
  'Who won the League of Legends World Championship in 2022?',
];

const Home: React.FC = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

const goToChat = (question: string) => {
  if (!question.trim()) return;
  const encoded = encodeURIComponent(question);
  navigate(`/chat?question=${encoded}`, { state: { initialQuestion: question } });
};


  return (
    <div className="w-full  rounded-2xl  flex flex-col items-center justify-center p-4 mx-auto mt-10 mb-10">
      <img src="/assets/hunter_icon.png" alt="Agent Hunter Logo" className="w-16 h-16 mb-4" />
      <p className="text-white mb-4 text-lg font-semibold">Ask me anything about the World of Esports!</p>

      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {suggestedQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => goToChat(q)}
            className="text-xs text-blue-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="p-4 border border-white/20 flex items-center space-x-2 rounded-2xl mt-4 w-full max-w-2l focus-within:border-accent transition-colors">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message Agent Hunter..."
          className="flex-1 border-none bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
        <button
          onClick={() => goToChat(input)}
          disabled={!input.trim()}
          className="text-gray-400 hover:text-accent transition disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      </div>
  );
};

export default Home;
