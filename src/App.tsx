import { useState, useCallback } from 'react';
import type { Screen, Difficulty, GameSettings } from './types';
import { settingsForDifficulty } from './utils/game';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { EndScreen } from './components/EndScreen';
import { Leaderboard } from './components/Leaderboard';
import { CustomGameSettings } from './components/CustomGameSettings';
import { LanguageSwitcher } from './components/LanguageSwitcher';

export default function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [settings, setSettings] = useState<GameSettings | null>(null);
  const [finalScore, setFinalScore] = useState({ score: 0, total: 0 });

  const handlePlay = useCallback((difficulty: Difficulty) => {
    if (difficulty === 'custom') return;
    setSettings(settingsForDifficulty(difficulty as 'easy' | 'medium' | 'hard'));
    setScreen('game');
  }, []);

  const handleCustomStart = useCallback((s: GameSettings) => {
    setSettings(s);
    setScreen('game');
  }, []);

  const handleGameEnd = useCallback((score: number, total: number) => {
    setFinalScore({ score, total });
    setScreen('end');
  }, []);

  const goHome = useCallback(() => {
    setScreen('start');
    setSettings(null);
  }, []);

  return (
    <div className="app-shell">
      <LanguageSwitcher />
      <div className="app-card">
        {screen === 'start' && (
          <StartScreen
            onPlay={handlePlay}
            onCustom={() => setScreen('custom')}
            onLeaderboard={() => setScreen('leaderboard')}
          />
        )}
        {screen === 'game' && settings && (
          <GameScreen
            settings={settings}
            onGameEnd={handleGameEnd}
            onBack={goHome}
          />
        )}
        {screen === 'end' && settings && (
          <EndScreen
            score={finalScore.score}
            total={finalScore.total}
            settings={settings}
            onPlayAgain={goHome}
            onLeaderboard={() => setScreen('leaderboard')}
            onBack={goHome}
          />
        )}
        {screen === 'leaderboard' && (
          <Leaderboard onBack={goHome} />
        )}
        {screen === 'custom' && (
          <CustomGameSettings
            onStart={handleCustomStart}
            onBack={goHome}
          />
        )}
      </div>
    </div>
  );
}
