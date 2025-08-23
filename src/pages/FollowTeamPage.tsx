import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/Header';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Dummy data for teams (updated with slugs for routing)
const teams = [
  { id: 'team-vitality', name: 'Team Vitality', game: 'Valorant', logo: 'https://www.thespike.gg/_next/image?url=https%3A%2F%2Fcdn.thespike.gg%2Fsalah%252F600px-Team_Vitality_2023_darkmode_1730891332550.png&w=640&q=75' },
  { id: 'fnatic', name: 'Fnatic', game: 'Valorant', logo: 'https://yt3.googleusercontent.com/poDTPOpvyiYT0mHN-FTcSy67FVvF8eHZCP3DOiNIH7MYJyxNrDS9jQPbIeuJUupmXl9ypEmRIEw=s900-c-k-c0x00ffffff-no-rj' },
  { id: 'evil-geniuses', name: 'Evil Geniuses', game: 'CS2', logo: 'https://pbs.twimg.com/media/FyUUbX_WAAEGQ9z.jpg' },
  { id: 'g2-esports', name: 'G2 Esports', game: 'League of Legends', logo: 'https://ae01.alicdn.com/kf/H36b51e7718e94d3abc022cd5419b2aa83.jpg' },
  { id: 'Cloud9', name: 'Cloud9', game: 'Valorant', logo: 'https://pbs.twimg.com/profile_images/1846236998635606018/IYnjvvVx_200x200.jpg' },
  { id: 'Team Liquid', name: 'Team Liquid', game: 'Dota 2', logo: 'https://taiyoro.gg/_next/image?url=https%3A%2F%2Ftaiyoro-prod-media.s3.amazonaws.com%2Fteam_organization%2FgL0JpMyXGw.png&w=3840&q=75' },
];

const FollowTeamPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [followedTeams, setFollowedTeams] = useState<string[]>([]);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleFollow = (teamId: string) => {
    setFollowedTeams(prev => 
      prev.includes(teamId) ? prev.filter(id => id !== teamId) : [...prev, teamId]
    );
  };

  const handleViewTeamFeed = (teamId: string) => {
    navigate(`/teams/${teamId}`); // Navigate to the new TeamFeedPage
  };

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.game.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#141110] to-[#6E4A2A] relative overflow-x-hidden font-chakra">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 bg-[#EE5946]/5 rounded-full blur-xl animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          ></div>
        ))}
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
      </div>

      <Header />
      <main className="relative z-10 pt-24 px-6 max-w-7xl mx-auto">
        <section className="mb-12">
          <div className="flex flex-col items-center justify-between mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white via-white to-[#EE5946] bg-clip-text text-transparent">
              Follow Your Favorite Teams
            </h1>
            <p className="text-white/80 max-w-xl text-center text-lg">
              Search for teams and add them to your list to get the latest updates on their matches and tournaments.
            </p>
          </div>
          <div className="max-w-md mx-auto mb-12 relative">
            <Input
              type="search"
              placeholder="Search for a team or game..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-4 pr-4 py-3 rounded-full bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EE5946] transition-all duration-300"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map(team => (
              <Card 
                key={team.id} 
                className="bg-white/5 border border-white/10 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-[#EE5946]/50 hover:shadow-[0_0_20px_rgba(238,89,70,0.3)] cursor-pointer"
                onClick={() => handleViewTeamFeed(team.id)} // Navigate to team feed on card click
              >
                <CardHeader className="flex flex-row items-center space-x-4 p-4">
                  <Avatar className="w-16 h-16 border-2 border-[#EE5946]">
                    <AvatarImage src={team.logo} alt={team.name} />
                    <AvatarFallback className="bg-[#EE5946] text-white text-xl">
                      {team.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-white text-xl">{team.name}</CardTitle>
                    <CardDescription className="text-gray-400 text-sm">{team.game}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click event from firing
                      toggleFollow(team.id);
                    }}
                    className={cn(
                      'w-full font-semibold rounded-lg py-2 transition-all duration-200',
                      followedTeams.includes(team.id)
                        ? 'bg-gray-600/60 hover:bg-gray-700/70 text-white border border-gray-500'
                        : 'bg-[#EE5946] hover:bg-[#EE5946]/80 text-white'
                    )}
                  >
                    {followedTeams.includes(team.id) ? 'Unfollow' : 'Follow'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default FollowTeamPage;