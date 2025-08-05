import React, { useState } from 'react';
import { Coins, Gift, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Airdrop {
  id: number;
  title: string;
  token: string;
  amount: string;
  value: string;
  endDate: string;
  participants: number;
  requirements: string[];
}

const AirdropSection: React.FC = () => {
  const [hoveredAirdrop, setHoveredAirdrop] = useState<number | null>(null);
  const navigate = useNavigate();

  const airdrops: Airdrop[] = [
    {
      id: 1,
      title: "GameFi Genesis",
      token: "GFG",
      amount: "1,000",
      value: "$250",
      endDate: "3 days left",
      participants: 12547,
      requirements: ["Connect Wallet", "Join Discord", "Complete Tasks"]
    },
    {
      id: 2,
      title: "Metaverse Tokens",
      token: "META",
      amount: "500",
      value: "$150",
      endDate: "1 week left",
      participants: 8934,
      requirements: ["Hold NFT", "Stake Tokens", "Refer Friends"]
    },
    {
      id: 3,
      title: "DeFi Rewards",
      token: "DFR",
      amount: "2,500",
      value: "$500",
      endDate: "2 days left",
      participants: 15632,
      requirements: ["Provide Liquidity", "Vote on Proposals"]
    },
    {
      id: 4,
      title: "DeFi Rewards",
      token: "DFR",
      amount: "2,500",
      value: "$500",
      endDate: "2 days left",
      participants: 15632,
      requirements: ["Provide Liquidity", "Vote on Proposals"]
    },
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Coins className="w-6 h-6 text-[#EE5946] mr-3" />
          <h2 className="text-2xl font-bold text-white">Web3 Airdrops</h2>
          <div className="ml-4 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full">
            <span className="text-blue-400 text-sm font-medium">Digital Vault</span>
          </div>
        </div>
        <Link to="/airdrops" className="text-[#EE5946] text-sm font-semibold hover:underline transition">Show More</Link>
      </div>

      <div className="relative">
        {/* Sci-fi Vault Frame */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
        <div className="relative bg-black/40 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden">
          
          {/* Floating Particles Background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>

          {/* Airdrop Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {airdrops.slice(0, 3).map((airdrop) => (
              <div
                key={airdrop.id}
                className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-700 cursor-pointer hover:bg-white/8 hover:border-blue-400/30`}
                onMouseEnter={() => setHoveredAirdrop(airdrop.id)}
                onMouseLeave={() => setHoveredAirdrop(null)}
              >
                {/* Floating Coins Animation */}
                <div className="absolute top-2 right-2">
                  <div className="relative">
                    <Coins className={`w-6 h-6 text-yellow-400 transition-transform duration-500 ${hoveredAirdrop === airdrop.id ? 'animate-bounce' : ''}`} />
                    {hoveredAirdrop === airdrop.id && (
                      <>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      </>
                    )}
                  </div>
                </div>

                {/* Token Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white mb-1">{airdrop.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#EE5946] font-bold">{airdrop.token}</span>
                    <span className="text-white/60">•</span>
                    <span className="text-white/60 text-sm">{airdrop.endDate}</span>
                  </div>
                </div>

                {/* Reward Amount */}
                <div className="mb-4">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-white">{airdrop.amount}</span>
                    <span className="text-[#EE5946] font-medium">{airdrop.token}</span>
                  </div>
                  <p className="text-green-400 text-sm">≈ {airdrop.value}</p>
                </div>

                {/* Participants */}
                <div className="mb-4">
                  <p className="text-white/60 text-xs">Participants</p>
                  <p className="text-white font-medium">{airdrop.participants.toLocaleString()}</p>
                </div>

                {/* Requirements */}
                <div className="mb-6">
                  <p className="text-white/60 text-xs mb-2">Requirements</p>
                  <div className="space-y-1">
                    {airdrop.requirements.slice(0, 2).map((req, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#EE5946] rounded-full"></div>
                        <span className="text-white/80 text-xs">{req}</span>
                      </div>
                    ))}
                    {airdrop.requirements.length > 2 && (
                      <div className="text-white/60 text-xs">
                        +{airdrop.requirements.length - 2} more
                      </div>
                    )}
                  </div>
                </div>

                {/* Claim Button */}
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-medium py-3 rounded-xl transition-all duration-300 transform group-hover:scale-105">
                  <div className="flex items-center justify-center space-x-2">
                    <Gift className="w-4 h-4" />
                    <span>Claim Airdrop</span>
                  </div>
                </button>

                {/* Blockchain Nodes Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirdropSection;