import React, { useEffect, useRef, useState } from 'react';
import Chessboard from 'chessboardjsx';
import * as THREE from 'three';
import { FontLoader} from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import styled from 'styled-components';

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

const Header = styled.header`
  background-color: #101828;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled.a`
  color: #5bc0be;
  margin: 0 10px;
  text-decoration: none;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 2rem;
  background-color: #3a86ff;
  color: #101828;
`;

const HeroButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
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

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;

    // Helper function to generate chessboard notation (a1, b1, etc.)
    const getSquareNotation = (x, z) => {
      const files = "abcdefgh";
      return `${files[x]}${z + 1}`;
    };

    // // Create the chessboard with notation
    // const squareSize = 1;
    // const fontLoader = new THREE.FontLoader();
    // fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    //   for (let x = 0; x < 8; x++) {
    //     for (let z = 0; z < 8; z++) {
    //       // Determine color for the square
    //       const color = (x + z) % 2 === 0 ? 0xffffff : 0x000000;
    //       const geometry = new THREE.BoxGeometry(squareSize, 0.1, squareSize);
    //       const material = new THREE.MeshBasicMaterial({ color });
    //       const square = new THREE.Mesh(geometry, material);
    //       square.position.set(x - 4, 0, z - 4); // Center the board
    //       scene.add(square);

    //       // Add notation text on each square
    //       const notation = getSquareNotation(x, z);
    //       const textGeometry = new THREE.TextGeometry(notation, {
    //         font: font,
    //         size: 0.2,
    //         height: 0.02,
    //       });
    //       const textMaterial = new THREE.MeshBasicMaterial({ color: color === 0xffffff ? 0x000000 : 0xffffff });
    //       const text = new THREE.Mesh(textGeometry, textMaterial);
    //       text.position.set(x - 4.4, 0.1, z - 3.8); // Offset for text position
    //       scene.add(text);
    //     }
    //   }
    // });  FIX THISSSSSS

    // Set up camera position
    camera.position.y = 5;
    camera.position.z = 7;
    camera.lookAt(0, 0, 0);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <ChessBoardContainer ref={mountRef} />;
};

const Schedule = () => {
  const [is3D, setIs3D] = useState(false);

  const toggleView = () => {
    setIs3D((prev) => !prev);
  };

  return (
    <AppContainer>
      
      <HeroSection>
        <h2>Welcome to the Chess Vault</h2>
        <HeroButton>Explore Now</HeroButton>
      </HeroSection>
      
      <ScheduleContainer>
        <h2>Play-Board</h2>
        {is3D ? <ChessBoard3D /> : <Chessboard position="start" />}
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
