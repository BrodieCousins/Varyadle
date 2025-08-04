import React from 'react';
import './GameOverModal.css';

interface GameOverModalProps {
  gameStatus: 'won' | 'lost';
  targetWord: string;
  onPlayAgain: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ gameStatus, targetWord, onPlayAgain }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{gameStatus === 'won' ? 'You Won!' : 'Game Over'}</h2>
        <p>The word was: <strong>{targetWord}</strong></p>
        <button onClick={onPlayAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default GameOverModal;
