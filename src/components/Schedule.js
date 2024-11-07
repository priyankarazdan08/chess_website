import React, { useEffect, useRef, useState } from 'react';
import Chessboard from 'chessboardjsx';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ChessBoard3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;

    // Load 3D models using ObjectLoader
    const loader = new THREE.ObjectLoader();

    // Define paths to models for each type of piece in JSON format
    const pieceModels = {
      white: {
        king: '/models/chess/white_king.json',
        queen: '/models/chess/white_queen.json',
        rook: '/models/chess/white_rook.json',
        bishop: '/models/chess/white_bishop.json',
        knight: '/models/chess/white_knight.json',
        pawn: '/models/chess/white_pawn.json',
      },
      black: {
        king: '/models/chess/black_king.json',
        queen: '/models/chess/black_queen.json',
        rook: '/models/chess/black_rook.json',
        bishop: '/models/chess/black_bishop.json',
        knight: '/models/chess/black_knight.json',
        pawn: '/models/chess/black_pawn.json',
      }
    };

    // Function to place a piece on the board
    const placePiece = (modelPath, x, z) => {
      loader.load(modelPath, (object) => {
        object.position.set(x - 4, 0.5, z - 4); // Adjust y to place on board
        object.scale.set(0.5, 0.5, 0.5); // Scale down if needed
        scene.add(object);
      });
    };

    // Initial board setup
    const setupBoard = () => {
      const whitePiecesRow = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
      const blackPiecesRow = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

      // White pieces
      whitePiecesRow.forEach((piece, i) => placePiece(pieceModels.white[piece], i, 0)); // Main pieces
      for (let i = 0; i < 8; i++) placePiece(pieceModels.white.pawn, i, 1); // Pawns

      // Black pieces
      blackPiecesRow.forEach((piece, i) => placePiece(pieceModels.black[piece], i, 7)); // Main pieces
      for (let i = 0; i < 8; i++) placePiece(pieceModels.black.pawn, i, 6); // Pawns
    };

    // Create the chessboard
    const squareSize = 1;
    for (let x = 0; x < 8; x++) {
      for (let z = 0; z < 8; z++) {
        const color = (x + z) % 2 === 0 ? 0xffffff : 0x000000; // Alternate colors
        const geometry = new THREE.BoxGeometry(squareSize, 0.1, squareSize);
        const material = new THREE.MeshBasicMaterial({ color });
        const square = new THREE.Mesh(geometry, material);
        square.position.set(x - 4, 0, z - 4); // Center the board
        scene.add(square);
      }
    }

    // Set up pieces on the board
    setupBoard();

    // Set up camera position
    camera.position.y = 5;
    camera.position.z = 7;
    camera.lookAt(0, 0, 0);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Clean up on component unmount
    return () => {
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

const Schedule = () => {
  const [is3D, setIs3D] = useState(false);

  const toggleView = () => {
    setIs3D((prev) => !prev);
  };

  return (
    <div>
      <h1>Chess Schedule</h1>
      <div id="outer">
        {is3D ? <ChessBoard3D /> : <Chessboard position="start" />}
      </div>
      <button onClick={toggleView}>{is3D ? 'Switch to 2D' : 'Switch to 3D'}</button>
    </div>
  );
};

export default Schedule;