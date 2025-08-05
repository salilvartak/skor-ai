// src/data/tournaments.ts
export interface Tournament {
  id: number;
  title: string;
  game: string;
  prize: string;
  participants: number;
  timeLeft: string;
  status: 'live' | 'upcoming' | 'ended';
  link: string;
}

export const allTournaments: Tournament[] = [
 {
    id: 1,
    title: "TEZ Free Fire Max India Cup 2025",
    game: "Free Fire Max",
    prize: "₹1 crore (~USD 120k)",
    participants: 48,
    timeLeft: "2025-07-13 23:59",
    status: "upcoming",
    link: "https://indiatimes.com/trending/tez-free-fire-max-india-cup-2025"
  },
  {
    id: 2,
    title: "PUBG Mobile World Cup 2025 (PMWC)",
    game: "PUBG Mobile",
    prize: "USD 3,050,000",
    participants: 24,
    timeLeft: "2025-08-03 22:00",
    status: "live",
    link: "https://en.wikipedia.org/wiki/PUBG_Mobile_World_Cup_2025"
  },
  {
    id: 3,
    title: "Esports World Cup 2025 – Teamfight Tactics",
    game: "Teamfight Tactics",
    prize: "Part of EWC prize pool",
    participants: 16,
    timeLeft: "2025-08-15 20:00",
    status: "upcoming",
    link: "https://en.wikipedia.org/wiki/2025_Esports_World_Cup_%E2%80%93_Teamfight_Tactics"
  },
  {
    id: 4,
    title: "Esports World Cup 2025 – Warzone",
    game: "Call of Duty: Warzone",
    prize: "Part of EWC prize pool",
    participants: 16,
    timeLeft: "2025-08-09 20:00",
    status: "live",
    link: "https://escharts.com/tournaments"
  },
  {
    id: 5,
    title: "First Stand Tournament 2025",
    game: "League of Legends",
    prize: "International title prestige",
    participants: 5,
    timeLeft: "2025-03-16 21:00",
    status: "ended",
    link: "https://en.wikipedia.org/wiki/First_Stand_Tournament"
  },
  {
    id: 6,
    title: "PGL Cluj-Napoca 2025",
    game: "Counter-Strike 2",
    prize: "€1,250,000",
    participants: 16,
    timeLeft: "2025-02-23 23:00",
    status: "ended",
    link: "https://en.wikipedia.org/wiki/PGL_Esports"
  },
  {
    id: 7,
    title: "BLAST Bounty 2025 Season 2 Finals",
    game: "Counter-Strike 2",
    prize: "USD 500,000",
    participants: 8,
    timeLeft: "2025-08-17 22:00",
    status: "upcoming",
    link: "https://www.hltv.org/events"
  },
  {
    id: 8,
    title: "BLAST Open London 2025",
    game: "Counter-Strike 2",
    prize: "USD 330,000",
    participants: 16,
    timeLeft: "2025-09-01 21:00",
    status: "upcoming",
    link: "https://www.hltv.org/events"
  },
  {
    id: 9,
    title: "Evo 2025 Fighting Games",
    game: "Various (Street Fighter, Tekken, etc)",
    prize: "Multiple titles & cash pools",
    participants: 8500,
    timeLeft: "2025-08-05 23:59",
    status: "live",
    link: "https://www.theverge.com/games/717660/how-to-watch-evo-2025-las-vegas"
  },
  {
    id: 10,
    title: "PlayStation Tournaments: XP (London)",
    game: "Tekken 8, EA Sports FC 25, Fortnite, Astro Bot",
    prize: "Travel + exclusive prizes",
    participants: 64,
    timeLeft: "2025-01-18 18:00",
    status: "ended",
    link: "https://www.theverge.com/2024/12/5/24314105/playstation-tournaments-xp-off-esports-series-london-event"
  }
];