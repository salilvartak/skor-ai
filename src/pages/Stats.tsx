import React, { useState } from "react";
import axios from "axios";

interface Account {
  puuid: string;
  gameName: string;
  tagLine: string;
}

const ValorantStats: React.FC = () => {
  const [gameName, setGameName] = useState("");
  const [tag, setTag] = useState("");
  const [account, setAccount] = useState<Account | null>(null);
  const [matches, setMatches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPlayerData = async () => {
    setLoading(true);
    setError("");
    setMatches([]);
    setAccount(null);

    try {
      const accountRes = await axios.get<Account>(
        `http://localhost:5000/api/account/${gameName}/${tag}`
      );
      const { puuid } = accountRes.data;
      setAccount(accountRes.data);

      const matchRes = await axios.get<string[]>(
        `http://localhost:5000/api/matches/${puuid}`
      );
      setMatches(matchRes.data);
    } catch (err: any) {
      setError("Player not found or error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Valorant Match Stats</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          className="px-4 py-2 rounded bg-gray-800 border border-gray-700"
          placeholder="Game Name (e.g., Salil)"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />
        <input
          className="px-4 py-2 rounded bg-gray-800 border border-gray-700"
          placeholder="Tagline (e.g., 7777)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={fetchPlayerData}
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {account && (
        <div className="bg-gray-800 p-4 rounded shadow-lg w-full max-w-md mb-6">
          <h2 className="text-xl font-semibold">Player Info</h2>
          <p>
            {account.gameName}#{account.tagLine}
          </p>
        </div>
      )}

      {matches.length > 0 && (
        <div className="bg-gray-800 p-4 rounded shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Recent Match IDs</h2>
          <ul className="list-disc list-inside text-sm">
            {matches.map((matchId) => (
              <li key={matchId}>{matchId}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ValorantStats;
