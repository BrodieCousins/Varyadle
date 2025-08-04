import type { Letter, GameState } from '../types/game';
// This import is here to satisfy TypeScript's unused declaration check for LetterState
// even though it's used within other types.
import type { LetterState as _LetterState } from '../types/game';

export const MAX_GUESSES = 6;

// Check if a guess is valid
export const isValidGuess = (guess: string, guessableLength: number): boolean => {
  return guess.length === guessableLength && /^[A-Z]+$/.test(guess);
};

// Evaluate a guess against the target word
export const evaluateGuess = (guess: string, targetWord: string): Letter[] => {
  const targetLettersOnly = targetWord.replace(/ /g, '').split('');
  const guessLetters = guess.split('');
  
  // Track which letters in target (excluding spaces) have been used
  const targetUsed = new Array(targetLettersOnly.length).fill(false);
  
  // Create result for letters only (compact, no spaces)
  const result: Letter[] = Array(targetLettersOnly.length).fill(null);

  // First pass: mark correct letters
  for (let i = 0; i < targetLettersOnly.length; i++) {
    if (guessLetters[i] === targetLettersOnly[i]) {
      result[i] = { char: guessLetters[i], state: 'correct' };
      targetUsed[i] = true;
    } else {
      result[i] = { char: guessLetters[i], state: 'absent' };
    }
  }
  
  // Second pass: mark present letters
  for (let i = 0; i < targetLettersOnly.length; i++) {
    if (result[i].state === 'absent') {
      for (let j = 0; j < targetLettersOnly.length; j++) {
        if (!targetUsed[j] && targetLettersOnly[j] === guessLetters[i]) {
          result[i].state = 'present';
          targetUsed[j] = true;
          break;
        }
      }
    }
  }
  
  return result;
};

// Initialize a new game state
export const initializeGame = (targetWord: string): GameState => {
  const guessableLength = targetWord.replace(/ /g, '').length;
  const wordableLength = targetWord.length;

  const initialGuesses: Letter[][] = Array(MAX_GUESSES).fill(null).map(() => {
    const row: Letter[] = [];
    for (let i = 0; i < wordableLength; i++) {
      if (targetWord[i] === ' ') {
        row.push({ char: ' ', state: 'correct' });
      } else {
        row.push({ char: '', state: 'empty' });
      }
    }
    return row;
  });

  return {
    guesses: initialGuesses,
    currentGuess: Array(guessableLength).fill(''), // compact: only letters
    currentRow: 0,
    gameStatus: 'playing',
    targetWord: targetWord.toUpperCase(),
    wordableLength: wordableLength, // The full length including spaces
    guessableLength: guessableLength, // The length of only the letters to guess
  };
};

// Add a letter to the current guess
export const addLetter = (gameState: GameState, letter: string): GameState => {
  if (gameState.gameStatus !== 'playing') {
    return gameState;
  }
  const guessArr = [...gameState.currentGuess];
  // Only add if there is an empty slot
  const idx = guessArr.findIndex(c => c === '');
  if (idx === -1) return gameState;
  guessArr[idx] = letter.toUpperCase();
  return {
    ...gameState,
    currentGuess: guessArr,
  };
};

// Remove a letter from the current guess
export const removeLetter = (gameState: GameState): GameState => {
  if (gameState.gameStatus !== 'playing') {
    return gameState;
  }
  const guessArr = [...gameState.currentGuess];
  // Remove the last filled letter
  for (let i = guessArr.length - 1; i >= 0; i--) {
    if (guessArr[i] !== '') {
      guessArr[i] = '';
      break;
    }
  }
  return {
    ...gameState,
    currentGuess: guessArr,
  };
};

// Submit the current guess
export const submitGuess = (gameState: GameState): GameState => {
  // Only allow submit if all slots are filled
  const allFilled = gameState.currentGuess.every(c => c !== '');
  if (gameState.gameStatus !== 'playing' || !allFilled) {
    return gameState;
  }
  // Map compact guess to the target word (skipping spaces)
  const target = gameState.targetWord;
  const guessString = gameState.currentGuess.join('');
  const evaluatedGuess = evaluateGuess(guessString, target);
  const newGuesses = [...gameState.guesses];

  // Merge evaluated letters with existing spaces in the row
  const mergedRow: Letter[] = [];
  let guessIdx = 0;
  for (let i = 0; i < target.length; i++) {
    if (target[i] === ' ') {
      mergedRow.push({ char: ' ', state: 'correct' });
    } else {
      mergedRow.push(evaluatedGuess[guessIdx]);
      guessIdx++;
    }
  }
  newGuesses[gameState.currentRow] = mergedRow;

  const isCorrect = evaluatedGuess.every(letter => letter.state === 'correct');
  const isGameOver = gameState.currentRow >= MAX_GUESSES - 1;

  let newGameStatus: 'playing' | 'won' | 'lost' = 'playing';
  if (isCorrect) {
    newGameStatus = 'won';
  } else if (isGameOver) {
    newGameStatus = 'lost';
  }

  // Reset currentGuess to empty compact array
  const newCurrentGuess = Array(gameState.guessableLength).fill('');

  return {
    ...gameState,
    guesses: newGuesses,
    currentGuess: newCurrentGuess,
    currentRow: gameState.currentRow + 1,
    gameStatus: newGameStatus,
  };
};

