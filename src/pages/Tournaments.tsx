import React, { useState, useMemo } from 'react';
import { Trophy, Users, Clock, Zap, Filter } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { allTournaments, Tournament } from '@/data/tournaments';

// Define the filter state type
type FilterState = {
  status: 'all' | 'live' | 'upcoming';
  game: 'all' | string; // 'game' can now be any string from the data
};

const AllTournamentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredTournament, setHoveredTournament] = useState<number | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    game: 'all',
  });

  // Dynamically get unique game names from the tournaments data
  const uniqueGames = useMemo(() => {
    const games = new Set<string>();
    allTournaments.forEach(tournament => games.add(tournament.game));
    return ['all', ...Array.from(games)];
  }, [allTournaments]); // Re-calculate only if allTournaments data changes

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredTournaments = allTournaments.filter(tournament => {
    const statusMatch = filters.status === 'all' || tournament.status === filters.status;
    const gameMatch = filters.game === 'all' || tournament.game === filters.game;
    return statusMatch && gameMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0A09] to-[#2E201B] relative overflow-x-hidden font-sans text-white">
      <Header />
      <main className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <section className="mb-12">
          {/* Main heading and filter controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
            <div className="flex items-center">
              <Trophy className="w-8 h-8 text-accent mr-4" />
              <h1 className="text-3xl font-bold text-white tracking-wide">Gaming Tournaments</h1>
              <div className="ml-4 px-3 py-1 bg-[#FF6B6B]/20 border border-[#FF6B6B]/30 rounded-full hidden sm:block">
                <span className="text-accent text-sm font-medium">Full List</span>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="w-5 h-5 text-white/70 mr-1" />
              {/* Status Filters */}
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="bg-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-200"
              >
                <option value="all" className="bg-[#1a1a1a] text-white">All Statuses</option>
                <option value="live" className="bg-[#1a1a1a] text-red-400">Live</option>
                <option value="upcoming" className="bg-[#1a1a1a] text-yellow-400">Upcoming</option>
              </select>
              {/* Game Filters - Now dynamically generated */}
              <select
                value={filters.game}
                onChange={(e) => handleFilterChange('game', e.target.value)}
                className="bg-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] transition-colors duration-200"
              >
                {/* Dynamically create options from uniqueGames array */}
                {uniqueGames.map((game) => (
                  <option 
                    key={game} 
                    value={game} 
                    className="bg-[#1a1a1a] text-white"
                  >
                    {game === 'all' ? 'All Games' : game}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tournament Grid */}
          <div className="relative">
            <div className="relative z-10">
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] rounded-3xl"></div>
              </div>
              <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTournaments.length > 0 ? (
                  filteredTournaments.map((tournament) => (
                    <div
                      key={tournament.id}
                      className={`group relative bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-[#FF6B6B]/50 hover:shadow-[0_0_30px_rgba(255,107,107,0.3)] cursor-pointer ${hoveredTournament === tournament.id ? 'scale-105' : ''}`}
                      onMouseEnter={() => setHoveredTournament(tournament.id)}
                      onMouseLeave={() => setHoveredTournament(null)}
                    >
                      {/* Status badge 
                      <div className="absolute top-4 right-4">
                        {tournament.status === 'live' && (
                          <span className="flex items-center text-xs font-semibold px-2 py-1 rounded-full bg-red-600/30 text-accent border border-red-400">
                            <div className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></div>
                            LIVE
                          </span>
                        )}
                        {tournament.status === 'upcoming' && (
                          <span className="flex items-center text-xs font-semibold px-2 py-1 rounded-full bg-yellow-600/30 text-yellow-400 border border-yellow-400">
                            <Clock className="w-3 h-3 mr-2" />
                            SOON
                          </span>
                        )}
                      </div>*/}

                      {/* Tournament details */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-white mb-1">{tournament.title}</h3>
                        <p className="text-white/70 text-sm font-medium">{tournament.game}</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                          <div className="flex items-center">
                            <Zap className="w-5 h-5 text-accent mr-3" />
                            <div>
                              <p className="text-white/60 text-xs">Prize Pool</p>
                              <p className="text-accent font-bold text-lg">{tournament.prize}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-5 h-5 text-white/60 mr-3" />
                            <div>
                              <p className="text-white/60 text-xs">Participants</p>
                              <p className="text-white font-semibold text-lg">{tournament.participants.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-white/60 text-sm">
                          <p>Time Left: <span className="text-white font-medium">{tournament.timeLeft}</span></p>
                        </div>
                      </div>

                      {/* Action button */}
                      <button
                        onClick={() => navigate(tournament.link)}
                        className="mt-6 w-full bg-gradient-to-r from-accent to-accent/80  text-white font-bold py-3 rounded-xl transition-all duration-300 transform group-hover:scale-[1.02] shadow-lg"
                      >
                        {tournament.status === 'live' ? 'Watch Live' : 'Join Tournament'}
                      </button>

                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B6B]/10 to-[#47a8ff]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-12 text-white/50">
                    <p className="text-xl">No tournaments found with the selected filters.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AllTournamentsPage;
