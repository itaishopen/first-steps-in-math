const en = {
  // StartScreen
  gameTitle: 'Math Safari!',
  gameSubtitle: 'Count animals, drag the answer!',
  diffEasyLabel: 'Easy',
  diffEasyDesc: 'Numbers 0–10 with pictures',
  diffMediumLabel: 'Medium',
  diffMediumDesc: 'Numbers 5–20 with pictures',
  diffHardLabel: 'Hard',
  diffHardDesc: 'Numbers 10–50 with digits',
  play: 'Play!',
  customGame: '⚙️ Custom Game',
  leaderboard: '🏆 Leaderboard',

  // GameScreen
  score: 'Score',
  questionCounter: 'Question {{n}} of {{total}}',
  quit: '✕ Quit',
  quitConfirm: 'Are you sure you want to quit? Your progress will be lost! 😢',

  // QuestionView
  feedbackCorrect: '🎉 Amazing!',
  feedbackWrong: '💪 Try again!',
  tapHint: 'Tap the drop zone to check your answer!',

  // EndScreen
  menuBack: '← Menu',
  gameOver: 'Game Over!',
  msgStar: 'Amazing! You are a Math Star! 🌟',
  msgGreat: 'Great job! Keep it up! 🎉',
  msgNice: 'Nice try! Practice makes perfect! 💪',
  enterName: 'Enter your name to save your score:',
  namePlaceholder: 'Your name...',
  saveScore: '💾 Save Score',
  scoreSaved: '✅ Score saved! Great job, {{name}}!',
  playAgain: '🔄 Play Again',
  goToLeaderboard: '🏆 Leaderboard',
  backToMenu: 'Go back to the main menu?',

  // ConfirmModal
  confirmYes: 'Yes, leave',
  confirmNo: 'Stay here!',

  // CustomGameSettings
  customTitle: '⚙️ Custom Game',
  minNumber: 'Minimum number',
  maxNumber: 'Maximum number',
  questions: 'Questions',
  operators: 'Operators',
  display: 'Display',
  opAdd: '➕ Add',
  opSub: '➖ Sub',
  displayPictures: '🐱 Pictures',
  displayNumbers: '🔢 Numbers',
  startGame: '🚀 Start Game',
  back: '← Back',
  errorMinOne: 'Minimum must be at least 1.',
  errorMinMax: 'Minimum cannot be greater than maximum.',
  errorQuestions: 'Questions must be between 1 and 30.',

  // Leaderboard
  leaderboardTitle: '🏆 Leaderboard',
  diffLabelEasy: '🌟 Easy',
  diffLabelMedium: '⭐⭐ Medium',
  diffLabelHard: '🔥 Hard',
  diffLabelCustom: '⚙️ Custom',
  colRank: '#',
  colName: 'Name',
  colScore: 'Score',
  colLevel: 'Level',
  colDate: 'Date',
  noScores: 'No scores yet! Be the first to play! 🎮',
  clearScores: '🗑️ Clear',
} as const;

export default en;
