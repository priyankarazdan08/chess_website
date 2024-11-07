import React, { useEffect, useState } from 'react';
import Chessboard from 'chessboardjsx';
import axios from 'axios';
import { Chess } from 'chess.js';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #e1e1e1;
  background-color: #1a1a2e;
`;

const PuzzleContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: #25294a;
  margin-bottom: 20px;
  text-align: center;
`;

const Title = styled.h2`
  color: #5bc0be;
`;

const Button = styled.button`
  background-color: #5bc0be;
  color: #1a1a2e;
  border: none;
  padding: 10px 15px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  &:hover {
    background-color: #ff6b6b;
    color: white;
  }
`;

const ChessboardWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const MoveHistory = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 15px;
  background-color: #3a3f5c;
  border-radius: 5px;
  padding: 10px;
`;

const Move = styled.li`
  padding: 5px;
`;

const Preparation = ({ userId }) => {
  const [puzzles, setPuzzles] = useState([]);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [game, setGame] = useState(new Chess());
  const [status, setStatus] = useState('');
  const [moveHistory, setMoveHistory] = useState([]);
  const apiToken = 'lip_O5eYsaZZAeNPAPw2Hikt';

  const fetchPuzzleOfTheDay = async () => {
    try {
      console.log("Attempting to fetch Puzzle of the Day...");
      const response = await axios.get('https://lichess.org/api/puzzle/daily', {
        headers: { 'Content-Type': 'application/json' },
      });
  
      console.log("Full API Response:", response);
  
      const { game, puzzle } = response.data;
  
      // Log the game object to inspect its full structure
      console.log("Game data:", game);
  
      // Check if FEN is provided, otherwise use a fallback FEN
      const fen = game && game.fen ? game.fen : "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
      if (!fen) {
        console.error("Error: FEN data is missing");
        setStatus("Error loading puzzle: No FEN data available.");
        return;
      }
  
      if (!puzzle.solution) {
        console.error("Error: Solution data is missing");
        setStatus("Error loading puzzle: No solution data available.");
        return;
      }
  
      console.log("Using FEN:", fen);
      console.log("Puzzle Solution:", puzzle.solution);
  
      const currentPuzzle = {
        id: puzzle.id,
        title: "Puzzle of the Day",
        fen: fen,
        solution: puzzle.solution,
      };
  
      setPuzzles([currentPuzzle]);
      loadNewPuzzle(currentPuzzle);
  
    } catch (error) {
      console.error("Error fetching Puzzle of the Day:", error.message);
      setStatus("Failed to fetch puzzle. Please try again later.");
    }
  };

  useEffect(() => {
    fetchPuzzleOfTheDay();
  }, []);

  const loadNewPuzzle = (puzzle) => {
    setCurrentPuzzle(puzzle);
    const newGame = new Chess();
  
    // Check FEN string for common errors
    console.log("Loading FEN:", puzzle.fen);
    const fenParts = puzzle.fen.split(" ");
    if (fenParts.length < 6) {
      console.error("Invalid FEN format:", puzzle.fen);
      setStatus("Error loading puzzle FEN: Invalid format");
      return;
    }
  
    const isLoaded = newGame.load(puzzle.fen);
    if (!isLoaded) {
      console.error("Failed to load FEN:", puzzle.fen);
      setStatus("Error loading puzzle FEN. Loading fallback position.");
      
      // Load a fallback FEN if the provided one is invalid
      newGame.load("r1bqkbnr/pppppppp/n7/8/8/5N2/PPPPPPPP/RNBQKB1R w KQkq - 2 2"); // Example fallback FEN
      setGame(newGame);
      setMoveHistory([]);
      return;
    }
    
    // If FEN is valid, continue as usual
    setGame(newGame);
    setMoveHistory([]);
    setStatus('Try to solve the puzzle!');
  };

  const resetPuzzle = () => {
    if (currentPuzzle) {
      const resetGame = new Chess();
      const isLoaded = resetGame.load(currentPuzzle.fen);
      if (!isLoaded) {
        console.error("Failed to reload FEN:", currentPuzzle.fen);
        setStatus("Error reloading puzzle FEN");
        return;
      }
      setGame(resetGame);
      setMoveHistory([]);
      setStatus('Puzzle reset. Try again!');
    }
  };

  const onDrop = ({ sourceSquare, targetSquare }) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (move === null) {
      setStatus("Illegal move. Try again!");
      return;
    }

    setGame(new Chess(game.fen()));
    setMoveHistory([...moveHistory, move.san]);

    if (currentPuzzle.solution && currentPuzzle.solution.includes(move.san)) {
      setStatus("Correct move!");
    } else {
      setStatus("Incorrect move, try again.");
    }
  };

  const handleFavorite = () => {
    console.log(`Puzzle "${currentPuzzle.title}" added to favorites for user ${userId}.`);
    alert(`Puzzle "${currentPuzzle.title}" added to favorites!`);
  };

  return (
    <Container>
      <Title>Preparation</Title>
      <p>Practice your skills with the daily puzzle from LiChess</p>

      {currentPuzzle && (
        <PuzzleContainer>
          <h2>{currentPuzzle.title}</h2>
          <p><strong>Puzzle ID:</strong> {currentPuzzle.id}</p>
          <p><strong>Status:</strong> {status}</p>

          <ChessboardWrapper>
            <Chessboard
              position={game.fen()}
              onDrop={onDrop}
              width={400}
              transitionDuration={300}
            />
          </ChessboardWrapper>

          <div style={{ marginTop: "15px" }}>
            <Button onClick={handleFavorite}>Favorite this Puzzle</Button>
            <Button onClick={resetPuzzle}>Reset Puzzle</Button>
            <Button onClick={() => fetchPuzzleOfTheDay()}>Next Puzzle of the Day</Button>
          </div>

          <h3 style={{ marginTop: "20px" }}>Move History</h3>
          <MoveHistory>
            {moveHistory.map((move, index) => (
              <Move key={index}>{move}</Move>
            ))}
          </MoveHistory>

          {currentPuzzle.solution && (
            <div style={{ marginTop: "15px" }}>
              <h3>Solution</h3>
              <p>First Move Solution: {currentPuzzle.solution[0]}</p>
            </div>
          )}
        </PuzzleContainer>
      )}
    </Container>
  );
};

export default Preparation;
