// src/Today.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StreamersWidget from './StreamersWidget';
import TopPlayersWidget from './TopPlayersWidget';
import SurveyWidget from './SurveyWidget'; // Import SurveyWidget
import styled from 'styled-components';

const TodayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WidgetsRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start; /* Prevent vertical stretching */
`;

const StreamerAndSurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Today = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch articles or any additional data if needed
    axios.get('https://api.chess.com/pub/news')
      .then(response => setArticles(response.data.articles))
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  return (
    <TodayContainer>
      <h2>Today’s Highlights</h2>

      {/* Row of Widgets */}
      <WidgetsRow>
        {/* Container for Streamers and Survey Widgets */}
        <StreamerAndSurveyContainer>
          <StreamersWidget />
          <SurveyWidget /> {/* SurveyWidget appears below StreamersWidget */}
        </StreamerAndSurveyContainer>

        {/* Top Players Widget */}
        <TopPlayersWidget />
      </WidgetsRow>

      {/* Render articles here if needed */}
    </TodayContainer>
  );
};

export default Today;