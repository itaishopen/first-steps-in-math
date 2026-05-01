import type { AnimalType, DisplayMode, GameSettings, Operator, Question } from '../types';

const ANIMALS: AnimalType[] = [
  'unicorn', 'cat', 'dog', 'rabbit', 'lion', 'elephant', 'duck', 'penguin',
];

function randomInt(min: number, max: number): number {
  if (min > max) return min;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomAnimal(): AnimalType {
  return ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
}

function randomOperator(operators: Operator[]): Operator {
  return operators[Math.floor(Math.random() * operators.length)];
}

function generateWrongChoices(correct: number, rangeMax: number): number[] {
  const wrong = new Set<number>();
  let attempts = 0;
  while (wrong.size < 3 && attempts < 200) {
    attempts++;
    const delta = randomInt(1, Math.max(3, Math.floor(rangeMax * 0.25)));
    const candidate = Math.random() < 0.5 ? correct + delta : correct - delta;
    if (candidate !== correct && candidate >= 0 && !wrong.has(candidate)) {
      wrong.add(candidate);
    }
  }
  // Safety fill
  let fill = 1;
  while (wrong.size < 3) {
    if (correct + fill !== correct) wrong.add(correct + fill);
    fill++;
  }
  return [...wrong].slice(0, 3);
}

export function generateQuestion(id: number, settings: GameSettings): Question {
  const { min, max, mode, operators } = settings;
  const animal = randomAnimal();
  const operator = randomOperator(operators);

  // Ensure operands are at least 1 so we never get "+0" or "-0"
  const minOp = Math.max(1, min);

  let a: number, b: number, answer: number;

  if (operator === '+') {
    a = randomInt(minOp, max);
    b = randomInt(minOp, max);
    answer = a + b;
  } else {
    // subtraction: a >= b+1 so answer >= 1
    a = randomInt(Math.max(2, minOp), max);
    b = randomInt(1, a - 1);
    answer = a - b;
  }

  const wrong = generateWrongChoices(answer, max * 2);
  const choices = shuffle([answer, ...wrong]);

  return { id, animal, a, b, operator, answer, choices, mode };
}

export function generateQuestions(settings: GameSettings): Question[] {
  return Array.from({ length: settings.questionCount }, (_, i) =>
    generateQuestion(i + 1, settings)
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function settingsForDifficulty(difficulty: 'easy' | 'medium' | 'hard'): GameSettings {
  switch (difficulty) {
    case 'easy':
      return { difficulty, min: 1, max: 5, questionCount: 8, mode: 'pictures', operators: ['+'] };
    case 'medium':
      return { difficulty, min: 5, max: 20, questionCount: 10, mode: 'pictures', operators: ['+', '-'] };
    case 'hard':
      return { difficulty, min: 10, max: 50, questionCount: 12, mode: 'numbers', operators: ['+', '-'] };
  }
}
