export type LetterState = 'correct' | 'present' | 'absent' | 'empty';

export interface Letter {
  char: string;
  state: LetterState;
}

export interface GameState {
  guesses: Letter[][];
  currentGuess: string[]; // compact: only letters, no spaces
  currentRow: number;
  gameStatus: 'playing' | 'won' | 'lost';
  targetWord: string;
  wordableLength: number; // Renamed from wordLength to wordableLength
  guessableLength: number;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[]; // Index represents number of guesses (1-6)
}