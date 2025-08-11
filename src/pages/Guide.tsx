import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const maps = [
  { name: "Abyss", image: "/assets/maps/abyss.jpg" },
  { name: "Ascent", image: "/assets/maps/ascent.jpg" },
  { name: "Bind", image: "/assets/maps/bind.jpg" },
  { name: "Haven", image: "/assets/maps/haven.jpg" },
  { name: "Pearl", image: "/assets/maps/pearl.jpg" },
  { name: "Split", image: "/assets/maps/Split.jpg" },
  { name: "Sunset", image: "/assets/maps/sunset.jpg" },
  { name: "Corrode", image: "/assets/maps/corrode.jpg" },
  { name: "Ice Box", image: "/assets/maps/icebox.png" },
];

const agentsByRole = {
  Initiator: [
    { name: "Sova", image: "/assets/agent/sova.png" },
    { name: "Fade", image: "/assets/agent/fade.png" },
    { name: "Gekko", image: "/assets/agent/gekko.png" },
    { name: "Breach", image: "/assets/agent/breach.png" },
    { name: "Tejo", image: "/assets/agent/tejo.png" },
    { name: "Skye", image: "/assets/agent/skye.png" },
    { name: "Kay/o", image: "/assets/agent/kayo.png" },
  ],
  Duelist: [
    { name: "Jett", image: "/assets/agent/jett.webp" },
    { name: "Phoenix", image: "/assets/agent/phoenix.png" },
    { name: "Reyna", image: "/assets/agent/Reyna.webp" },
    { name: "Raze", image: "/assets/agent/raze.png" },
    { name: "Yoru", image: "/assets/agent/yoru.png" },
    { name: "Neon", image: "/assets/agent/neon.webp" },
    { name: "Iso", image: "/assets/agent/iso.png" },
    { name: "Waylay", image: "/assets/agent/Waylay.webp" },
  ],
  Controller: [
    { name: "Viper", image: "/assets/agent/viper.png" },
    { name: "Brimstone", image: "/assets/agent/Brimstone.webp" },
    { name: "Omen", image: "/assets/agent/omen.png" },
    { name: "Astra", image: "/assets/agent/astra.webp" },
    { name: "Clove", image: "/assets/agent/clove.webp" },
    { name: "Harbor", image: "/assets/agent/harbor.webp" },
  ],
  Sentinel: [
    { name: "Killjoy", image: "/assets/agent/Killjoy.png" },
    { name: "Cypher", image: "/assets/agent/cypher.png" },
    { name: "Sage", image: "/assets/agent/sage.png" },
    { name: "Chamber", image: "/assets/agent/chamber.png" },
    { name: "Deadlock", image: "/assets/agent/Deadlock.webp" },
    { name: "Vyse", image: "/assets/agent/Vyse.webp" },
  ],
};

const roleIcons = {
  Initiator: "/assets/icon/initiator.webp",
  Duelist: "/assets/icon/duelist.webp",
  Controller: "/assets/icon/controller.png",
  Sentinel: "/assets/icon/sentinel.webp",
};

export default function ValorantMapSelector() {
  const [selectedMap, setSelectedMap] = useState(null);
  const [showAgentOverlay, setShowAgentOverlay] = useState(false);
  const [activeRole, setActiveRole] = useState("Initiator");

  const navigate = useNavigate();

  const openAgentSelector = (map) => {
    setSelectedMap(map);
    setShowAgentOverlay(true);
    setActiveRole("Initiator");
  };

  const selectAgent = (agent) => {
    setShowAgentOverlay(false);
    const mapSlug = selectedMap.toLowerCase().replace(/\s+/g, "-");
    const agentSlug = agent.toLowerCase().replace(/\s+/g, "-");
    navigate(`/${mapSlug}-${agentSlug}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#141110] to-[#6E4A2A] text-white font-chakra text-center pt-24">
      <h1 className=" text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white via-white to-[#EE5946] bg-clip-text text-transparent">
        WELCOME TO GUIDE
      </h1>
      <p className="text-center text-lg mb-8 pb-10">
        Select a map to view agent lineups and strategies
      </p>

      {/* Map Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-8 lg:px-12 pb-8">
        {maps.map((map) => (
          <div
            key={map.name}
            className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => openAgentSelector(map.name)}
          >
            <img
              src={map.image}
              alt={map.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/70"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-5xl sm:text-5xl lg:text-5xl font-bold uppercase drop-shadow-lg">
                {map.name}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Agent Selection Overlay */}
      {showAgentOverlay && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6 font-chakra">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl  p-8 max-w-5xl w-full shadow-xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-3xl font-bold mb-6">
              Select Agent for {selectedMap}
            </h2>

            {/* Role Tabs */}
            <div className="flex gap-6 mb-8 justify-center">
              {Object.keys(agentsByRole).map((role) => (
                <div
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={`cursor-pointer p-2 rounded-full border-2 transition ${
                    activeRole === role
                      ? "border-red-500 scale-110"
                      : "border-transparent hover:border-gray-500"
                  }`}
                >
                  <img
                    src={roleIcons[role]}
                    alt={role}
                    className="w-14 h-14 object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Agents Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {agentsByRole[activeRole].map((agent) => (
                <div
                  key={agent.name}
                  onClick={() => selectAgent(agent.name)}
                  className="cursor-pointer border-2 rounded-xl overflow-hidden hover:scale-105 transition transform border-transparent hover:border-red-500"
                >
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-24 object-contain bg-gray-700"
                  />
                  <p className="text-center py-2">{agent.name}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={() => setShowAgentOverlay(false)}
                className="px-6 py-3 bg-red-500 rounded-lg hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
