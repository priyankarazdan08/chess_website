import React, { useEffect, useRef, useState } from 'react';

const Schedule = () => {
  const boardContainer = useRef(null); // reference to board container
  const [is3D, setIs3D] = useState(false); // state to toggle between 2D and 3D

  // Initialize the board with appropriate configuration
  useEffect(() => {
    const sampleConfig = {
      position: 'start', // initial position
      draggable: true,
      dropOffBoard: 'snapback',
    };

    let board;

    // Set up the board when 2D or 3D is selected
    const setUpBoard = (dimensions) => {
      let currentPosition = 'start'; // Default start position

      // Destroy the old board if it exists
      if (board !== undefined) {
        currentPosition = board.position();
        board.destroy();
      }

      // Adjust the board dimensions and setup based on 2D or 3D
      if (dimensions >= 3) {
        // 3D configuration
        boardContainer.current.style.width = '600px';
        boardContainer.current.style.height = '450px';
        board = new ChessBoard3(boardContainer.current, sampleConfig);
      } else {
        // 2D configuration
        boardContainer.current.style.width = '450px';
        boardContainer.current.style.height = '450px';
        board = new ChessBoard(boardContainer.current, sampleConfig);
      }

      board.position(currentPosition, false);
    };

    // Initialize the board in 2D mode initially
    setUpBoard(is3D ? 3 : 2);

    // Clean up the board on component unmount
    return () => {
      if (board !== undefined) {
        board.destroy();
      }
    };
  }, [is3D]); // Re-run the effect when the mode changes

  // Toggle between 2D and 3D view
  const toggleView = () => {
    setIs3D((prev) => !prev);
  };

  return (
    <div>
      <h1>Chess Schedule</h1>
      <div id="outer">
        <div id="inner" ref={boardContainer}></div>
      </div>
      <button onClick={toggleView}>{is3D ? 'Switch to 2D' : 'Switch to 3D'}</button>
    </div>
  );
};

export default Schedule;
