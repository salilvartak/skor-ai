import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Info, BarChart2, Lightbulb, Bookmark } from 'lucide-react';

const LiveMatchPage: React.FC = () => {
  const streamInfo = {
    title: '2025 WDG Valorant Challengers Korea',
    youtubeVideoId: '_t0myNtibio?si=_nv9QBf8qQVcAiX_', // Replace with actual YouTube LIVE video ID
  };

  const [youtubeUrl, setYoutubeUrl] = useState<string>('');

  useEffect(() => {
    // Construct the YouTube embed URL
    const embedUrl = `https://www.youtube.com/embed/${streamInfo.youtubeVideoId}?autoplay=1&modestbranding=1&rel=0`;
    setYoutubeUrl(embedUrl);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#141110] to-[#6E4A2A] relative overflow-x-hidden font-chakra text-white">
      <Header />
      <main className="relative z-10 pt-24 px-6 max-w-full mx-auto flex flex-col h-[calc(100vh-6rem)]">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Left Column: Video Player */}
          <div className="md:col-span-2 flex flex-col">
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              {youtubeUrl ? (
                <iframe
                  src={youtubeUrl}
                  height="100%"
                  width="100%"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="YouTube Live Stream"
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              ) : (
                <div className="flex items-center justify-center h-full">
                  Loading Stream...
                </div>
              )}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md p-2 rounded-lg z-10">
                <h2 className="text-xl font-bold text-white">{streamInfo.title}</h2>
              </div>
            </div>
          </div>

          {/* Right Column: Information Panel */}
          <div className="md:col-span-1 bg-black/40 backdrop-blur-md rounded-xl p-4 flex flex-col h-full">
            <Tabs defaultValue="ai-commentary" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="ai-commentary" className="flex items-center gap-1"><Lightbulb className="h-4 w-4" /> AI</TabsTrigger>
                <TabsTrigger value="stats" className="flex items-center gap-1"><BarChart2 className="h-4 w-4" /> Stats</TabsTrigger>
                <TabsTrigger value="strategy" className="flex items-center gap-1"><Info className="h-4 w-4" /> Strategy</TabsTrigger>
                <TabsTrigger value="highlights" className="flex items-center gap-1"><Bookmark className="h-4 w-4" /> Highlights</TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-hidden">
                {/* AI Commentary Tab */}
                <TabsContent value="ai-commentary" className="mt-0 h-full">
                  <Card className="h-full bg-white/5 border-white/10 flex flex-col">
                    <CardContent className="h-full p-4 overflow-y-auto">
                      <div className="space-y-3 text-sm text-gray-300">
                        <div className="flex items-start gap-2"><span className="text-accent font-mono font-bold">[01:15]</span><p>AI: Team Alpha is setting up for a default on A.</p></div>
                        <div className="flex items-start gap-2"><span className="text-accent font-mono font-bold">[01:28]</span><p>AI: Aggressive peak from Player B!</p></div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Stats Tab */}
                <TabsContent value="stats" className="mt-0 h-full">
                  <Card className="h-full bg-white/5 border-white/10 flex flex-col">
                    <CardContent className="h-full p-4 overflow-y-auto">
                      <h3 className="text-lg font-bold text-white mb-4">Player Statistics</h3>
                      <div className="grid grid-cols-2 divide-x divide-white/10 text-sm text-gray-300">
                        {/* Column 1 */}
                        <div className="pr-4">
                          <h4 className="text-md font-semibold text-white mb-3 text-center">Team A</h4>
                          <div className="space-y-4">
                            {['Player A', 'Player B', 'Player C', 'Player D', 'Player E'].map((player, i) => (
                              <div key={i} className="bg-white/10 p-3 rounded-lg">
                                <p className="font-semibold text-accent">{player}</p>
                                <p>K/D: {(Math.random() * 2).toFixed(1)}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Column 2 */}
                        <div className="pl-4">
                          <h4 className="text-md font-semibold text-white mb-3 text-center">Team B</h4>
                          <div className="space-y-4">
                            {['Player F', 'Player G', 'Player H', 'Player I', 'Player J'].map((player, i) => (
                              <div key={i} className="bg-white/10 p-3 rounded-lg">
                                <p className="font-semibold text-accent">{player}</p>
                                <p>K/D: {(Math.random() * 2).toFixed(1)}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Strategy Tab */}
                <TabsContent value="strategy" className="mt-0 h-full">
                  <Card className="h-full bg-white/5 border-white/10 flex flex-col">
                    <CardContent className="h-full p-4 overflow-y-auto">
                      <h3 className="text-lg font-bold text-white mb-4">Strategic Insights</h3>
                      <div className="space-y-4 text-sm text-gray-300">
                        <div className="bg-white/10 p-3 rounded-lg">
                          <p className="font-semibold text-accent">Current Round Analysis</p>
                          <p>Team Alpha is on a full buy, likely aiming for an A-site execute. Watch for early aggression from Player A.</p>
                        </div>
                        <div className="bg-white/10 p-3 rounded-lg">
                          <p className="font-semibold text-accent">Opponent Tendencies</p>
                          <p>Team Beta often defaults to a slow B-site push after losing two consecutive rounds. Expect smokes and flashes.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Highlights Tab */}
                <TabsContent value="highlights" className="mt-0 h-full">
                  <Card className="h-full bg-white/5 border-white/10 flex flex-col">
                    <CardContent className="h-full p-4 overflow-y-auto">
                      <h3 className="text-lg font-bold text-white mb-4">Match Highlights</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white/10 p-3 rounded-lg flex items-center space-x-3">
                          <div className="w-16 h-10 bg-gray-700 rounded flex-shrink-0 flex items-center justify-center text-xs">0:45</div>
                          <p className="text-sm">Incredible 3K by Player A on B-site defense!</p>
                        </div>
                        <div className="bg-white/10 p-3 rounded-lg flex items-center space-x-3">
                          <div className="w-16 h-10 bg-gray-700 rounded flex-shrink-0 flex items-center justify-center text-xs">2:10</div>
                          <p className="text-sm">Clutch 1v2 by Player C to secure the round.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Bottom Section: Live Chat */}
        <div className="mt-auto h-[200px] flex flex-col bg-black/40 backdrop-blur-md rounded-xl p-4">
          <h3 className="text-lg font-bold text-accent mb-2">Live Chat</h3>
          <ScrollArea className="flex-1 pr-4 mb-2">
            <div className="space-y-2 text-sm text-gray-300">
              <p><span className="font-bold text-blue-400">User1:</span> Let's go!</p>
            </div>
          </ScrollArea>
          <div className="flex space-x-2">
            <Input className="flex-1 bg-white/5 border-white/20" placeholder="Say something..." />
            <Button className="bg-accent hover:bg-accent/80"><Send className="h-4 w-4" /></Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveMatchPage;
