import React, { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

function OpeningBoard({ pgn }) {
  const [position, setPosition] = useState("start");
  const [arrows, setArrows] = useState([]);

  const chess = new Chess();
  chess.load_pgn(pgn);
  const moves = chess.history({ verbose: true });

  // Show initial moves for the opening
  const openingMoves = moves.slice(0, 4); // Adjust number based on depth needed
  const arrowCoordinates = openingMoves.map((move) => [move.from, move.to]);

  return (
    <Chessboard
      position={chess.fen()}
      arrows={arrowCoordinates}
    />
  );
}

export default OpeningBoard;
