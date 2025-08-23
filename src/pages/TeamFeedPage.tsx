import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Trophy, Users, CalendarDays, Swords, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Dummy Data for a single team and their posts
interface TeamProfile {
  id: string;
  name: string;
  game: string;
  logo: string;
  followers: number;
  description: string;
}

interface GamePost {
  id: string;
  gameTitle: string;
  matchDate: string;
  opponent: string;
  result: 'win' | 'loss';
  score: string;
  mapImage: string; // Image for the map or game
  highlightsLink?: string;
}

const dummyTeamProfiles: { [key: string]: TeamProfile } = {
  'team-vitality': {
    id: 'team-vitality',
    name: 'Team Vitality',
    game: 'Valorant',
    logo: 'https://cdn.pandascore.co/images/team/image/1271/team-vitality-2022-2.png',
    followers: 125000,
    description: 'Official Valorant team for Team Vitality. Striving for greatness in every match!',
  },
  'fnatic': {
    id: 'fnatic',
    name: 'Fnatic',
    game: 'Valorant',
    logo: 'https://yt3.googleusercontent.com/poDTPOpvyiYT0mHN-FTcSy67FVvF8eHZCP3DOiNIH7MYJyxNrDS9jQPbIeuJUupmXl9ypEmRIEw=s900-c-k-c0x00ffffff-no-rj',
    followers: 200000,
    description: 'Fnatic Valorant - always pushing the limits. Fear the black and orange!',
  },
  'evil-geniuses': {
    id: 'evil-geniuses',
    name: 'Evil Geniuses',
    game: 'CS2',
    logo: 'https://cdn.pandascore.co/images/team/image/242/Evil_Geniuses_2023.png',
    followers: 180000,
    description: 'EG CS2 roster. North America\'s finest, always ready to dominate.',
  },
  'g2-esports': {
    id: 'g2-esports',
    name: 'G2 Esports',
    game: 'League of Legends',
    logo: 'https://cdn.pandascore.co/images/team/image/1066/G2_Esports.png',
    followers: 350000,
    description: 'G2 Army reporting for duty! We are G2, we are champions.',
  },
};

const dummyTeamPosts: { [key: string]: GamePost[] } = {
  'team-vitality': [
    { id: 'vp1', gameTitle: 'Valorant Champions Tour', matchDate: '2025-08-20', opponent: 'Sentinels', result: 'win', score: '13-11', mapImage: '/assets/maps/ascent.webp', highlightsLink: '#' },
    { id: 'vp2', gameTitle: 'Valorant Challengers', matchDate: '2025-08-15', opponent: 'Team Liquid', result: 'loss', score: '8-13', mapImage: '/assets/maps/bind.webp' },
    { id: 'vp3', gameTitle: 'Regional Qualifiers', matchDate: '2025-08-10', opponent: 'KOI', result: 'win', score: '13-7', mapImage: '/assets/maps/haven.webp', highlightsLink: '#' },
  ],
  'fnatic': [
    { id: 'fp1', gameTitle: 'Valorant Champions Tour', matchDate: '2025-08-21', opponent: 'LOUD', result: 'win', score: '13-10', mapImage: '/assets/maps/sunset.webp', highlightsLink: '#' },
    { id: 'fp2', gameTitle: 'Valorant Challengers', matchDate: '2025-08-16', opponent: 'DRX', result: 'win', score: '13-9', mapImage: '/assets/maps/pearl.webp', highlightsLink: '#' },
  ],
  'evil-geniuses': [
    { id: 'ep1', gameTitle: 'ESL Pro League', matchDate: '2025-08-19', opponent: 'FaZe Clan', result: 'loss', score: '10-16', mapImage: '/assets/cs2.webp' },
    { id: 'ep2', gameTitle: 'IEM Cologne', matchDate: '2025-08-14', opponent: 'Cloud9', result: 'win', score: '16-14', mapImage: 'https://placehold.co/600x400/000000/FFFFFF?text=CS2+Map' },
  ],
  'g2-esports': [
    { id: 'gp1', gameTitle: 'LEC Summer Finals', matchDate: '2025-08-22', opponent: 'FNC', result: 'win', score: '3-2', mapImage: 'https://placehold.co/600x400/000000/FFFFFF?text=LoL+Map', highlightsLink: '#' },
    { id: 'gp2', gameTitle: 'MSI 2025', matchDate: '2025-05-10', opponent: 'T1', result: 'loss', score: '1-3', mapImage: 'https://placehold.co/600x400/000000/FFFFFF?text=LoL+Map' },
  ],
};

