import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const WidgetContainer = styled.div`
  background-color: #353941;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  color: #f0f0f0;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #f0f0f0;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #2c2f36;
  }
`;

const TableCell = styled.td`
  padding: 8px;
  &:hover {
    text-decoration: underline;
  }
`;

const TopPlayersWidget = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchTopPlayers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/top-players'); // from the node server thats running
        
        console.log('Full API Response:', response);
        console.log('Players Data:', response.data.players);
        setPlayers(response.data.players || []);
      } catch (error) {
        console.error('Error fetching top players:', error);
        setPlayers([]); // Fallback to empty array if error
      }
    };

    fetchTopPlayers();
  }, []);

  return (
    <WidgetContainer>
      <h3>Top 10 FIDE Players</h3>
      <Table>
        <thead>
          <tr>
            <TableHeader>Rank</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Rating</TableHeader>
          </tr>
        </thead>
        <tbody>
          {players && players.length > 0 ? (
            players.map((player, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.standard_elo}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="3">No data available</TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>
    </WidgetContainer>
  );
};

export default TopPlayersWidget;