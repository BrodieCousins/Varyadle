import React, { useState, useEffect, useCallback } from 'react';
import type { GameState } from '../types/game';
import { getCurrentWord } from '../data/words';
import { 
  initializeGame, 
  addLetter, 
  removeLetter, 
  submitGuess,
} from '../utils/gameLogic';
import GameBoard from './GameBoard';
import Keyboard from './Keyboard';
import Header from './Header';

import Toast from './Toast';
import GameOverModal from './GameOverModal';
import './Game.css';

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => 
    initializeGame(getCurrentWord())
  );
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [shakeBoard, setShakeBoard] = useState(false);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    if (type === 'error') {
      setShakeBoard(true);
      setTimeout(() => setShakeBoard(false), 500);
    }
  };

  const handlePlayAgain = () => {
    setGameState(initializeGame(getCurrentWord()));
  };

  // Handle keyboard input
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameState.gameStatus !== 'playing') return;

    const key = event.key.toUpperCase();
    
    if (key === 'ENTER') {
      // Only allow submit if all slots are filled
      const allFilled = gameState.currentGuess.every(c => c !== '');
      if (allFilled) {
        setGameState(submitGuess(gameState));
      } else {
        showToast('Not enough letters', 'error');
      }
    } else if (key === 'BACKSPACE') {
      setGameState(removeLetter(gameState));
    } else if (/^[A-Z]$/.test(key)) {
      setGameState(addLetter(gameState, key));
    }
  }, [gameState]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const handleLetterClick = (letter: string) => {
    setGameState(addLetter(gameState, letter));
  };

  const handleBackspace = () => {
    setGameState(removeLetter(gameState));
  };

  const handleEnter = () => {
    // Only allow submit if all non-space cells are filled
    const allFilled = gameState.currentGuess.every((c, i) => gameState.targetWord[i] === ' ' || c !== '');
    if (allFilled) {
      setGameState(submitGuess(gameState));
    } else {
      showToast('Not enough letters', 'error');
    }
  };

  return (
    <div className="game">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {gameState.gameStatus !== 'playing' && (
        <GameOverModal 
          gameStatus={gameState.gameStatus}
          targetWord={gameState.targetWord}
          onPlayAgain={handlePlayAgain}
        />
      )}
      
      <Header />
      <div className="game-container">
        <GameBoard 
          gameState={gameState} 
          shake={shakeBoard}
          wordableLength={gameState.wordableLength}
        />
        <Keyboard 
          gameState={gameState}
          onLetterClick={handleLetterClick}
          onBackspace={handleBackspace}
          onEnter={handleEnter}
          wordLength={gameState.guessableLength}
        />
      </div>
    </div>
  );
};

export default Game;