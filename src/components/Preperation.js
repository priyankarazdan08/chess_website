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

const PuzzlesDisplay = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const PuzzlePreview = styled.div`
  background-color: #3a3f5c;
  border-radius: 5px;
  padding: 15px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  &:hover {
    background-color: #5bc0be;
  }
`;

const Preparation = ({ userId }) => {
  const [puzzles, setPuzzles] = useState([]);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [game, setGame] = useState(new Chess());
  const [status, setStatus] = useState('');
  const [moveHistory, setMoveHistory] = useState([]);
  const apiToken = 'lip_O5eYsaZZAeNPAPw2Hikt';

  // Fetch multiple puzzles from Lichess
  useEffect(() => {
    const fetchPuzzles = async () => {
      try {
        const response = await axios.get('https://lichess.org/api/puzzle', {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        });

        const puzzleList = response.data.slice(0, 50).map((puzzle) => ({
          id: puzzle.id,
          title: puzzle.game?.name || "Untitled Puzzle",
          fen: puzzle.fen,
          solution: puzzle.solution,
        }));

        setPuzzles(puzzleList);
        loadNewPuzzle(puzzleList[0]);
      } catch (error) {
        console.error("Error fetching puzzles: ", error);
      }
    };
    fetchPuzzles();
  }, []);

  // Set up a new puzzle on the board
  const loadNewPuzzle = (puzzle) => {
    setCurrentPuzzle(puzzle);
    const newGame = new Chess();
    newGame.load(puzzle.fen);
    setGame(newGame);
    setMoveHistory([]);
    setStatus('Try to solve the puzzle!');
  };

  // Reset the current puzzle
  const resetPuzzle = () => {
    if (currentPuzzle) {
      const resetGame = new Chess();
      resetGame.load(currentPuzzle.fen);
      setGame(resetGame);
      setMoveHistory([]);
      setStatus('Puzzle reset. Try again!');
    }
  };

  // Handle move validation and board updates
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

    // Check if the move matches the solution
    if (currentPuzzle.solution && currentPuzzle.solution.includes(move.san)) {
      setStatus("Correct move!");
    } else {
      setStatus("Incorrect move, try again.");
    }
  };

  // Favorite a puzzle
  const handleFavorite = () => {
    console.log(`Puzzle "${currentPuzzle.title}" added to favorites for user ${userId}.`);
    alert(`Puzzle "${currentPuzzle.title}" added to favorites!`);
  };

  return (
    <Container>
      <Title>Preparation Page</Title>
      <p>Personalize your puzzles based on common middle-game variants of your opening</p>

      {currentPuzzle && (
        <PuzzleContainer>
          <h2>{currentPuzzle.title}</h2>
          <p><strong>Puzzle ID:</strong> {currentPuzzle.id}</p>
          <p><strong>Status:</strong> {status}</p>

          <Chessboard
            position={game.fen()}
            onDrop={onDrop}
            width={400}
            transitionDuration={300}
          />

          <div style={{ marginTop: "15px" }}>
            <Button onClick={handleFavorite}>Favorite this Puzzle</Button>
            <Button onClick={resetPuzzle}>Reset Puzzle</Button>
            <Button onClick={() => loadNewPuzzle(puzzles[Math.floor(Math.random() * puzzles.length)])}>Next Puzzle</Button>
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

      <h3 style={{ marginTop: "20px" }}>Other Puzzles</h3>
      <PuzzlesDisplay>
        {puzzles.map((puzzle, index) => (
          <PuzzlePreview key={index} onClick={() => loadNewPuzzle(puzzle)}>
            <h4>{puzzle.title}</h4>
            <p>Puzzle ID: {puzzle.id}</p>
          </PuzzlePreview>
        ))}
      </PuzzlesDisplay>
    </Container>
  );
};

export default Preparation;