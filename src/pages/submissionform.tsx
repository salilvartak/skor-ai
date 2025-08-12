import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function EsportsRegistrationForm() {
  const [teamName, setTeamName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [players, setPlayers] = useState([
    { name: "", phone: "", ign: "" },
    { name: "", phone: "", ign: "" },
    { name: "", phone: "", ign: "" },
    { name: "", phone: "", ign: "" },
  ]);
  const [bringOwnDevice, setBringOwnDevice] = useState(false);

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...players];
    updated[index] = { ...updated[index], [field]: value };
    setPlayers(updated);
  };

  const autoFill = () => {
    setTeamName("Shadow Hunters");
    setCollegeName("Ajeenkya DY Patil University");
    setPlayers([
      { name: "Player One", phone: "9876543210", ign: "P1Legend" },
      { name: "Player Two", phone: "9123456780", ign: "P2Sniper" },
      { name: "Player Three", phone: "9988776655", ign: "P3Shadow" },
      { name: "Player Four", phone: "9001122334", ign: "P4Rusher" },
    ]);
    setBringOwnDevice(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ teamName, collegeName, players, bringOwnDevice });
    alert("Registration submitted!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#141110] to-[#6E4A2A] text-white font-chakra flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Event Info */}
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-[#EE5946] to-red-600 bg-clip-text text-transparent">
              Valorant Esports Showdown 2025
            </span>
          </h1>
          <p className="text-lg text-gray-300">Game: Valorant</p>
          <p className="text-gray-400 max-w-md">
            Prepare for the ultimate test of skill, strategy, and teamwork.
            Compete against the best in an electrifying tournament atmosphere.
            Secure your spot and bring your A-game!
          </p>
        </div>

        {/* Right: Clean SKOR Style Form */}
        <Card className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          {/* Holographic grid overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none rounded-2xl">
            <div className="w-full h-full bg-[linear-gradient(rgba(238,89,70,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] rounded-2xl"></div>
          </div>

          <CardContent className="relative z-10 p-0 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Team & College Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Team Name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="bg-black/20 border-white/20   outline-none  focus:ring-0 "
                />
                <Input
                  placeholder="College Name"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="bg-black/20 border-white/20   outline-none  focus:ring-0"
                />
              </div>

              {/* Players */}
              {players.map((player, index) => (
                <div
                  key={index}
                  className="bg-black/30 p-4 rounded-xl border border-white/10"
                >
                  <h2 className="text-lg font-semibold text-[#EE5946]">
                    Player {index + 1}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <Input
                      placeholder="Name"
                      value={player.name}
                      onChange={(e) =>
                        handleChange(index, "name", e.target.value)
                      }
                      className="bg-black/20 border-white/20   outline-none  focus:ring-0"
                    />
                    <Input
                      placeholder="Phone Number"
                      value={player.phone}
                      onChange={(e) =>
                        handleChange(index, "phone", e.target.value)
                      }
                      className="bg-black/20 border-white/20   outline-none  focus:ring-0"
                    />
                    <Input
                      placeholder="In-Game ID"
                      value={player.ign}
                      onChange={(e) =>
                        handleChange(index, "ign", e.target.value)
                      }
                      className="bg-black/20 border-white/20   outline-none  focus:ring-0"
                    />
                  </div>
                </div>
              ))}

              {/* Checkbox */}
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={bringOwnDevice}
                  onCheckedChange={(checked) =>
                    setBringOwnDevice(checked as boolean)
                  }
                  className="border-[#EE5946] data-[state=checked]:bg-[#EE5946]"
                />
                <span className="text-gray-300">Bringing Own Device</span>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={autoFill}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
                >
                  Auto Fill
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#EE5946] to-red-600 hover:from-red-600 hover:to-[#EE5946] text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
                >
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
