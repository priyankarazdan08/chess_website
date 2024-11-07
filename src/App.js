import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Today from './Today';
// import OpeningTree from './OpeningTree';

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
          <SidebarLink to="/">News</SidebarLink>
          <SidebarLink to="//">Opening Tree</SidebarLink>
        </Sidebar>
        <MainContent>
          <Routes>
            <Route path="/" element={<Today />} />
            {/* <Route path="//" element={<OpeningTree />} /> */}
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;
