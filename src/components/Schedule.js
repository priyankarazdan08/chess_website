import React, { useEffect, useRef, useState } from 'react';
import Chessboard from 'chessboardjsx';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styled from 'styled-components';
import { Chess } from 'chess.js';

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  color: #e1e1e1;
  background-color: #1a1a2e;
  padding: 0;
  margin: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ScheduleContainer = styled.section`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ToggleButton = styled.button`
  background-color: #5bc0be;
  color: #1a1a2e;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #ff6b6b;
    color: white;
  }
`;

const ChessBoardContainer = styled.div`
  width: 100%;
  height: 600px;
  background-color: #25294a;
  margin-top: 20px;
`;

const Footer = styled.footer`
  background-color: #101828;
  padding: 1rem;
  text-align: center;
  color: white;
`;

const ChessBoard3D = () => {
  const mountRef = useRef(null);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const scene = useRef(new THREE.Scene()).current;
  const pieces = useRef([]); // Store references to piece objects

  useEffect(() => {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(4, 10, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x1a1a2e);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.6);
    pointLight.position.set(10, 20, 10);
    scene.add(pointLight);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Chessboard squares
    const squareSize = 1;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const color = (i + j) % 2 === 0 ? 0xffffff : 0x000000;
        const geometry = new THREE.BoxGeometry(squareSize, 0.1, squareSize);
        const material = new THREE.MeshBasicMaterial({ color });
        const square = new THREE.Mesh(geometry, material);
        square.position.set(i - 3.5, 0, j - 3.5);
        scene.add(square);
      }
    }

    const pieceColorWhite = 0xffffff;
    const pieceColorBlack = 0x333333;

    const addPiece = (x, z, type, color) => {
      const piece = createPiece(x, z, type, color);
      scene.add(piece);
      pieces.current.push(piece);
    };

    // Add pieces to the board
    for (let i = 0; i < 8; i++) {
      addPiece(i, 1, 'pawn', pieceColorWhite);
      addPiece(i, 6, 'pawn', pieceColorBlack);
    }
    addPiece(0, 0, 'rook', pieceColorWhite);
    addPiece(7, 0, 'rook', pieceColorWhite);
    addPiece(0, 7, 'rook', pieceColorBlack);
    addPiece(7, 7, 'rook', pieceColorBlack);

    // Add other pieces (knights, bishops, queen, king)
    addPiece(1, 0, 'knight', pieceColorWhite);
    addPiece(6, 0, 'knight', pieceColorWhite);
    addPiece(1, 7, 'knight', pieceColorBlack);
    addPiece(6, 7, 'knight', pieceColorBlack);

    addPiece(2, 0, 'bishop', pieceColorWhite);
    addPiece(5, 0, 'bishop', pieceColorWhite);
    addPiece(2, 7, 'bishop', pieceColorBlack);
    addPiece(5, 7, 'bishop', pieceColorBlack);

    addPiece(3, 0, 'queen', pieceColorWhite);
    addPiece(3, 7, 'queen', pieceColorBlack);

    addPiece(4, 0, 'king', pieceColorWhite);
    addPiece(4, 7, 'king', pieceColorBlack);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const onMouseClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(pieces.current, true);
      if (intersects.length > 0) {
        const piece = intersects[0].object;
        if (selectedPiece) {
          // Move selected piece
          movePiece(selectedPiece, piece.position.x, piece.position.z);
          setSelectedPiece(null);
        } else {
          setSelectedPiece(piece);
        }
      }
    };

    window.addEventListener('click', onMouseClick);

    return () => {
      window.removeEventListener('click', onMouseClick);
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [scene]);

  const movePiece = (piece, x, z) => {
    piece.position.set(x, 0.5, z);
  };

  const createPiece = (x, z, type, color) => {
    const pieceGroup = new THREE.Group();
    switch (type) {
      case 'pawn':
        pieceGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.5, 32), new THREE.MeshStandardMaterial({ color })));
        pieceGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), new THREE.MeshStandardMaterial({ color })).translateY(0.5));
        break;
      case 'rook':
        pieceGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.7, 32), new THREE.MeshStandardMaterial({ color })));
        pieceGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32), new THREE.MeshStandardMaterial({ color })).translateY(0.7));
        break;
      case 'knight':
        pieceGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.5, 32), new THREE.MeshStandardMaterial({ color })));
        pieceGroup.add(new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.5, 0.3), new THREE.MeshStandardMaterial({ color })).translateY(0.5));
        break;
      case 'bishop':
        pieceGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.6, 32), new THREE.MeshStandardMaterial({ color })));
        pieceGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), new THREE.MeshStandardMaterial({ color })).translateY(0.7));
        break;
      case 'queen':
        pieceGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.7, 32), new THREE.MeshStandardMaterial({ color })));
        pieceGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.25, 32, 32), new THREE.MeshStandardMaterial({ color })).translateY(0.8));
        break;
      case 'king':
        pieceGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.7, 32), new THREE.MeshStandardMaterial({ color })));
        pieceGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.25, 32, 32), new THREE.MeshStandardMaterial({ color })).translateY(0.8));
        const crossBar = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.02, 0.3), new THREE.MeshStandardMaterial({ color }));
        crossBar.position.set(0, 1, 0);
        pieceGroup.add(crossBar);
        break;

      default:
        break;
    }

    pieceGroup.position.set(x - 3.5, 0.5, z - 3.5);
    return pieceGroup;
  };

  return <ChessBoardContainer ref={mountRef} />;
};

const Schedule = () => {
  const [is3D, setIs3D] = useState(false);
  const [position, setPosition] = useState('start');
  const game = useRef(new Chess()).current;

  const toggleView = () => {
    setIs3D((prev) => !prev);
  };

  const onDrop = ({ sourceSquare, targetSquare }) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // Automatically promote to queen for simplicity
    });

    if (move === null) {
      setPosition(game.fen()); // Reset to current position on invalid move
      return;
    }

    setPosition(game.fen()); // Update board position on valid move
  };

  return (
    <AppContainer>
      <ScheduleContainer>
        <h2>Play-Board</h2>
        {is3D ? (
          <ChessBoard3D />
        ) : (
          <Chessboard
            position={position}
            onDrop={onDrop}
            draggable={true}
            sparePieces={false}
            transitionDuration={300}
          />
        )}
        <ToggleButton onClick={toggleView}>
          {is3D ? 'Switch to 2D' : 'Switch to 3D'}
        </ToggleButton>
      </ScheduleContainer>

      <Footer>
        <p>&copy; 2024 Chess Vault. All rights reserved.</p>
      </Footer>
    </AppContainer>
  );
};

export default Schedule;