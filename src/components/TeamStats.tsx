import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Import agent images


// Agent image mapping
const agentImages: { [key: string]: string } = {
  Jett: "/assets/agent/jett.webp",
  Sage: "/assets/agent/sage.png",
  Sova: "/assets/agent/sova.png",
  Breach: "/assets/agent/breach.png",
  Omen: "/assets/agent/omen.png",
  Reyna: "/assets/agent/Reyna.webp",
  Cypher: "/assets/agent/cypher.png",
  Phoenix:"/assets/agent/phoenix.png",
  Viper: "/assets/agent/viper.png",
  Killjoy: "/assets/agent/Killjoy.png",
};

const team1Players = [
  { name: "PlayerOne", agent: "Jett", kills: 24, deaths: 18, assists: 7, rating: 1.2 },
  { name: "PlayerTwo", agent: "Sage", kills: 16, deaths: 20, assists: 12, rating: 0.9 },
  { name: "PlayerThree", agent: "Sova", kills: 19, deaths: 19, assists: 8, rating: 1.0 },
  { name: "PlayerFour", agent: "Breach", kills: 14, deaths: 17, assists: 10, rating: 0.8 },
  { name: "PlayerFive", agent: "Omen", kills: 12, deaths: 15, assists: 9, rating: 0.7 },
];

const team2Players = [
  { name: "EnemyOne", agent: "Reyna", kills: 22, deaths: 19, assists: 5, rating: 1.1 },
  { name: "EnemyTwo", agent: "Cypher", kills: 18, deaths: 17, assists: 11, rating: 1.0 },
  { name: "EnemyThree", agent: "Phoenix", kills: 20, deaths: 18, assists: 6, rating: 1.0 },
  { name: "EnemyFour", agent: "Viper", kills: 15, deaths: 16, assists: 8, rating: 0.9 },
  { name: "EnemyFive", agent: "Killjoy", kills: 14, deaths: 15, assists: 9, rating: 0.8 },
];

export const TeamStats = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-6 border-0">
      {/* Team 1 */}
      <Card className="p-6 border border-white/20 bg-accent/10 backdrop-blur-sm shadow-2xl">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-team1 mb-2">Team Attackers</h2>
          <div className="grid grid-cols-5 gap-2 text-sm text-muted-foreground font-medium">
            <span>Player</span>
            <span>Agent</span>
            <span>K</span>
            <span>D</span>
            <span>A</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {team1Players.map((player, index) => (
            <div key={index} className="grid grid-cols-5 gap-2 items-center py-2 border-b border-border/50 last:border-b-0">
              <span className="font-medium text-foreground">{player.name}</span>
              <div className="flex items-center gap-2">
                <img 
                  src={agentImages[player.agent]} 
                  alt={player.agent}
                  className="w-8 h-8 rounded-full object-cover border-2 border-border"
                />
                <span className="text-xs text-muted-foreground">{player.agent}</span>
              </div>
              <span className="text-victory font-semibold">{player.kills}</span>
              <span className="text-defeat font-semibold">{player.deaths}</span>
              <span className="text-neutral font-semibold">{player.assists}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <span className="text-2xl font-bold text-victory">85</span>
              <p className="text-xs text-muted-foreground">Total Kills</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-defeat">89</span>
              <p className="text-xs text-muted-foreground">Total Deaths</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-neutral">46</span>
              <p className="text-xs text-muted-foreground">Total Assists</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Team 2 */}
      <Card className="p-6 border-0  border-white/20 bg-accent/10 backdrop-blur-sm shadow-2xl">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-team2 mb-2">Team Defenders</h2>
          <div className="grid grid-cols-5 gap-2 text-sm text-muted-foreground font-medium">
            <span>Player</span>
            <span>Agent</span>
            <span>K</span>
            <span>D</span>
            <span>A</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {team2Players.map((player, index) => (
            <div key={index} className="grid grid-cols-5 gap-2 items-center py-2 border-b border-border/50 last:border-b-0">
              <span className="font-medium text-foreground">{player.name}</span>
              <div className="flex items-center gap-2">
                <img 
                  src={agentImages[player.agent]} 
                  alt={player.agent}
                  className="w-8 h-8 rounded-full object-cover border-2 border-border"
                />
                <span className="text-xs text-muted-foreground">{player.agent}</span>
              </div>
              <span className="text-victory font-semibold">{player.kills}</span>
              <span className="text-defeat font-semibold">{player.deaths}</span>
              <span className="text-neutral font-semibold">{player.assists}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <span className="text-2xl font-bold text-victory">89</span>
              <p className="text-xs text-muted-foreground">Total Kills</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-defeat">85</span>
              <p className="text-xs text-muted-foreground">Total Deaths</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-neutral">39</span>
              <p className="text-xs text-muted-foreground">Total Assists</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};