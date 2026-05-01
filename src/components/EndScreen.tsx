import { useState, useEffect, useRef } from 'react';
import type { GameSettings } from '../types';
import { saveEntry } from '../utils/storage';
import { ConfirmModal } from './ConfirmModal';
import '../lit-components/index';

interface Props {
  score: number;
  total: number;
  settings: GameSettings;
  onPlayAgain: () => void;
  onLeaderboard: () => void;
  onBack: () => void;
}

export function EndScreen({ score, total, settings, onPlayAgain, onLeaderboard, onBack }: Props) {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const playRef = useRef<HTMLElement | null>(null);
  const lbRef = useRef<HTMLElement | null>(null);
  const saveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const p = playRef.current;
    const l = lbRef.current;
    const s = saveRef.current;
    if (p) p.addEventListener('kid-click', onPlayAgain);
    if (l) l.addEventListener('kid-click', onLeaderboard);
    if (s) {
      const handler = () => handleSave();
      s.addEventListener('kid-click', handler);
      return () => {
        if (p) p.removeEventListener('kid-click', onPlayAgain);
        if (l) l.removeEventListener('kid-click', onLeaderboard);
        s.removeEventListener('kid-click', handler);
      };
    }
    return () => {
      if (p) p.removeEventListener('kid-click', onPlayAgain);
      if (l) l.removeEventListener('kid-click', onLeaderboard);
    };
  }, [name, saved]);

  const handleSave = () => {
    if (!name.trim() || saved) return;
    saveEntry({
      id: Date.now().toString(),
      playerName: name.trim(),
      score,
      total,
      difficulty: settings.difficulty,
      date: new Date().toLocaleDateString(),
    });
    setSaved(true);
  };

  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : 1;
  const message =
    stars === 3 ? 'Amazing! You are a Math Star! 🌟' :
    stars === 2 ? 'Great job! Keep it up! 🎉' :
    'Nice try! Practice makes perfect! 💪';

  return (
    <>
      <div className="end-screen">
        <button className="back-btn" onClick={() => setShowConfirm(true)}>
          ← Menu
        </button>

        <div className="end-stars">
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} className={`star ${i < stars ? 'lit' : 'dim'}`}>⭐</span>
          ))}
        </div>

        <h2 className="end-title">Game Over!</h2>
        <p className="end-message">{message}</p>

        <div className="score-card">
          <div className="final-score">{score} / {total}</div>
          <div className="score-pct">{pct}%</div>
        </div>

        {!saved ? (
          <div className="save-section">
            <label className="name-label">Enter your name to save your score:</label>
            <input
              className="name-input"
              type="text"
              placeholder="Your name..."
              maxLength={20}
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSave(); }}
            />
            <kid-button
              ref={(el: HTMLElement | null) => { saveRef.current = el; }}
              variant="success"
              disabled={!name.trim()}
            >
              💾 Save Score
            </kid-button>
          </div>
        ) : (
          <div className="saved-msg">✅ Score saved! Great job, {name}!</div>
        )}

        <div className="end-buttons">
          <kid-button
            ref={(el: HTMLElement | null) => { playRef.current = el; }}
            variant="primary"
          >
            🔄 Play Again
          </kid-button>
          <kid-button
            ref={(el: HTMLElement | null) => { lbRef.current = el; }}
            variant="secondary"
          >
            🏆 Leaderboard
          </kid-button>
        </div>
      </div>

      {showConfirm && (
        <ConfirmModal
          message="Go back to the main menu?"
          onConfirm={onBack}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}
