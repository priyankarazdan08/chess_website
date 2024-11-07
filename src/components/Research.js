import React, { useState } from 'react';
import axios from 'axios';
import { Chess } from 'chess.js';
import styled from 'styled-components';

const ResearchContainer = styled.div`
  font-family: Arial, sans-serif;
  color: #e1e1e1;
  background-color: #1a1a2e;
  min-height: 100vh;
  padding: 2rem;
`;

const Title = styled.h2`
  color: #5bc0be;
  font-size: 28px;
  text-align: center;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  input {
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #5bc0be;
    width: 200px;
  }

  button {
    background-color: #5bc0be;
    color: #1a1a2e;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1rem;
    &:hover {
      background-color: #ff6b6b;
      color: white;
    }
  }
`;

const ErrorText = styled.p`
  color: red;
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const OpeningList = styled.ul`
  list-style-type: none;
  padding: 0;
  text-align: center;

  li {
    background-color: #25294a;
    margin: 0.5rem 0;
    padding: 0.5rem 1rem;
    border-radius: 5px;
  }
`;

const GameList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GameItem = styled.div`
  background-color: #25294a;
  padding: 1rem;
  border-radius: 5px;
  color: #e1e1e1;

  h4 {
    color: #5bc0be;
  }
`;

const openings = [
  { name: "Sicilian Defense", moves: ["e4", "c5"] },
  { name: "French Defense", moves: ["e4", "e6"] },
  { name: "Ruy Lopez", moves: ["e4", "e5", "Nf3", "Nc6", "Bb5"] },
  { name: "Reti", moves: ["Nf3"] },
  // Add more openings as needed
];

const apiToken = 'lip_O5eYsaZZAeNPAPw2Hikt'; // Replace with your personal API token

function identifyOpening(pgn) {
  const chess = new Chess();
  chess.load_pgn(pgn);
  const moves = chess.history({ verbose: true }).map((move) => move.san);

  for (let opening of openings) {
    if (moves.slice(0, opening.moves.length).join(" ") === opening.moves.join(" ")) {
      return opening.name;
    }
  }
  return "Unknown Opening";
}

function Research() {
  const [username, setUsername] = useState('');
  const [games, setGames] = useState([]);
  const [openingCounts, setOpeningCounts] = useState({});
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setGames([]);
    setOpeningCounts({});

    try {
      const gamesResponse = await axios.get(`https://lichess.org/api/games/user/${username}`, {
        headers: {
          'Authorization': `Bearer ${apiToken}`
        }
      });

      const gamesData = gamesResponse.data;
      const openingCounter = {};

      const gamesWithOpenings = gamesData.map(game => {
        const openingName = identifyOpening(game.pgn); // Assuming game data includes PGN
        if (openingName in openingCounter) {
          openingCounter[openingName]++;
        } else {
          openingCounter[openingName] = 1;
        }
        return { ...game, opening: openingName };
      });

      setGames(gamesWithOpenings);
      setOpeningCounts(openingCounter);
    } catch (err) {
      setError('Error occurred while fetching games: ' + err.message);
      console.error(err);
    }
  };

  return (
    <ResearchContainer>
      <Title>Research Page</Title>
      <Description>Enter your Lichess username to view your recent games and common openings.</Description>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Lichess Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Fetch Games</button>
      </Form>

      {error && <ErrorText>{error}</ErrorText>}

      {Object.keys(openingCounts).length > 0 && (
        <Section>
          <h3>Most Common Openings</h3>
          <OpeningList>
            {Object.entries(openingCounts).map(([opening, count], index) => (
              <li key={index}>
                <strong>{opening}</strong>: {count} times
              </li>
            ))}
          </OpeningList>
        </Section>
      )}

      {games.length > 0 && (
        <Section>
          <h3>Your Recent Games</h3>
          <GameList>
            {games.map((game, index) => (
              <GameItem key={index}>
                <h4>Game {index + 1}</h4>
                <p><strong>Opening:</strong> {game.opening}</p>
                <p><strong>Result:</strong> {game.result || "Not Available"}</p>
                <p><strong>Date:</strong> {game.date || "Unknown"}</p>
              </GameItem>
            ))}
          </GameList>
        </Section>
      )}
    </ResearchContainer>
  );
}

export default Research;
