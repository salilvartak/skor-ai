import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from "@/components/Header";
import StatsResults from "@/components/StatsResult";
import { Loader2 } from "lucide-react";

interface Account {
  puuid: string;
  gameName: string;
  tagLine: string;
}

const ValorantStats: React.FC = () => {
  const [gameName, setGameName] = useState("");
  const [tag, setTag] = useState("");
  const [region, setRegion] = useState("americas");
  const [account, setAccount] = useState<Account | null>(null);
  const [matches, setMatches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Vite exposes env variables through import.meta.env
  const RIOT_API_KEY = import.meta.env.VITE_RIOT_API_KEY;

  const fetchPlayerData = async () => {
    // Reset state for new search
    setLoading(true);
    setError("");
    setAccount(null);
    setMatches([]);

    if (!RIOT_API_KEY) {
      setError("CRITICAL: Riot API Key is not configured in your .env file.");
      setLoading(false);
      return;
    }
    
    if (!gameName || !tag) {
      setError("Please enter a Game Name and Tagline.");
      setLoading(false);
      return;
    }

    try {
      // 1. Get player PUUID from Riot ID
      const accountRes = await axios.get<Account>(
        `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tag}`, {
          headers: { "X-Riot-Token": RIOT_API_KEY },
        }
      );
      const { puuid } = accountRes.data;
      setAccount(accountRes.data);

      // 2. Get match history using the PUUID
      const matchRes = await axios.get<string[]>(
        `https://${region}.api.riotgames.com/val/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=5`, {
          headers: { "X-Riot-Token": RIOT_API_KEY },
        }
      );
      setMatches(matchRes.data);

    } catch (err: any) {
      if (err.response) {
        switch (err.response.status) {
          case 401:
          case 403:
            setError("The Riot API Key is invalid or expired. Please get a new one from the Riot Developer Portal and restart your server.");
            break;
          case 404:
            setError("Player not found. Please double-check the Game Name, Tagline, and Region.");
            break;
          default:
            setError(`An API error occurred: ${err.response.data?.status?.message || 'Unknown error'}`);
        }
      } else {
        setError("A network error occurred. Please check your connection and try again.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141110] via-[#2a1f1a] to-back text-white font-chakra">
      <Header />
      <div className="flex flex-col items-center p-6 pt-24">
        <Card className="w-full max-w-2xl bg-black/20 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-accent">Valorant Player Stats</CardTitle>
            <CardDescription className="text-center text-white/60">
              Enter a Riot ID to fetch recent match data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <Input
                className="bg-white/5 border-white/20 placeholder:text-gray-500 focus:ring-accent"
                placeholder="Game Name"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
              />
              <Input
                className="bg-white/5 border-white/20 placeholder:text-gray-500 focus:ring-accent"
                placeholder="Tagline (e.g. 4987)"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
              <Select onValueChange={setRegion} defaultValue={region}>
                <SelectTrigger className="bg-white/5 border-white/20">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 text-white border-gray-700">
                  <SelectItem value="americas">Americas</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="w-full bg-accent hover:bg-accent/80 transition-transform hover:scale-105"
              onClick={fetchPlayerData}
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {loading ? "Searching..." : "Search Player"}
            </Button>
          </CardContent>
        </Card>

        {error && <p className="mt-6 text-red-400 text-center bg-red-500/10 p-3 rounded-lg border border-red-500/30">{error}</p>}

        {!loading && account && <StatsResults account={account} matches={matches} />}
      </div>
    </div>
  );
};

export default ValorantStats;