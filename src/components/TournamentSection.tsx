// src/components/TournamentSection.tsx
import React, { useState } from 'react';
import { Trophy, Users, Clock, Zap } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { allTournaments, Tournament } from '@/data/tournaments';

const TournamentSection: React.FC = () => {
  const [hoveredTournament, setHoveredTournament] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Trophy className="w-6 h-6 text-[#EE5946] mr-3" />
          <h2 className="text-2xl font-bold text-white">Gaming Tournaments</h2>
          <div className="ml-4 px-3 py-1 bg-[#EE5946]/20 border border-[#EE5946]/30 rounded-full">
            <span className="text-[#EE5946] text-sm font-medium">Live Arena</span>
          </div>
        </div>
        <Link to="/tournaments" className="text-[#EE5946] text-sm font-semibold hover:underline transition">Show More</Link>
      </div>

      <div className="relative">
        {/* Decorative blur background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#EE5946]/10 to-blue-500/10 rounded-3xl blur-xl pointer-events-none"></div>

        {/* Main interactive block */}
        <div className="relative z-10 bg-black/30 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Decorative grid */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="w-full h-full bg-[linear-gradient(rgba(238,89,70,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] rounded-3xl"></div>
          </div>

          {/* Tournament cards */}
          <div
            className="relative grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {allTournaments.slice(0, 3).map((tournament) => (
              <div
                key={tournament.id}
                className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:bg-white/10 hover:border-[#EE5946]/50 hover:shadow-[0_0_30px_rgba(238,89,70,0.3)] cursor-pointer ${hoveredTournament === tournament.id ? 'transform scale-105' : ''}`}
                onMouseEnter={() => setHoveredTournament(tournament.id)}
                onMouseLeave={() => setHoveredTournament(null)}
              >
                {/* Status */}
                <div className="absolute top-4 right-4">
                  {tournament.status === 'live' && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-500 text-xs font-medium">LIVE</span>
                    </div>
                  )}
                  {tournament.status === 'upcoming' && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-yellow-500" />
                      <span className="text-yellow-500 text-xs font-medium">SOON</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white mb-1 w-[80%]">{tournament.title}</h3>
                  <p className="text-white/60 text-sm">{tournament.game}</p>
                </div>

                {/* Prize */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-[#EE5946]" />
                    <span className="text-[#EE5946] font-bold text-xl">{tournament.prize}</span>
                  </div>
                  <p className="text-white/40 text-xs">Prize Pool</p>
                </div>

                {/* Participants & Time */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-white/60" />
                    <span className="text-white text-sm">{tournament.participants.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{tournament.timeLeft}</p>
                    <p className="text-white/40 text-xs">Time Left</p>
                  </div>
                </div>

                {/* Button updated to navigate to the new page */}
                <button
                  onClick={() => navigate(`/live-match/${tournament.id}`)}
                  className="w-full bg-gradient-to-r from-[#EE5946] to-red-600 hover:from-red-600 hover:to-[#EE5946] text-white font-medium py-3 rounded-xl transition-all duration-300 transform group-hover:scale-105"
                >
                  {tournament.status === 'live' ? 'Watch Live' : 'Join Tournament'}
                </button>

                {/* Holographic glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#EE5946]/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TournamentSection;