import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Zap } from "lucide-react";

export const BestRound = () => {
  return (
    <Card className="p-6 border-white/20 bg-accent/10 backdrop-blur-sm shadow-2xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-5 h-5 text-accent" />
          <h2 className="text-xl font-semibold text-foreground">Best Round</h2>
        </div>
        <p className="text-muted-foreground text-sm">Round 23 - Most impressive performance</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-accent border-white/20">
              Team Attackers Victory
            </Badge>
            <Badge className="bg-accent" variant="secondary">Elimination</Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-foreground">PlayerOne (Jett)</p>
                <p className="text-sm text-muted-foreground">Ace - 5 eliminations</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-accent rounded-lg">
                <span className="block text-xl font-bold text-victory">5</span>
                <span className="text-xs text-muted-foreground">Kills</span>
              </div>
              <div className="p-3 bg-accent rounded-lg">
                <span className="block text-xl font-bold text-defeat">0</span>
                <span className="text-xs text-muted-foreground">Deaths</span>
              </div>
              <div className="p-3 bg-accent rounded-lg">
                <span className="block text-xl font-bold text-neutral">1</span>
                <span className="text-xs text-muted-foreground">Assists</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            Round Highlights
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-white mt-2"></div>
              <div>
                <p className="text-sm font-medium text-foreground">Entry Kill on A Site</p>
                <p className="text-xs text-muted-foreground">PlayerOne eliminated EnemyOne with headshot</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-white mt-2"></div>
              <div>
                <p className="text-sm font-medium text-foreground">Triple Kill</p>
                <p className="text-xs text-muted-foreground">3 consecutive eliminations in 8 seconds</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-white mt-2"></div>
              <div>
                <p className="text-sm font-medium text-foreground">Clutch Victory</p>
                <p className="text-xs text-muted-foreground">1v2 situation converted to round win</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};