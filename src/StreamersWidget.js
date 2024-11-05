// src/StreamersWidget.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const WidgetContainer = styled.div`
  background-color: #353941;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  color: #f0f0f0;
  font-size: 0.9em;
  max-width: 275px;
`;

const StreamerList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 210px; /* Set a fixed height for the list */
  overflow-y: auto; /* Enable vertical scrolling */
`;

const StreamerItem = styled.li`
  margin-bottom: 8px;
`;

const StreamerLink = styled.a`
  color: #61dafb;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const StreamersWidget = () => {
  const [liveStreamers, setLiveStreamers] = useState([]);

  useEffect(() => {
    const fetchStreamers = async () => {
      try {
        const response = await axios.get('https://api.chess.com/pub/streamers');
        const live = response.data.streamers.filter(streamer => streamer.is_live);
        setLiveStreamers(live);
      } catch (error) {
        console.error('Error fetching streamers:', error);
      }
    };

    fetchStreamers();
  }, []);

  return (
    <WidgetContainer>
      <h3>Live Streamers</h3>
      {liveStreamers.length > 0 ? (
        <StreamerList>
          {liveStreamers.map(streamer => (
            <StreamerItem key={streamer.username}>
              <StreamerLink href={streamer.url} target="_blank" rel="noopener noreferrer">
                {streamer.username}
              </StreamerLink>
            </StreamerItem>
          ))}
        </StreamerList>
      ) : (
        <p>No streamers live</p>
      )}
    </WidgetContainer>
  );
};

export default StreamersWidget;