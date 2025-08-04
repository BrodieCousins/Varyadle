import React from 'react';
import type { GameState, LetterState } from '../types/game';
import './Keyboard.css';

interface KeyboardProps {
  gameState: GameState;
  onLetterClick: (letter: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  wordLength: number;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

const Keyboard: React.FC<KeyboardProps> = ({ 
  gameState, 
  onLetterClick, 
  onBackspace, 
  onEnter 
}) => {
  // Get the state of each letter based on previous guesses
  const getLetterState = (letter: string): LetterState => {
    let hasCorrect = false;
    let hasPresent = false;
    let hasAbsent = false;

    for (let rowIndex = 0; rowIndex < gameState.currentRow; rowIndex++) {
      const guess = gameState.guesses[rowIndex];
      for (const guessLetter of guess) {
        if (guessLetter.char === letter) {
          if (guessLetter.state === 'correct') {
            hasCorrect = true;
          } else if (guessLetter.state === 'present') {
            hasPresent = true;
          } else if (guessLetter.state === 'absent') {
            hasAbsent = true;
          }
        }
      }
    }

    if (hasCorrect) {
      return 'correct';
    } else if (hasPresent) {
      return 'present';
    } else if (hasAbsent) {
      return 'absent';
    } else {
      return 'empty';
    }
  };

  const handleKeyClick = (key: string) => {
    if (key === 'ENTER') {
      onEnter();
    } else if (key === 'BACKSPACE') {
      onBackspace();
    } else {
      onLetterClick(key);
    }
  };

  return (
    <div className="keyboard">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => {
            const isSpecialKey = key === 'ENTER' || key === 'BACKSPACE';
            const letterState = isSpecialKey ? 'empty' : getLetterState(key);
            
            return (
              <button
                key={key}
                className={`keyboard-key ${letterState} ${isSpecialKey ? 'special' : ''}`}
                onClick={() => handleKeyClick(key)}
                disabled={gameState.gameStatus !== 'playing'}
              >
                {key === 'BACKSPACE' ? '⌫' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;