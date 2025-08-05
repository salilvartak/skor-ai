const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const RIOT_API_KEY = process.env.RIOT_API_KEY;

app.get("/api/account/:gameName/:tag", async (req, res) => {
  const { gameName, tag } = req.params;
  try {
    const response = await axios.get(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tag}`, {
      headers: { "X-Riot-Token": RIOT_API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/matches/:puuid", async (req, res) => {
  const { puuid } = req.params;
  try {
    const response = await axios.get(`https://americas.api.riotgames.com/val/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=5`, {
      headers: { "X-Riot-Token": RIOT_API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
