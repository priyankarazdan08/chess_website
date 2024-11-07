import React from 'react';
import { Link } from 'react-router-dom';
import StreamersWidget from './StreamersWidget';
import TopPlayersWidget from './TopPlayersWidget';
import SurveyWidget from './SurveyWidget'; 
import styled from 'styled-components';

const TodayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const WidgetsRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StreamerAndSurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  max-width: 250px;
  min-width: 200px;
`;

const TopPlayersContainer = styled.div`
  flex: 2;
  min-width: 300px;
  max-width: 400px;
  max-height: 600px;
  overflow-y: auto;
`;

const CombinedImageAndTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  max-width: 500px;
  padding: 10px 20px;
  margin-top: 20px;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const AdditionalText = styled.p`
  font-size: 14px;
  color: #d0d0d0;
  padding: 0 10px;
`;

const ExtraImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-top: 10px;
`;

const ExtraText = styled.p`
  font-size: 16px;
  color: #d0d0d0;
  padding: 0 10px;
`;

const StyledLink = styled(Link)`
  color: #61dafb;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  margin-top: -30px;
`;

const TitleText = styled.h1`
  font-family: 'Serif', sans-serif;
  font-size: 75px;
  font-weight: bold;
  background: linear-gradient(90deg, #5eb8ff, #ffffff);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin: 0;
`;

const Today = () => {
  return (
    <TodayContainer>
      <h2>Today’s Highlights</h2>

      <WidgetsRow>
        <StreamerAndSurveyContainer>
          <StreamersWidget />
          <SurveyWidget />
        </StreamerAndSurveyContainer>

        <TopPlayersContainer>
          <TopPlayersWidget />
        </TopPlayersContainer>

        <CombinedImageAndTextContainer>
          <Image src="/image.png" alt="Chess Icon" />
          <AdditionalText>
            "There are over 9 million different possible positions after three moves each. There are over 318 billion different possible positions after four moves each. The number of distinct 40-move games in chess is far greater than the number of electrons in the observable universe."
          </AdditionalText>
          
          <ExtraImage src="/openingtreeimg.png" alt="Additional Chess Image" />
          <ExtraText>
            Discover advanced chess strategies and insights and best your openings. Using <StyledLink to="/schedule">Opening Tree</StyledLink>"
          </ExtraText>
        </CombinedImageAndTextContainer>
      </WidgetsRow>

      <TitleContainer>
        <TitleText>Chess Vault</TitleText>
      </TitleContainer>
    </TodayContainer>
  );
};

export default Today;