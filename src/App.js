import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Today from './Today';
import Community from "./Community";
import Preparation from "./components/Preperation";
import Schedule from "./components/Schedule";
import Research from "./components/Research";

<<<<<<< Updated upstream
=======
//import OpeningTree from './OpeningTree';
>>>>>>> Stashed changes

const AppContainer = styled.div`
  display: flex;
  font-family: 'Verdana', sans-serif;
  background-color: #282c34;
  color: #f0f0f0;
`;

const Sidebar = styled.nav`
  background-color: #3b3f46;
  padding: 20px;
  width: 200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
`;

const SidebarLink = styled(Link)`
  color: #61dafb;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    color: #f78c6b;
  }
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #61dafb;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Sidebar>
          <Title>The Chess Vault</Title>
          <SidebarLink to="/today">News</SidebarLink>
          <SidebarLink to="/preperation">Preperation</SidebarLink>
          <SidebarLink to="/research">Research</SidebarLink>
          <SidebarLink to="/community">Community</SidebarLink>
          <SidebarLink to="/schedule">Visualize Variants</SidebarLink>
        </Sidebar>
        <MainContent>
          <Routes>
<<<<<<< Updated upstream
            <Route path="/" element={<Today />} />
=======
            <Route path="/today" element={<Today />} />
>>>>>>> Stashed changes
            <Route path="/preperation" element={<Preparation />} />
            <Route path="/research" element={<Research />} />
            <Route path="/community" element={<Community />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}
export default App;
