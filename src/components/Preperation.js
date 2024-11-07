import React, { useEffect, useRef, useState } from 'react';
import Chessboard from 'chessboardjsx';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styled from 'styled-components';
import { Chess } from 'chess.js';

// Styled components
const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #e1e1e1;
  background-color: #1a1a2e;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: #5bc0be;
  text-align: center;
  margin-bottom: 20px;
`;

const LessonContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: #25294a;
  width: 80%;
  text-align: left;
  margin-bottom: 20px;
`;

const ChessBoardContainer = styled.div`
  width: 80%;
  height: 600px;
  background-color: #25294a;
  margin-top: 20px;
  border-radius: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const ToggleButton = styled.button`
  background-color: #5bc0be;
  color: #1a1a2e;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin: 5px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #ff6b6b;
    color: white;
  }
`;

const PuzzleTitle = styled.h3`
  color: #ff6b6b;
  text-align: center;
  margin-top: 30px;
`;

// Puzzle FEN strings
const puzzles = [
  { name: "Puzzle 1: Checkmate in 1", fen: "7k/5Q2/7K/8/8/8/8/8 w - - 0 1" },
  { name: "Puzzle 2: King and Pawn Endgame", fen: "8/8/8/8/4k3/8/5K2/7P w - - 0 1" },
  { name: "Puzzle 3: Fool's Mate", fen: "rnb1kbnr/ppppqppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 2" },
  { name: "Puzzle 4: Smothered Mate", fen: "5r1k/5ppp/8/8/8/8/5PPP/RN2K2R w KQ - 0 1" },
];

// 3D Chessboard Component
const ChessBoard3D = ({ fen }) => {
  const mountRef = useRef(null);
  const scene = useRef(new THREE.Scene()).current;

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

    const setupPiecesFromFen = (fen) => {
      const rows = fen.split(" ")[0].split("/");
      for (let i = 0; i < 8; i++) {
        let col = 0;
        for (const char of rows[i]) {
          if (!isNaN(char)) {
            col += parseInt(char);
          } else {
            const color = char === char.toUpperCase() ? pieceColorWhite : pieceColorBlack;
            const type = char.toLowerCase();
            addPiece(col, 7 - i, type, color);
            col++;
          }
        }
      }
    };

    const addPiece = (x, z, type, color) => {
      const piece = createPiece(type, color);
      piece.position.set(x - 3.5, 0.5, z - 3.5);
      scene.add(piece);
    };

    const createPiece = (type, color) => {
      const pieceGroup = new THREE.Group();
      switch (type) {
        case 'p':
          pieceGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.5, 32), new THREE.MeshStandardMaterial({ color })));
          break;
        case 'r':
          pieceGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.7, 32), new THREE.MeshStandardMaterial({ color })));
          break;
        case 'n':
          pieceGroup.add(new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.5, 0.3), new THREE.MeshStandardMaterial({ color })).translateY(0.5));
          break;
        case 'b':
          pieceGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.6, 32), new THREE.MeshStandardMaterial({ color })));
          break;
        case 'q':
          pieceGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.7, 32), new THREE.MeshStandardMaterial({ color })));
          break;
        case 'k':
          pieceGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.7, 32), new THREE.MeshStandardMaterial({ color })));
          break;
        default:
          break;
      }
      return pieceGroup;
    };

    setupPiecesFromFen(fen);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [fen, scene]);

  return <ChessBoardContainer ref={mountRef} />;
};

// Preparation Component with Lesson Content and 3D Chessboard
const Preparation = () => {
  const [lessons, setLessons] = useState("");
  const [is3D, setIs3D] = useState(false);
  const [selectedPuzzle, setSelectedPuzzle] = useState(puzzles[0]);

  useEffect(() => {
    fetch('/lessons.txt')
      .then((response) => response.text())
      .then((text) => setLessons(text))
      .catch((error) => console.error("Error fetching lessons:", error));
  }, []);

  return (
    <Container>
      <Title>Weekly Chess Lessons
      </Title>
      <LessonContainer>
        <pre style={{ whiteSpace: "pre-wrap", color: "#e1e1e1" }}>
          {lessons}
        </pre>
      
      </LessonContainer>

      <PuzzleTitle>{selectedPuzzle.name}</PuzzleTitle>
      {is3D ? (
        <ChessBoard3D fen={selectedPuzzle.fen} />
      ) : (
        <Chessboard position={selectedPuzzle.fen} />
      )}

      <ButtonContainer>
        {puzzles.map((puzzle, index) => (
          <ToggleButton key={index} onClick={() => setSelectedPuzzle(puzzle)}>
            {puzzle.name}
          </ToggleButton>
        ))}
        <ToggleButton onClick={() => setIs3D((prev) => !prev)}>
          {is3D ? 'Switch to 2D' : 'Switch to 3D'}
        </ToggleButton>
      </ButtonContainer>
      <a href="https://docs.google.com/document/d/1XrZkoDDK2cJTjiMAg0yxKtioYN1x7xkNm4ieSQXqqhg/edit?tab=t.0" target="_blank" rel="noopener noreferrer">Read more  </a>
    </Container>
  );
};

export default Preparation;
