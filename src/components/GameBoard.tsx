import React from 'react';
import type { GameState } from '../types/game';
import './GameBoard.css';

interface GameBoardProps {
  gameState: GameState;
  shake: boolean;
  wordableLength: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, shake, wordableLength }) => {
  const numCols = gameState.targetWord.length;
  return (
    <div className={`game-board ${shake ? 'shake' : ''}`}>
      {gameState.guesses.map((guess, rowIndex) => {
        return (
          <div
            key={rowIndex}
            className="guess-row"
            style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 1fr)`, gap: '2px', width: '100%' }}
          >
            {Array.from(gameState.targetWord).map((char, i) => {
              if (char === ' ') {
                return <div key={i} className="spacer-cell" />;
              }
              
              let displayChar = '';
              let cellState = 'empty';
              
              if (rowIndex < gameState.currentRow) {
                // For completed rows, use the stored guess
                displayChar = guess[i]?.char || '';
                cellState = guess[i]?.state || 'empty';
              } else if (rowIndex === gameState.currentRow) {
                // For current row, count non-space characters up to this position
                let letterCount = 0;
                for (let j = 0; j < i; j++) {
                  if (gameState.targetWord[j] !== ' ') letterCount++;
                }
                displayChar = gameState.currentGuess[letterCount] || '';
                cellState = displayChar ? 'filled' : 'empty';
              }
              
              return (
                <div
                  key={i}
                  className={`letter-cell ${cellState}`}
                  data-animation={rowIndex < gameState.currentRow ? `flip-${i}` : ''}
                >
                  {displayChar}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GameBoard;