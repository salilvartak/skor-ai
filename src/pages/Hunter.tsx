import React from 'react';
import {Header} from '@/components/Header';
import TournamentSection from '@/components/TournamentSection';
import AirdropSection from '@/components/AirdropsSection';
import CouponSection from '@/components/CouponSection';
import Featured from '@/components/featured';
import Chatbot from '@/components/GeminiChatbot';


function App() {
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
              left: `${12 * 100}%`,
              top: `${10 * 100}%`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          ></div>
        ))}
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
      </div>

      <Header />
      
      <main className="relative z-10 pt-24 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white via-white to-[#EE5946] bg-clip-text text-transparent">
              Welcome to Hunter
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Your ultimate gaming control center for tournaments, Web3 rewards, and exclusive coupons
            </p>
            <Chatbot />
            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold text-[#EE5946] mb-2">15,847</div>
                <div className="text-white/60">Active Players</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold text-[#EE5946] mb-2">$2.4M</div>
                <div className="text-white/60">Total Rewards</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold text-[#EE5946] mb-2">142</div>
                <div className="text-white/60">Live Tournaments</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Sections */}
        
        <Featured />
        
        <TournamentSection />
        <AirdropSection />
        <CouponSection />

        {/* Footer */}
        <footer className="mt-16 pb-8 text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Start staking today and let your assets work<br></br> for you while you earn effortlessly</h3>
            
            <button className="bg-gradient-to-r from-[#EE5946] to-red-600 hover:from-red-600 hover:to-[#EE5946] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
              Start Staking
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;