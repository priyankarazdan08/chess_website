// server/server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(cors());

const topPlayersFideIds = [
    '1503014',  // Magnus Carlsen
    '2020009',  // Fabiano Caruana
    '2016192',  // Hikaru Nakamura
    '35009192',  // Arjun Erigaisi
    '46616543', // Gukesh D
    '14204118', // Nodirbek Abdusattorov
    '12573981',   // Alireza Firouzja
    '4168119',  // Ian Nepomniachtchi
    '8603405',  // Wei Yi
    '5000017',  // Viswanathan Anand
  ];

app.get('/api/top-players', async (req, res) => {
  const invalidIds = [];

  try {
    const playerDataPromises = topPlayersFideIds.map(async (fideId) => {
      try {
        const response = await axios.get(`http://localhost:3000/player/${fideId}/info`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching data for FIDE ID ${fideId}: ${error.message}`);
        invalidIds.push(fideId);  // Track invalid IDs
        return null;  // Skip missing player
      }
    });
    
    const playersData = (await Promise.all(playerDataPromises)).filter(data => data !== null);

    // Include invalid IDs in the response for easy debugging
    res.json({ players: playersData, invalidIds });
  } catch (error) {
    console.error('Error fetching top players:', error.message);
    res.status(500).json({ error: 'Failed to fetch top players' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});