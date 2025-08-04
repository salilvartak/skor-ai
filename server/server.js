import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 4000;
app.use(cors());

const tournaments = [
  {
    id: 1,
    title: 'Cyber Championship',
    game: 'Apex Legends',
    prize: '$50,000',
    participants: 2847,
    timeLeft: '2h 15m',
    status: 'live',
    location: 'Mumbai',
    link: '/tournaments/cyber-championship',
  },
  {
    id: 2,
    title: 'Neon Nights',
    game: 'Valorant',
    prize: '$25,000',
    participants: 1523,
    timeLeft: '1d 4h',
    status: 'upcoming',
    location: 'Bangalore',
    link: '/tournaments/neon-nights',
  },
  {
    id: 3,
    title: 'Digital Duel',
    game: 'CS2',
    prize: '$75,000',
    participants: 3291,
    timeLeft: 'Starting Soon',
    status: 'live',
    location: 'Delhi',
    link: '/tournaments/digital-duel',
  },
];

app.get('/api/tournaments', async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) return res.json(tournaments); // fallback

  try {
    const geoRes = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=6b0edc4fbad6458a8337e01112609a52`);
    const geoData = await geoRes.json();
    const city = geoData.results[0]?.components?.city || geoData.results[0]?.components?.town || '';

    const nearby = tournaments.filter(t => t.location.toLowerCase().includes(city.toLowerCase()));
    res.json(nearby.length ? nearby : tournaments);
  } catch (e) {
    console.error(e);
    res.status(500).json(tournaments);
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
