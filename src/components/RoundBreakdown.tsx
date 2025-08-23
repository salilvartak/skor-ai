import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const rounds = [
  { round: 1, winner: "team1", type: "Plant" },
  { round: 2, winner: "team1", type: "Elimination" },
  { round: 3, winner: "team1", type: "Defuse" },
  { round: 4, winner: "team1", type: "Elimination" },
  { round: 5, winner: "team1", type: "Plant" },
  { round: 6, winner: "team1", type: "Time" },
  { round: 7, winner: "team2", type: "Elimination" },
  { round: 8, winner: "team1", type: "Plant" },
  { round: 9, winner: "team2", type: "Elimination" },
  { round: 10, winner: "team1", type: "Defuse" },
  { round: 11, winner: "team2", type: "Plant" },
  { round: 12, winner: "team1", type: "Elimination" },
  { round: 13, winner: "team1", type: "Plant" },
  { round: 14, winner: "team2", type: "Elimination" },
  { round: 15, winner: "team1", type: "Defuse" },
  { round: 16, winner: "team1", type: "Plant" },
  { round: 17, winner: "team2", type: "Elimination" },
  { round: 18, winner: "team1", type: "Plant" },
  
];

export const RoundBreakdown = () => {
  return (
    <Card className="p-6 border border-white/20 bg-accent/10 backdrop-blur-sm shadow-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Round Breakdown</h2>
        <p className="text-muted-foreground text-sm">Detailed round-by-round results</p>
      </div>

      <div className="space-y-4">
        {/* Half indicators */}
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-accent" variant="secondary">First Half (1-12)</Badge>
          <Badge className="bg-accent" variant="secondary">Second Half (13-18)</Badge>
        </div>

        {/* Round grid */}
        <div className="grid grid-cols-12 gap-2">
          {rounds.slice(0, 12).map((round) => (
            <div
              key={round.round}
              className={cn(
                "aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-xs font-semibold transition-all hover:scale-105",
                round.winner === "team1" 
                  ? "bg-green-500 border-team1 text-team1" 
                  : "bg-red-500 border-team2 text-team2"
              )}
            >
              <span>{round.round}</span>
              <span className="text-[10px] opacity-75">{round.type}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-2">
          {rounds.slice(12).map((round) => (
            <div
              key={round.round}
              className={cn(
                "aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-xs font-semibold transition-all hover:scale-105",
                round.winner === "team1" 
                  ? "bg-green-500 border-team1 text-team1" 
                  : "bg-red-500  border-team2 text-team2"
              )}
            >
              <span>{round.round}</span>
              <span className="text-[10px] opacity-75">{round.type}</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-200 border-2 border-team1"></div>
            <span className="text-sm text-muted-foreground">YFP</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-400 border-2 border-team2"></div>
            <span className="text-sm text-muted-foreground">SRB</span>
          </div>
        </div>
      </div>
    </Card>
  );
};