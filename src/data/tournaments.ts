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
    title: "VCT 2025: Pacific Stage 2",
    game: "Valorant",
    prize: "$250,000 USD",
    participants: 10, // Common number of teams in VCT regional leagues
    timeLeft: "2025-08-31 23:59", // End Date
    status: "live",
    link: "https://www.vlr.gg/events"
  },
  {
    id: 2,
    title: "VCT 2025: EMEA Stage 2",
    game: "Valorant",
    prize: "$250,000 USD",
    participants: 10, // Common number of teams in VCT regional leagues
    timeLeft: "2025-08-31 23:59", // End Date
    status: "live",
    link: "https://www.vlr.gg/events"
  },
  {
    id: 3,
    title: "VCT 2025: China Stage 2",
    game: "Valorant",
    prize: "TBD",
    participants: 10, // Common number of teams in VCT regional leagues
    timeLeft: "2025-08-24 23:59", // End Date
    status: "live",
    link: "https://www.vlr.gg/events"
  },
  {
    id: 4,
    title: "VCT 2025: Americas Stage 2",
    game: "Valorant",
    prize: "$250,000 USD",
    participants: 10, // Common number of teams in VCT regional leagues
    timeLeft: "2025-09-01 23:59", // End Date
    status: "live",
    link: "https://www.vlr.gg/events"
  },
  {
    id: 5,
    title: "Challengers 2025: North America ACE Stage 3",
    game: "Valorant",
    prize: "$61,500 USD",
    participants: 12, // Typical Challengers participants
    timeLeft: "2025-09-04 23:59", // End Date
    status: "live",
    link: "https://www.vlr.gg/events"
  },
  {
    id: 6,
    title: "CONTEST SUMMER CUP 2025",
    game: "Valorant",
    prize: "$1,144 USD",
    participants: 8, // Estimated for smaller cup
    timeLeft: "2025-08-30 23:59", // End Date
    status: "live",
    link: "https://www.vlr.gg/events"
  },
  {
    id: 7,
    title: "Challengers League 2025: Japan Finals",
    game: "Valorant",
    prize: "$32,404 USD",
    participants: 8, // Estimated for finals
    timeLeft: "2025-08-24 23:59", // End Date
    status: "live",
    link: "https://www.vlr.gg/events"
  },
  {
    id: 8,
    title: "Spike Tour 2025: Split 2",
    game: "Valorant",
    prize: "$4,096 USD",
    participants: 16, // Estimated for a tour
    timeLeft: "2025-08-24 23:59", // End Date
    status: "live",
    link: "https://www.vlr.gg/events"
  },
  {
    id: 9,
    title: "Challengers 2025: Southeast Asia Split 3",
    game: "Valorant",
    prize: "$50,000 USD",
    participants: 12, // Typical Challengers participants
    timeLeft: "2025-09-07 23:59", // End Date
    status: "live",
    link: "https://www.vlr.gg/events"
  },
  {
    id: 10,
    title: "Challengers 2025: Korea WDG Stage 3",
    game: "Valorant",
    prize: "$31,634 USD",
    participants: 12, // Typical Challengers participants
    timeLeft: "2025-08-22 23:59", // End Date
    status: "live",
    link: "https://www.vlr.gg/events"
  },
  {
    id: 11,
    title: "The Major Six 2025",
    game: "Valorant",
    prize: "$18,121 USD",
    participants: 6, // Title suggests 6
    timeLeft: "2025-08-30 23:59", // End Date
    status: "live",
    link: "https://www.vlr.gg/events"
  },
  {
    id: 12,
    title: "Game Changers 2025: North America Stage 2",
    game: "Valorant",
    prize: "$60,000 USD",
    participants: 8, // Typical GC participants
    timeLeft: "2025-10-12 23:59", // End Date
    status: "live",
    link: "https://www.vlr.gg/events"
  },
  {
    id: 13,
    title: "Game Changers 2025: LATAM Main Event",
    game: "Valorant",
    prize: "$74,704 USD",
    participants: 8, // Typical GC participants
    timeLeft: "2025-09-11 23:59", // End Date
    status: "live",
    link: "https://www.vlr.gg/events"
  },
  {
    id: 14,
    title: "Bell Esports Challenge 2025",
    game: "Valorant",
    prize: "$6,572 USD",
    participants: 16, // Estimated
    timeLeft: "2025-08-23 23:59", // End Date
    status: "live",
    link: "https://www.vlr.gg/events"
  },

  // Upcoming Tournaments
 

];