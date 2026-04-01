'use client';

import React from 'react';
import { Card, CardBody } from '@/components/ui/Card';

interface ChessBoardProps {
  pgn?: string;
  interactive?: boolean;
}

export function ChessBoard({ pgn, interactive = false }: ChessBoardProps) {
  const [boardState, setBoardState] = React.useState<string[][]>([
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ]);

  const pieceSymbols: Record<string, string> = {
    'k': '♚',
    'q': '♛',
    'r': '♜',
    'b': '♝',
    'n': '♞',
    'p': '♟',
    'K': '♔',
    'Q': '♕',
    'R': '♖',
    'B': '♗',
    'N': '♘',
    'P': '♙',
    ' ': '',
  };

  const handleSquareClick = (row: number, col: number) => {
    if (!interactive) return;
    // Placeholder for future move handling
    console.log(`Clicked square: ${String.fromCharCode(97 + col)}${8 - row}`);
  };

  return (
    <Card>
      <CardBody>
        <div className="flex justify-center">
          <div className="inline-block border-4 border-gray-800">
            {boardState.map((row, rowIdx) => (
              <div key={rowIdx} className="flex">
                {row.map((piece, colIdx) => {
                  const isWhiteSquare = (rowIdx + colIdx) % 2 === 0;
                  return (
                    <div
                      key={`${rowIdx}-${colIdx}`}
                      onClick={() => handleSquareClick(rowIdx, colIdx)}
                      className={`w-16 h-16 flex items-center justify-center cursor-pointer text-4xl font-bold transition-opacity hover:opacity-75 ${
                        isWhiteSquare ? 'bg-amber-100' : 'bg-amber-700'
                      }`}
                    >
                      {pieceSymbols[piece]}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        {interactive && (
          <p className="text-center mt-4 text-sm text-gray-600">
            Click on squares to make moves. Full chess engine integration coming soon.
          </p>
        )}
      </CardBody>
    </Card>
  );
}
