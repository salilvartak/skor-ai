import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Account {
  gameName: string;
  tagLine: string;
}

interface StatsResultsProps {
  account: Account | null;
  matches: string[];
}

const StatsResults: React.FC<StatsResultsProps> = ({ account, matches }) => {
  if (!account) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl bg-white/5 border border-white/10 text-white rounded-2xl shadow-2xl backdrop-blur-xl mt-6">
      <CardHeader>
        <CardTitle className="text-2xl text-accent">Player Found</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">{account.gameName}#{account.tagLine}</h3>
        </div>
        {matches.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Recent Match IDs</h3>
            <ul className="list-disc list-inside text-sm space-y-1 bg-black/20 p-4 rounded-lg">
              {matches.map((matchId) => (
                <li key={matchId} className="font-mono">{matchId}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsResults;