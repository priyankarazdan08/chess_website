import React, { useEffect, useState } from 'react';
import Chessboard from 'chessboardjsx';
import axios from 'axios';
import ReactGA from 'react-ga'; // Google Analytics for tracking

const Preparation = ({ userId }) => {
  const [puzzles, setPuzzles] = useState([]);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);

  // Fetch multiple puzzles from Lichess
  useEffect(() => {
    const fetchPuzzles = async () => {
      try {
        const response = await axios.get('https://lichess.org/api/puzzle', {
          headers: {
            Authorization: `Bearer YOUR_LICHESS_API_TOKEN`,
          },
        });

        const puzzleList = response.data.slice(0, 10).map((puzzle) => ({
          id: puzzle.id,
          title: puzzle.game.name || "Untitled",
          fen: puzzle.fen,
        }));

        setPuzzles(puzzleList);
        setCurrentPuzzle(puzzleList[Math.floor(Math.random() * puzzleList.length)]);
      } catch (error) {
        console.error("Error fetching puzzles: ", error);
      }
    };
    fetchPuzzles();
  }, []);

  // Track each puzzle load and user favorites
  useEffect(() => {
    if (currentPuzzle) {
      ReactGA.event({
        category: 'Puzzle',
        action: 'Viewed Puzzle',
        label: currentPuzzle.id,
      });
    }
  }, [currentPuzzle]);

  // Handle puzzle favorite
  const handleFavorite = () => {
    ReactGA.event({
      category: 'Puzzle',
      action: 'Favorited Puzzle',
      label: currentPuzzle.id,
    });

    console.log(`Puzzle "${currentPuzzle.title}" added to favorites for user ${userId}.`);
    alert(`Puzzle "${currentPuzzle.title}" added to favorites!`);
  };

  // Load a new random puzzle
  const loadNewPuzzle = () => {
    const newPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    setCurrentPuzzle(newPuzzle);
  };

  return (
    <div>
      <h1>Preparation Page</h1>
      <p>Explore and complete chess puzzles from Lichess!</p>
      
      {currentPuzzle && (
        <div>
          <h2>{currentPuzzle.title}</h2>
          <Chessboard position={currentPuzzle.fen} />
          <button onClick={handleFavorite}>Favorite this Puzzle</button>
          <button onClick={loadNewPuzzle}>Load New Puzzle</button>
        </div>
      )}
    </div>
  );
};

export default Preparation;