const TeamFeedPage: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [teamProfile, setTeamProfile] = useState<TeamProfile | null>(null);
  const [teamPosts, setTeamPosts] = useState<GamePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    if (teamId) {
      const profile = dummyTeamProfiles[teamId];
      const posts = dummyTeamPosts[teamId];

      if (profile && posts) {
        setTeamProfile(profile);
        setTeamPosts(posts);
      } else {
        setError('Team not found.');
      }
    } else {
      setError('No team selected.');
    }
    setLoading(false);
  }, [teamId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141110] via-[#2a1f1a] to-back text-white">
        <p>Loading team feed...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141110] via-[#2a1f1a] to-back text-white">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!teamProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141110] via-[#2a1f1a] to-back text-white">
        <p>Select a team to view their feed.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#141110] to-[#6E4A2A] relative overflow-x-hidden font-chakra text-white">
      <Header />
      <main className="relative z-10 pt-24 px-6 max-w-7xl mx-auto">
        {/* Team Profile Header */}
        <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-[#EE5946]">
            <AvatarImage src={teamProfile.logo} alt={teamProfile.name} />
            <AvatarFallback className="bg-[#EE5946] text-white text-4xl">
              {teamProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl font-bold text-white mb-2">{teamProfile.name}</h1>
            <p className="text-gray-400 text-lg mb-3">{teamProfile.game}</p>
            <p className="text-white/80 max-w-lg mb-4">{teamProfile.description}</p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="flex items-center text-gray-300">
                <Users className="w-4 h-4 mr-2" />
                <span>{teamProfile.followers.toLocaleString()} Followers</span>
              </div>
              <Button className="bg-[#EE5946] hover:bg-[#EE5946]/80 text-white font-semibold">
                Following
              </Button>
            </div>
          </div>
        </section>

        {/* Team Posts (Latest Games) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Trophy className="w-6 h-6 text-[#EE5946]" /> Latest Games
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamPosts.length > 0 ? (
              teamPosts.map(post => (
                <Card key={post.id} className="bg-white/5 border-white/10 overflow-hidden">
                  <div className="relative h-48 bg-gray-800">
                    <img src={post.mapImage} alt={post.gameTitle} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400/000000/FFFFFF?text=Map+Image')} />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white uppercase">{post.gameTitle}</span>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-300 text-sm">
                        <CalendarDays className="w-4 h-4 mr-2" />
                        <span>{post.matchDate}</span>
                      </div>
                      <div className="flex items-center text-gray-300 text-sm">
                        <Swords className="w-4 h-4 mr-2" />
                        <span>vs {post.opponent}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span className={cn(post.result === 'win' ? 'text-green-400' : 'text-red-400')}>
                        {post.result === 'win' ? 'VICTORY' : 'DEFEAT'}
                      </span>
                      <span className="text-white">{post.score}</span>
                    </div>
                    {post.highlightsLink && (
                      <Link to={post.highlightsLink} className="block mt-4">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                          View Highlights
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-white/50">
                <p className="text-xl">No recent games found for this team.</p>
              </div>
            )}
          </div>
          {teamPosts.length > 3 && ( // Example: show load more if more than 3 posts
            <div className="text-center mt-8">
              <Button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold">
                Load More
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default TeamFeedPage;