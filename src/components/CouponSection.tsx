import React, { useState } from 'react';
import { Gift, Percent, Star, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface Coupon {
  id: number;
  title: string;
  game: string;
  discount: string;
  code: string;
  expiresIn: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isRevealed: boolean;
}

const CouponSection: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: 1,
      title: "Epic Game Bundle",
      game: "Steam Store",
      discount: "75% OFF",
      code: "EPIC75",
      expiresIn: "2 days",
      rarity: 'epic',
      isRevealed: false
    },
    {
      id: 2,
      title: "Battle Pass Premium",
      game: "Fortnite",
      discount: "50% OFF",
      code: "BATTLE50",
      expiresIn: "5 days",
      rarity: 'rare',
      isRevealed: false
    },
    {
      id: 3,
      title: "Legendary Skin Pack",
      game: "Valorant",
      discount: "90% OFF",
      code: "LEGEND90",
      expiresIn: "1 day",
      rarity: 'legendary',
      isRevealed: false
    },
    {
      id: 4,
      title: "DLC Collection",
      game: "Cyberpunk 2077",
      discount: "60% OFF",
      code: "CYBER60",
      expiresIn: "1 week",
      rarity: 'common',
      isRevealed: false
    }
  ]);

  const rarityConfig = {
    common: {
      color: 'text-gray-400',
      glow: 'shadow-gray-400/20',
      border: 'border-gray-400/30',
      bgEffect: 'from-gray-500/5'
    },
    rare: {
      color: 'text-blue-400',
      glow: 'shadow-blue-400/20',
      border: 'border-blue-400/30',
      bgEffect: 'from-blue-500/5'
    },
    epic: {
      color: 'text-purple-400',
      glow: 'shadow-purple-400/20',
      border: 'border-purple-400/30',
      bgEffect: 'from-purple-500/5'
    },
    legendary: {
      color: 'text-yellow-400',
      glow: 'shadow-yellow-400/20',
      border: 'border-yellow-400/30',
      bgEffect: 'from-yellow-500/5'
    }
  };

  const navigate = useNavigate();

  const revealCoupon = (id: number) => {
    setCoupons(prev =>
      prev.map(coupon =>
        coupon.id === id ? { ...coupon, isRevealed: true } : coupon
      )
    );
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Coupon code ${code} copied to clipboard!`);
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Gift className="w-6 h-6 text-[#EE5946] mr-3" />
          <h2 className="text-2xl font-bold text-white">Game Coupons</h2>
          <div className="ml-4 px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
            <span className="text-yellow-400 text-sm font-medium">Treasure Vault</span>
          </div>
        </div>
        <Link to="/coupons">
          <Button variant="outline" className="h-8 px-3 text-sm text-[#EE5946] border-[#EE5946] hover:bg-[#EE5946]/20">
            Show More
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coupons.slice(0, 3).map((coupon) => {
          const rarity = rarityConfig[coupon.rarity];

          return (
            <div
              key={coupon.id}
              className={`group relative bg-white/5 backdrop-blur-sm border ${rarity.border} rounded-2xl overflow-hidden transition-all duration-500 hover:bg-white/10 hover:shadow-[0_0_30px_#EE594630] cursor-pointer transform hover:scale-105`}
              onClick={() => !coupon.isRevealed && revealCoupon(coupon.id)}
            >
              {/* Rarity Badge */}
              <div className="absolute top-3 right-3 z-10">
                <div className={`flex items-center space-x-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full border ${rarity.border}`}>
                  <Star className={`w-3 h-3 ${rarity.color}`} />
                  <span className={`${rarity.color} text-xs font-medium capitalize`}>
                    {coupon.rarity}
                  </span>
                </div>
              </div>

              {/* Scratch Effect */}
              {!coupon.isRevealed && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center z-20 transition-all duration-700 group-hover:opacity-80">
                  <div className="text-center">
                    <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-2 animate-pulse" />
                    <p className="text-white font-medium">Click to Reveal</p>
                    <p className="text-white/60 text-sm">Scratch & Win!</p>
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(107,114,128,0.8)_32%)] opacity-60"></div>
                </div>
              )}

              {/* Coupon Content */}
              <div className="relative p-6 h-full flex flex-col">
                <div className="absolute top-2 left-2">
                  <div className={`w-2 h-2 ${rarity.color.replace('text-', 'bg-')} rounded-full animate-ping`}></div>
                </div>
                <div className="absolute bottom-2 right-2">
                  <div className={`w-1 h-1 ${rarity.color.replace('text-', 'bg-')} rounded-full animate-pulse`}></div>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white mb-1">{coupon.title}</h3>
                  <p className="text-white/60 text-sm">{coupon.game}</p>
                </div>

                <div className="mb-4 flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Percent className="w-5 h-5 text-[#EE5946]" />
                    <span className="text-2xl font-bold text-[#EE5946]">{coupon.discount}</span>
                  </div>

                  {coupon.isRevealed && (
                    <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg p-3 mt-3">
                      <p className="text-white/60 text-xs mb-1">Coupon Code</p>
                      <p className="text-white font-mono font-bold tracking-wider">{coupon.code}</p>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-white/40 text-xs">Expires in</p>
                  <p className="text-white text-sm font-medium">{coupon.expiresIn}</p>
                </div>

                {coupon.isRevealed ? (
                  <button
                    onClick={() => copyToClipboard(coupon.code)}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 text-white font-medium py-3 rounded-xl transition-all duration-300"
                  >
                    Copy Code
                  </button>
                ) : (
                  <button className="w-full bg-gradient-to-r from-[#EE5946] to-red-600 hover:from-red-600 hover:to-[#EE5946] text-white font-medium py-3 rounded-xl transition-all duration-300">
                    Reveal Coupon
                  </button>
                )}

                {/* Hover Background Effect */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${rarity.bgEffect} to-yellow-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
              </div>

              {/* Reveal Shine Animation */}
              {coupon.isRevealed && (
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-2xl animate-pulse pointer-events-none"></div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CouponSection;
