import React, { useEffect, useState } from "react";
import {
  Home,
  Brain,
  Trophy,
  Box,
  BarChart2,
  User,
  Settings,
  CircleAlert,
  CalendarSync,
  Search,
  LogOut, // Import the LogOut icon
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/firebase'; // Import auth from your Firebase config



export default function Dashboard() {
  const [price, setPrice] = useState<string>("-");
  const [pctChange, setPctChange] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseUser | null>(null); // State for the current user
  const navigate = useNavigate(); // Hook for navigation


  // Effect to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Function to handle logging out
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
      // Optional: Display a user-friendly error message
    }
  };

  const agentSlides = [
    {
      title: "Agent Precision",
      button: "Try Now →",
      image: "",
      bg: "bg-[url('/assets/cs2.webp')]",
      link: "/agent/precision",
    },
    {
      title: "Agent Hunter",
      button: "Try Now →",
      image: "",
      bg: "bg-[url('/assets/hunter.webp')]",
      link: "/dashboard/hunter",
    },
    {
      title: "SKOR Coin",
      button: "Checkout →",
      image: "",
      bg: "bg-[url('/assets/coin.png')]",
      link: "/agent/scope",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(true);

  // Slide transition logic
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade out
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % agentSlides.length);
        setFade(true); // Fade in new slide
      }, 300); // Match with transition duration
    }, 5000);
    return () => clearInterval(interval);
  }, [agentSlides.length]);


  // Helper function to get initials for avatar
  const getUserInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };


  return (
    <div className="font-chakra min-h-screen bg-gradient-to-br from-[#141110] via-[#2a1f1a] to-back grid grid-cols-[auto_1fr_auto]">
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
      {/* Sidebar */}

      <aside className="fixed top-4 bottom-4 left-4 w-20 flex flex-col items-center gap-4 py-6 rounded-3xl bg-black/40 backdrop-blur-md z-10">
        <img src="/assets/logo.png" alt="Logo" className="w-10" />
        <div className="flex flex-col gap-12 mt-6 text-accent">
          <Link to="/home" className="group flex flex-col items-center gap-1">
            <Home className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            <span className="text-xs text-gray-400 group-hover:text-white">Home</span>
          </Link>
          <Link to="/ai" className="group flex flex-col items-center gap-1">
            <Brain className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            <span className="text-xs text-gray-400 group-hover:text-white">Agents</span>
          </Link>
          <Link to="/tournaments" className="group flex flex-col items-center gap-1">
            <Trophy className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            <span className="text-xs text-gray-400 group-hover:text-white">Tournaments</span>
          </Link>
          <Link to="/labs" className="group flex flex-col items-center gap-1">
            <Box className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            <span className="text-xs text-gray-400 group-hover:text-white">Labs</span>
          </Link>
          <Link to="/analytics" className="group flex flex-col items-center gap-1">
            <BarChart2 className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            <span className="text-xs text-gray-400 group-hover:text-white">Analytics</span>
          </Link>
        </div>
        {/* Logout button and user avatar at the bottom */}
        <div className="mt-auto flex flex-col items-center gap-4">
          <Link to="/profile" className="group flex flex-col items-center gap-1">
            <User className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            <span className="text-xs text-gray-400 group-hover:text-white">Profile</span>
          </Link>
          <Link to="/settings" className="group flex flex-col items-center gap-1">
            <Settings className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            <span className="text-xs text-gray-400 group-hover:text-white">Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="group flex flex-col items-center gap-1 focus:outline-none"
            aria-label="Logout"
          >
            <LogOut className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors" />
            <span className="text-xs text-gray-400 group-hover:text-red-500">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="col-start-2 col-end-3 p-6 grid grid-rows-[auto_1fr_auto] gap-6 ml-[96px] mr-[96px]">
        {/* Header */}
        <header className="flex justify-between items-center">
          <h1 className="text-xl font-bold font-chakra text-white">
            Ready to Play, <span className="text-accent">{user?.displayName || "Player"}</span>
          </h1>
          <div className="relative w-full max-w-xs ">
            {/* Magnifying glass icon */}
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 w-5 h-5 z-20 pointer-events-none"
            />

            {/* Search input field */}
            <input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800/40 backdrop-blur-md text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition z-10"
            />
          </div>
        </header>

        {/* Main Grid */}
        <section className="grid grid-cols-3 gap-6 items-stretch">
          {/* Left Column */}
          <div className="col-span-2 grid grid-rows-[auto_auto_1fr] gap-6">
            {/* Carousel Agent Box */}
            {/* Carousel Agent Box with transitions */}
            <div
              className={`relative h-[280px] rounded-2xl overflow-hidden bg-cover bg-center duration-500 ease-in-out ${
                agentSlides[currentSlide].bg
              } ${fade ? "opacity-100" : "opacity-0"} transition-opacity`}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm p-6 z-10 flex flex-col justify-between">
                <div>
                  <h2 className="text-5xl text-accent font-semibold mb-4 font-chakra">
                    {agentSlides[currentSlide].title.split(" ")[0]}{" "}
                    <span className="text-white">
                      {agentSlides[currentSlide].title.split(" ")[1]}
                    </span>
                  </h2>
                </div>
                <Link
                  to={agentSlides[currentSlide].link}
                  className="w-fit bg-accent px-4 py-2 rounded-full text-xl font-bold hover:bg-orange-500 transition"
                >
                  {agentSlides[currentSlide].button}
                </Link>
                <img src="/assets/0027.png" alt="Agent" className="absolute right-0 bottom-0 w-[75%]" />
              </div>
              <img
                src={agentSlides[currentSlide].image}
                alt="Agent"
                className="absolute right-0 bottom-0 w-[55%] object-contain z-0"
              />
            </div>


            {/* Agents Section */}
            <div>
              <h3 className="text-orange-400 text-lg mb-2">Our Agents</h3>
              <div className="grid grid-cols-3 gap-4">
                <AgentCard name="Hunter" image="/assets/hunter.png" />
                <AgentCard name="Precision" image="/assets/presion.png" />
                <LockedCard />
              </div>
            </div>

            {/* Footer */}
            <footer className="bg-white/10 backdrop-blur-md rounded-2xl p-4 grid grid-cols-[auto_1fr] items-center gap-8">
              <CalendarSync className="text-accent w-28 h-28" />
              <div>
                <h4 className="text-accent0 mb-1 text-lg text-white font-semibold font-chakra">
                  New Update for Agent Precision
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 font-chakra">
                  <li>Update 1</li>
                  <li>Update 2</li>
                  <li>Update 3</li>
                </ul>
              </div>
            </footer>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Price Box */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center h-[200px] flex flex-col items-center">
              <h2 className="text-3xl text-accent font-semibold font-chakra">Price</h2>
              {loading ? (
                <p className="text-white text-xl mt-2 font-chakra">Loading...</p>
              ) : (
                <>
                  <p className="text-2xl font-bold mt-2 font-chakra text-white">${price}</p>
                  <p
                    className={`text-sm mt-1 font-chakra ${
                      pctChange && pctChange.startsWith("+")
                        ? "text-green-500"
                        : pctChange && pctChange.startsWith("-")
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  >
                    {pctChange || "Fetching..."}
                  </p>
                </>
              )}
            </div>

            {/* Statistics */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between min-h-[480px] relative overflow-hidden">
              <h3 className="text-orange-400 text-lg mb-2">Your Statistics</h3>
              <div className="flex justify-center items-center relative z-10">
                <p className=" text-white rounded-full pt-20 pb-20 pl-5 pr-5 w-fit ring-accent/50 ring-4 text-5xl font-bold text-center font-chakra relative z-10">
                  1,900 <span className="text-sm">Hours</span>
                </p>
              </div>
              <div className="mt-4 text-lg text-gray-300 space-y-1 font-chakra relative z-10">
                <p className="flex items-center gap-2 font-bold">Agent Precision</p>
                <p className="flex items-center gap-2 ml-4">1100 Hours</p>
                <p className="flex items-center gap-2 font-bold">Agent Accuracy</p>
                <p className="flex items-center gap-2 ml-4">800 Hours</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Avatars */}
      <aside className="fixed top-4 bottom-4 right-4 w-20 flex flex-col items-center py-6 gap-4 rounded-3xl bg-black/40 backdrop-blur-md z-10">
        {["avatar1", "avatar2", "avatar3", "avatar4"].map((avt, i) => (
          <img
            key={i}
            src={`/${avt}.png`}
            alt="User"
            className="w-12 h-12 rounded-full ring-2 ring-green-400"
          />
        ))}
      </aside>
    </div>
  );
}
function AgentCard({ name, image }: { name: string; image: string }) {

  const path = `/dashboard/${name.toLowerCase()}`;

  return (

    <Link

      to={path}

      className="bg-orange-700/40 backdrop-blur-md rounded-xl p-4 flex flex-col items-center hover:ring-2 hover:ring-orange-400 transition-all duration-200"

    >

      <img src={image} alt={name} className="w-fit h-32 mb-2" />

    </Link>

  );

}



// Locked Agent Card

function LockedCard() {

  return (

    <div className="bg-gray-700/40 backdrop-blur-md rounded-xl p-4 flex flex-col items-center opacity-60 relative">

      <img src="/assets/lock.png" alt="Locked Agent" className="w-fit h-32 mb-2 blur-sm" />

    </div>

  );

}