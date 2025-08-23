import { MatchHeader } from "@/components/MatchHeader";
import { TeamStats } from "@/components/TeamStats";
import { RoundBreakdown } from "@/components/RoundBreakdown";
import { BestRound } from "@/components/BestRound";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-6 bg-gradient-to-b from-[#141110] to-[#6E4A2A] text-white font-chakra">
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
      <div className="max-w-7xl mx-auto space-y-6">
        <MatchHeader />
        <TeamStats />
        <RoundBreakdown />
        <BestRound />
      </div>
    </div>
  );
};

export default Index;