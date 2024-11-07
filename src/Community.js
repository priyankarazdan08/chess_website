import React from 'react';
import styled from 'styled-components';

const CommunityContainer = styled.div`
  font-family: Arial, sans-serif;
  color: #e1e1e1;
  background-color: #1a1a2e;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 2rem;
  background-color: #3a86ff;
  color: #101828;
`;

const Section = styled.section`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ForumsGrid = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Forum = styled.div`
  background-color: #25294a;
  padding: 1rem;
  flex: 1;
  min-width: 200px;
  border-radius: 8px;
  text-align: center;
  h4 {
    color: #5bc0be;
    margin-bottom: 0.5rem;
  }
  p {
    margin-bottom: 1rem;
  }
  a {
    color: #ff6b6b;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  button {
    background-color: #5bc0be;
    color: #1a1a2e;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
      background-color: #ff6b6b;
      color: white;
    }
  }
`;

const NewsGrid = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const NewsItem = styled.div`
  background-color: #25294a;
  padding: 1rem;
  flex: 1;
  min-width: 200px;
  border-radius: 8px;
  text-align: center;
  h4 {
    color: #5bc0be;
    margin-bottom: 0.5rem;
  }
  p {
    margin-bottom: 1rem;
  }
  a {
    color: #ff6b6b;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const EventsList = styled.ul`
  list-style-type: none;
  padding: 0;
  li {
    background-color: #25294a;
    margin: 0.5rem 0;
    padding: 0.5rem;
    border-radius: 5px;
  }
`;

const Footer = styled.footer`
  background-color: #101828;
  padding: 1rem;
  text-align: center;
  button {
    background-color: #ff7f50;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
      background-color: #5bc0be;
    }
  }
`;

function Community() {
  return (
    <CommunityContainer>
      {/* Hero Section */}
      <HeroSection>
        <h2>Join the Chess Community!</h2>
        <p>Explore forums, articles, and chess events with fellow enthusiasts.</p>
      </HeroSection>

      {/* Forums Section */}
      <Section>
        <h3>Popular Forums</h3>
        <ForumsGrid>
          <Forum>
            <h4>General Discussion</h4>
            <p>Talk about chess strategy, tactics, and more.</p>
            <a href="https://www.chess.com/forum/view/general/danny-vs-the-world-danny-rensch-challenges-you" target="_blank" rel="noopener noreferrer">Read more </a>
            {/* <button>Enter Forum</button> */}
          </Forum>
          <Forum>
            <h4>Opening Theory</h4>
            <p>Discuss various chess openings with experienced players.</p>
            <a href="https://www.chess.com/forum/view/general/participate-in-a-chess-study-on-mental-preparation" target="_blank" rel="noopener noreferrer">Read more </a>
            {/* <button>Enter Forum</button> */}
          </Forum>
          <Forum>
            <h4>Chess Puzzles</h4>
            <p>Solve puzzles and improve your tactical skills.</p>
            <a href="https://www.chess.com/forum/view/general/is-1500-really-hard-to-get-in-blitz" target="_blank" rel="noopener noreferrer">Read more  </a>
            {/* <button>Enter Forum</button> */}
          </Forum>
        </ForumsGrid>
      </Section>

      {/* News Section */}
      <Section>
        <h3>Chess News</h3>
        <NewsGrid>
          <NewsItem>
            <h4>World Chess Championship</h4>
            <p>Follow the latest updates on the World Chess Championship.</p>
            <a href="https://chess24.com/en/news" target="_blank" rel="noopener noreferrer">Read more </a>
          </NewsItem>
          <NewsItem>
            <h4>AI and Chess</h4>
            <p>How artificial intelligence is shaping the future of chess.</p>
            <a href="https://www.chess.com/article/view/ai-in-chess" target="_blank" rel="noopener noreferrer">Read more  </a>
          </NewsItem>
        </NewsGrid>
      </Section>

      {/* Events Section */}
      <Section>
        <h3>Upcoming Chess Events</h3>
        <EventsList>
          <li>Chess.com Global Championship - Nov 2024</li>
          <li>FIDE World Chess Cup - Dec 2024</li>
          <li>Online Chess Tournaments - Monthly</li>
        </EventsList>
      </Section>

      {/* Footer */}
      <Footer>
        <p>Chess Community © 2024</p>
        <button>Join Our Newsletter</button>
      </Footer>
    </CommunityContainer>
  );
}

export default Community;
