'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

type BoardState = (string | null)[][];
type Piece = 'P' | 'N' | 'B' | 'R' | 'Q' | 'K' | 'p' | 'n' | 'b' | 'r' | 'q' | 'k' | null;

interface Move {
  from: string;
  to: string;
  piece: string;
}

export default function ChessModule() {
  const [boardState, setBoardState] = useState<BoardState>([
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ]);

  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);
  const [legalMoves, setLegalMoves] = useState<[number, number][]>([]);
  const [moveHistory, setMoveHistory] = useState<Move[]>([]);
  const [capturedPieces, setCapturedPieces] = useState<{ white: string[]; black: string[] }>({
    white: [],
    black: [],
  });
  const [theme, setTheme] = useState<'classic' | 'ocean' | 'forest' | 'royal'>('classic');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [gameStatus, setGameStatus] = useState<string>('Game in progress');
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);

  // Load user and game progress on mount
  useEffect(() => {
    const loadUserAndProgress = async () => {
      const supabase = createClient();
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          setUser({ id: authUser.id });
          setShowSignInPrompt(false);

          // Load saved game progress
          try {
            const { data, error } = await supabase
              .from('chess_games')
              .select('board_state, moves, captured_pieces, theme, difficulty')
              .eq('user_id', authUser.id)
              .order('created_at', { ascending: false })
              .limit(1)
              .single();

            if (data) {
              if (data.board_state) setBoardState(data.board_state);
              if (data.moves) setMoveHistory(data.moves);
              if (data.captured_pieces) setCapturedPieces(data.captured_pieces);
              if (data.theme) setTheme(data.theme);
              if (data.difficulty) setDifficulty(data.difficulty);
            }
          } catch (err) {
            // No saved game found, continue with defaults
          }
        } else {
          setShowSignInPrompt(true);
        }
      } catch (err) {
        console.error('Error loading user:', err);
      }
    };

    loadUserAndProgress();
  }, []);

  // Save progress to Supabase when game state changes
  const saveProgress = useCallback(async () => {
    if (!user) return;

    const supabase = createClient();
    try {
      await supabase.from('chess_games').upsert(
        {
          user_id: user.id,
          board_state: boardState,
          moves: moveHistory,
          captured_pieces: capturedPieces,
          theme,
          difficulty,
          result: gameStatus,
        },
        { onConflict: 'user_id' }
      );
    } catch (err) {
      console.error('Error saving chess progress:', err);
    }
  }, [user, boardState, moveHistory, capturedPieces, theme, difficulty, gameStatus]);

  // Auto-save every 30 seconds if user is logged in
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(saveProgress, 30000);
    return () => clearInterval(interval);
  }, [user, saveProgress]);

  const pieceSymbols: Record<string, string> = {
    P: '♙',
    N: '♘',
    B: '♗',
    R: '♖',
    Q: '♕',
    K: '♔',
    p: '♟',
    n: '♞',
    b: '♝',
    r: '♜',
    q: '♛',
    k: '♚',
  };

  const themeColors: Record<string, { light: string; dark: string }> = {
    classic: { light: 'bg-amber-100', dark: 'bg-amber-700' },
    ocean: { light: 'bg-sky-200', dark: 'bg-blue-600' },
    forest: { light: 'bg-green-100', dark: 'bg-green-700' },
    royal: { light: 'bg-yellow-100', dark: 'bg-brinda-purple' },
  };

  const getEncouragingMessage = () => {
    const messages = [
      'Great move, strategist!',
      "You're thinking ahead!",
      'Brilliant tactical move!',
      'Keep mastering the board!',
      'Strategic thinking at work!',
      'Well played, chess master!',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const isValidPawnMove = (from: [number, number], to: [number, number], piece: Piece): boolean => {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    if (piece === 'P') {
      // White pawn moves up (decreasing row)
      if (fromCol === toCol && boardState[toRow]?.[toCol] === null) {
        if (fromRow - toRow === 1) return true;
        if (fromRow === 6 && toRow === 4 && boardState[5]?.[toCol] === null) return true;
      }
      if (Math.abs(fromCol - toCol) === 1 && fromRow - toRow === 1 && boardState[toRow]?.[toCol]) return true;
    } else if (piece === 'p') {
      // Black pawn moves down (increasing row)
      if (fromCol === toCol && boardState[toRow]?.[toCol] === null) {
        if (toRow - fromRow === 1) return true;
        if (fromRow === 1 && toRow === 3 && boardState[2]?.[toCol] === null) return true;
      }
      if (Math.abs(fromCol - toCol) === 1 && toRow - fromRow === 1 && boardState[toRow]?.[toCol]) return true;
    }
    return false;
  };

  const isValidKnightMove = (from: [number, number], to: [number, number]): boolean => {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const rowDiff = Math.abs(fromRow - toRow);
    const colDiff = Math.abs(fromCol - toCol);
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
  };

  const isValidRookMove = (from: [number, number], to: [number, number]): boolean => {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    if (fromRow !== toRow && fromCol !== toCol) return false;

    const step = fromRow === toRow ? (toCol > fromCol ? 1 : -1) : toRow > fromRow ? 1 : -1;
    const isHorizontal = fromRow === toRow;

    if (isHorizontal) {
      for (let c = fromCol + step; c !== toCol; c += step) {
        if (boardState[fromRow]?.[c]) return false;
      }
    } else {
      for (let r = fromRow + step; r !== toRow; r += step) {
        if (boardState[r]?.[fromCol]) return false;
      }
    }
    return true;
  };

  const isValidBishopMove = (from: [number, number], to: [number, number]): boolean => {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const rowDiff = Math.abs(fromRow - toRow);
    const colDiff = Math.abs(fromCol - toCol);
    if (rowDiff !== colDiff) return false;

    const rowStep = toRow > fromRow ? 1 : -1;
    const colStep = toCol > fromCol ? 1 : -1;

    for (let i = 1; i < rowDiff; i++) {
      if (boardState[fromRow + i * rowStep]?.[fromCol + i * colStep]) return false;
    }
    return true;
  };

  const isValidQueenMove = (from: [number, number], to: [number, number]): boolean => {
    return isValidRookMove(from, to) || isValidBishopMove(from, to);
  };

  const isValidKingMove = (from: [number, number], to: [number, number]): boolean => {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    return Math.abs(fromRow - toRow) <= 1 && Math.abs(fromCol - toCol) <= 1;
  };

  const calculateLegalMoves = (row: number, col: number): [number, number][] => {
    const piece = boardState[row]?.[col];
    if (!piece) return [];

    const moves: [number, number][] = [];
    const isWhite = piece === piece.toUpperCase();

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (r === row && c === col) continue;

        const targetPiece = boardState[r]?.[c];
        if (targetPiece) {
          const targetIsWhite = targetPiece === targetPiece.toUpperCase();
          if (isWhite === targetIsWhite) continue; // Can't capture own pieces
        }

        const from: [number, number] = [row, col];
        const to: [number, number] = [r, c];
        const pieceLower = piece.toLowerCase();
        let isValid = false;

        if (pieceLower === 'p') isValid = isValidPawnMove(from, to, piece as Piece);
        else if (pieceLower === 'n') isValid = isValidKnightMove(from, to);
        else if (pieceLower === 'r') isValid = isValidRookMove(from, to);
        else if (pieceLower === 'b') isValid = isValidBishopMove(from, to);
        else if (pieceLower === 'q') isValid = isValidQueenMove(from, to);
        else if (pieceLower === 'k') isValid = isValidKingMove(from, to);

        if (isValid) moves.push([r, c]);
      }
    }

    return moves;
  };

  const handleSquareClick = (row: number, col: number) => {
    // If clicking on a legal move, make the move
    if (selectedSquare && legalMoves.some(([r, c]) => r === row && c === col)) {
      const [fromRow, fromCol] = selectedSquare;
      const piece = boardState[fromRow]?.[fromCol];
      const capturedPiece = boardState[row]?.[col];

      const newBoard = boardState.map((r) => [...r]);
      newBoard[row]![col] = piece || null;
      newBoard[fromRow]![fromCol] = null;

      setBoardState(newBoard);
      setSelectedSquare(null);
      setLegalMoves([]);

      // Track move
      const moveNotation = `${String.fromCharCode(97 + fromCol)}${8 - fromRow} → ${String.fromCharCode(97 + col)}${8 - row}`;
      setMoveHistory([...moveHistory, { from: `${fromCol},${fromRow}`, to: `${col},${row}`, piece: piece || '' }]);

      // Track captured pieces
      if (capturedPiece) {
        const isWhiteCaptured = capturedPiece === capturedPiece.toUpperCase();
        setCapturedPieces((prev) => ({
          ...prev,
          [isWhiteCaptured ? 'black' : 'white']: [...prev[isWhiteCaptured ? 'black' : 'white'], capturedPiece],
        }));
      }

      return;
    }

    // If clicking on a piece, select it
    if (boardState[row]?.[col]) {
      setSelectedSquare([row, col]);
      setLegalMoves(calculateLegalMoves(row, col));
    } else {
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  };

  const resetGame = async () => {
    setBoardState([
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ]);
    setSelectedSquare(null);
    setLegalMoves([]);
    setMoveHistory([]);
    setCapturedPieces({ white: [], black: [] });
    setGameStatus('Game in progress');

    // Save reset state if user is logged in
    if (user) {
      const supabase = createClient();
      try {
        await supabase.from('chess_games').upsert(
          {
            user_id: user.id,
            board_state: [
              ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
              ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
              [null, null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null, null],
              [null, null, null, null, null, null, null, null],
              ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
              ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
            ],
            moves: [],
            captured_pieces: { white: [], black: [] },
            theme,
            difficulty,
            result: 'Game in progress',
          },
          { onConflict: 'user_id' }
        );
      } catch (err) {
        console.error('Error resetting chess game:', err);
      }
    }
  };

  const colors = themeColors[theme];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-brinda-purple mb-2">♟ Chess Master</h1>
          <p className="text-gray-700">Master strategy, critical thinking, and the ancient game of chess.</p>
          {showSignInPrompt && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
              💡 Sign in to save your game progress and continue where you left off!
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Board */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-brinda-purple">Game Board</h2>
                  <div className="text-sm text-gray-600">{gameStatus}</div>
                </div>
              </CardHeader>
              <CardBody className="flex justify-center">
                <div className="inline-block border-4 border-gray-800 rounded-lg overflow-hidden">
                  {boardState.map((row, rowIdx) => (
                    <div key={rowIdx} className="flex">
                      {row.map((piece, colIdx) => {
                        const isWhiteSquare = (rowIdx + colIdx) % 2 === 0;
                        const isSelected = selectedSquare?.[0] === rowIdx && selectedSquare?.[1] === colIdx;
                        const isLegalMove = legalMoves.some(([r, c]) => r === rowIdx && c === colIdx);

                        return (
                          <div
                            key={`${rowIdx}-${colIdx}`}
                            onClick={() => handleSquareClick(rowIdx, colIdx)}
                            className={`w-20 h-20 flex items-center justify-center cursor-pointer text-5xl font-bold transition-all duration-150 ${
                              isWhiteSquare ? colors.light : colors.dark
                            } ${isSelected ? 'ring-4 ring-brinda-gold scale-105' : ''} ${
                              isLegalMove ? 'ring-2 ring-green-400' : ''
                            } hover:opacity-90 min-h-[80px]`}
                            role="button"
                            tabIndex={0}
                            aria-label={`Square ${String.fromCharCode(97 + colIdx)}${8 - rowIdx}`}
                          >
                            {piece ? pieceSymbols[piece] : ''}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </CardBody>
              <CardFooter className="flex flex-col gap-3">
                <Button onClick={resetGame} variant="primary" className="w-full" size="lg">
                  New Game
                </Button>
                <p className="text-sm text-gray-600 text-center italic">{moveHistory.length > 0 && getEncouragingMessage()}</p>
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            {/* Theme Selector */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold text-brinda-purple">Board Theme</h3>
              </CardHeader>
              <CardBody className="space-y-2">
                {(['classic', 'ocean', 'forest', 'royal'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-all min-h-[44px] ${
                      theme === t
                        ? 'bg-brinda-purple text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </CardBody>
            </Card>

            {/* Difficulty Selector */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold text-brinda-purple">AI Difficulty</h3>
              </CardHeader>
              <CardBody className="space-y-2">
                {[
                  { level: 'easy' as const, ages: '6-8' },
                  { level: 'medium' as const, ages: '9-11' },
                  { level: 'hard' as const, ages: '12-14' },
                ].map(({ level, ages }) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-all min-h-[44px] ${
                      difficulty === level
                        ? 'bg-brinda-gold text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)} (Ages {ages})
                  </button>
                ))}
              </CardBody>
            </Card>

            {/* Captured Pieces */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold text-brinda-purple">Captured Pieces</h3>
              </CardHeader>
              <CardBody className="space-y-3">
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-1">White Captures:</p>
                  <div className="flex flex-wrap gap-1">
                    {capturedPieces.white.length > 0 ? (
                      capturedPieces.white.map((piece, i) => (
                        <span key={i} className="text-2xl">
                          {pieceSymbols[piece]}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">None</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-1">Black Captures:</p>
                  <div className="flex flex-wrap gap-1">
                    {capturedPieces.black.length > 0 ? (
                      capturedPieces.black.map((piece, i) => (
                        <span key={i} className="text-2xl">
                          {pieceSymbols[piece]}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">None</span>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Move History */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold text-brinda-purple">Move History</h3>
              </CardHeader>
              <CardBody>
                <div className="max-h-48 overflow-y-auto space-y-1">
                  {moveHistory.length > 0 ? (
                    moveHistory.map((move, i) => (
                      <div key={i} className="text-sm text-gray-700 p-2 bg-gray-50 rounded">
                        {i + 1}. {move.from} → {move.to}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No moves yet. Click a piece to start!</p>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Info Section */}
        <Card className="mt-8">
          <CardHeader>
            <h2 className="text-xl font-bold text-brinda-purple">How to Play</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-brinda-purple mb-2">1. Select</h3>
                <p className="text-gray-700 text-sm">Click on any of your pieces to select it and see legal moves highlighted in green.</p>
              </div>
              <div>
                <h3 className="font-bold text-brinda-purple mb-2">2. Move</h3>
                <p className="text-gray-700 text-sm">Click on a highlighted square to move your piece. Each piece type moves differently!</p>
              </div>
              <div>
                <h3 className="font-bold text-brinda-purple mb-2">3. Strategy</h3>
                <p className="text-gray-700 text-sm">Think several moves ahead! Capture opponent pieces, protect your king, and work toward checkmate.</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
