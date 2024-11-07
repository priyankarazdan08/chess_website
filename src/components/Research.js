import React, { useState } from 'react';
import axios from 'axios';

function Research() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  // Handle the form submit and fetch games
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error
    setGames([]);   // Reset games data

    try {
      // Send POST request to Lichess API to get authentication cookie (for demo purposes only)
      const response = await axios.post('https://lichess.org/api/auth/login', {
        username,
        password,
      });

      // If login is successful, use the cookie to fetch games
      if (response.data.cookie) {
        const cookie = response.data.cookie;

        // Fetch games using the cookie
        const gamesResponse = await axios.get('https://lichess.org/api/games/user/' + username, {
          headers: {
            'Authorization': `Bearer ${cookie}`,
          },
        });

        setGames(gamesResponse.data);
      } else {
        setError('Failed to authenticate with Lichess');
      }
    } catch (err) {
      setError('Error occurred while fetching games: ' + err.message);
    }
  };

  return (
    <div className="research">
      <h2>Research Page</h2>
      <p>Enter your Lichess credentials to view your recent games.</p>

      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>

      {/* Error Handling */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display User's Games */}
      {games.length > 0 && (
        <div>
          <h3>Your Recent Games</h3>
          <ul>
            {games.map((game, index) => (
              <li key={index}>
                <p><strong>Game {index + 1}</strong></p>
                <p>Game ID: {game.id}</p>
                <p>White: {game.players.white.name}</p>
                <p>Black: {game.players.black.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Research;
