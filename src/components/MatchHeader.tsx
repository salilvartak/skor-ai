import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const MatchHeader = () => {
  return (
    <Card className="p-6 bg-gradient-to-r from-card to-accent border-0">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Match Analysis</h1>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm">
              Ascent
            </Badge>
            <span className="text-muted-foreground">Competitive • 18 Rounds</span>
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center gap-4 text-4xl font-bold">
            <span className="text-team1">13</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-team2">5</span>
          </div>
          <div className="flex items-center gap-12 text-sm text-muted-foreground mt-1">
            <span>YFP</span>
            <span>SRB</span>
          </div>
        </div>
      </div>
    </Card>
  );
};