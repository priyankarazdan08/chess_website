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
  { name: "Reti Opening", moves: ["Nf3"] },
  { name: "Caro-Kann Defense", moves: ["e4", "c6"] },
  { name: "Pirc Defense", moves: ["e4", "d6", "d4", "Nf6"] },
  { name: "Alekhine's Defense", moves: ["e4", "Nf6"] },
  { name: "English Opening", moves: ["c4"] },
  { name: "King's Indian Defense", moves: ["d4", "Nf6", "c4", "g6"] },
  { name: "Queen's Gambit", moves: ["d4", "d5", "c4"] },
  { name: "King's Gambit", moves: ["e4", "e5", "f4"] },
  { name: "Vienna Game", moves: ["e4", "e5", "Nc3"] },
  { name: "Scotch Game", moves: ["e4", "e5", "Nf3", "Nc6", "d4"] },
  { name: "Italian Game", moves: ["e4", "e5", "Nf3", "Nc6", "Bc4"] },
  { name: "Four Knights Game", moves: ["e4", "e5", "Nf3", "Nc6", "Nc3", "Nf6"] },
  { name: "Philidor Defense", moves: ["e4", "e5", "Nf3", "d6"] },
  { name: "Grünfeld Defense", moves: ["d4", "Nf6", "c4", "g6", "Nc3", "d5"] },
  { name: "Benoni Defense", moves: ["d4", "Nf6", "c4", "c5"] },
  { name: "Nimzo-Indian Defense", moves: ["d4", "Nf6", "c4", "e6", "Nc3", "Bb4"] },
  { name: "Dutch Defense", moves: ["d4", "f5"] },
  { name: "Catalan Opening", moves: ["d4", "Nf6", "c4", "e6", "g3"] },
  { name: "Bird's Opening", moves: ["f4"] },
  { name: "Modern Defense", moves: ["e4", "g6"] },
  { name: "London System", moves: ["d4", "d5", "Nf3", "Nf6", "Bf4"] },
  { name: "Trompowsky Attack", moves: ["d4", "Nf6", "Bg5"] },
  { name: "Scandinavian Defense", moves: ["e4", "d5"] },
  { name: "King's Indian Attack", moves: ["Nf3", "d3", "g3", "Bg2", "O-O"] },
  { name: "Closed Sicilian", moves: ["e4", "c5", "Nc3"] },
  { name: "English Defense", moves: ["d4", "e6", "c4", "b6"] },
  { name: "Old Indian Defense", moves: ["d4", "Nf6", "c4", "d6"] },
  { name: "Evans Gambit", moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "b4"] },
  { name: "Alapin Sicilian", moves: ["e4", "c5", "c3"] },
  { name: "Smith-Morra Gambit", moves: ["e4", "c5", "d4", "cxd4", "c3"] },
  { name: "Benko Gambit", moves: ["d4", "Nf6", "c4", "c5", "d5", "b5"] },
  { name: "Vienna Gambit", moves: ["e4", "e5", "Nc3", "Nf6", "f4"] },
  { name: "Latvian Gambit", moves: ["e4", "e5", "Nf3", "f5"] },
  { name: "Petrov's Defense", moves: ["e4", "e5", "Nf3", "Nf6"] },
  { name: "Blackmar-Diemer Gambit", moves: ["d4", "d5", "e4"] },
  { name: "Budapest Gambit", moves: ["d4", "Nf6", "c4", "e5"] },
  { name: "Grob's Attack", moves: ["g4"] },
  { name: "Hungarian Defense", moves: ["e4", "e5", "Nf3", "Nc6", "Be2"] },
  { name: "Polish Opening", moves: ["b4"] }
];

const apiToken = 'lip_O5eYsaZZAeNPAPw2Hikt'; // Replace with your personal API token

function identifyOpening(moves) {
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
      const response = await axios.get(`https://lichess.org/api/games/user/${username}`, {
        headers: {
          'Authorization': `Bearer ${apiToken}`
        },
        params: {
          max: 10,
          pgnInJson: false
        },
        responseType: 'text'
      });
  
      const openingCounter = {};
      const gamesWithOpenings = [];
  
      // Split the response by double newlines to separate each game's PGN
      const gamesText = response.data.split('\n\n\n').filter((game) => game.trim());
  
      for (const gameText of gamesText) {
        const chess = new Chess();
        
        // Extract only the moves from the PGN, filter out headers and results
        const moveText = gameText
          .split(/\n/)
          .filter(line => !line.startsWith("["))
          .join(" ")
          .replace(/\d+\./g, "") // Remove move numbers
          .trim();
        
        // Split moveText into individual moves and filter out result notations
        const moves = moveText.split(/\s+/).filter(move => !["1-0", "0-1", "1/2-1/2"].includes(move));
  
        moves.forEach((move) => {
          // Check if the move is valid before applying it
          const possibleMoves = chess.moves({ verbose: true }).map(m => m.san);
          
          if (possibleMoves.includes(move)) {
            chess.move(move, { sloppy: true });
          } else {
            console.warn(`Skipping invalid or ambiguous move: ${move}`);
          }
        });
  
        const gameMoves = chess.history();
        const openingName = identifyOpening(gameMoves);
        const gameDetails = {
          opening: openingName,
          result: chess.header().Result,
          date: chess.header().UTCDate,
          pgn: gameText
        };
  
        if (openingCounter[openingName]) {
          openingCounter[openingName]++;
        } else {
          openingCounter[openingName] = 1;
        }
  
        gamesWithOpenings.push(gameDetails);
      }
  
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