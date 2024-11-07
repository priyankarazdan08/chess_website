/* import React, { useEffect, useRef, useState } from 'react';
import Chessboard from 'chessboardjsx'; // 2D board component
import { ChessBoard3 } from './chessboard3/chessboard3';
 // 3D board component
import * as THREE from 'three';
import OrbitControls from 'path-to-three/OrbitControls'; // If you want rotation controls

const Schedule = () => {
  const boardContainer = useRef(null);
  const [is3D, setIs3D] = useState(false); // Toggle between 2D and 3D

  // Initialize the board with appropriate configuration
  useEffect(() => {
    const sampleConfig = {
      position: 'start', // initial position
      draggable: true,
      dropOffBoard: 'snapback',
    };

    let board;

    // Set up the board based on the view type (2D or 3D)
    const setUpBoard = () => {
      let currentPosition = 'start';

      if (board) {
        currentPosition = board.position();
        board.destroy();
      }

      if (is3D) {
        // 3D configuration
        boardContainer.current.style.width = '600px';
        boardContainer.current.style.height = '450px';
        board = new ChessBoard3(boardContainer.current, sampleConfig);

        // Optionally add OrbitControls for better interaction
        const controls = new OrbitControls(new THREE.Camera(), boardContainer.current);
        controls.enableZoom = true;
      } else {
        // 2D configuration
        boardContainer.current.style.width = '450px';
        boardContainer.current.style.height = '450px';
        board = new Chessboard(boardContainer.current, sampleConfig);
      }

      board.position(currentPosition, false);
    };

    setUpBoard();

    return () => {
      if (board) {
        board.destroy();
      }
    };
  }, [is3D]);

  // Toggle between 2D and 3D views
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
*/ 