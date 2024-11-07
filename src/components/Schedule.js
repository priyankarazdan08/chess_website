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

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;

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
      // Check if mountRef.current exists before trying to remove the child
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
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
