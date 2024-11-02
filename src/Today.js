// src/Today.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StreamersWidget from './StreamersWidget';
import styled from 'styled-components';

const TodayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WidgetContainer = styled.div`
  background-color: #353941;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  color: #f0f0f0;
  margin-bottom: 20px;
`;

const Today = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('https://api.chess.com/pub/news')
      .then(response => setArticles(response.data.articles))
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  return (
    <TodayContainer>
      <h2>Today’s Highlights</h2>

      {/* Streamers Widget */}
      <StreamersWidget />

      {/* News Articles */}
      {articles.map(article => (
        <WidgetContainer key={article.id}>
          <h3>{article.title}</h3>
          <p>{article.summary}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
        </WidgetContainer>
      ))}
    </TodayContainer>
  );
};

export default Today;
