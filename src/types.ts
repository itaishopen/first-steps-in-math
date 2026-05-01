export type Difficulty = 'easy' | 'medium' | 'hard' | 'custom';

export type DisplayMode = 'pictures' | 'numbers';

export type Operator = '+' | '-';

export type AnimalType =
  | 'unicorn'
  | 'cat'
  | 'dog'
  | 'rabbit'
  | 'lion'
  | 'elephant'
  | 'duck'
  | 'penguin';

export interface Question {
  id: number;
  animal: AnimalType;
  a: number;
  b: number;
  operator: Operator;
  answer: number;
  choices: number[];
  mode: DisplayMode;
}

export interface GameSettings {
  difficulty: Difficulty;
  min: number;
  max: number;
  questionCount: number;
  mode: DisplayMode;
  operators: Operator[];
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  total: number;
  difficulty: Difficulty;
  date: string;
}

export type Screen = 'start' | 'game' | 'end' | 'leaderboard' | 'custom';

export type FeedbackState = 'idle' | 'correct' | 'wrong';
