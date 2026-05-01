import { useEffect, useRef } from 'react';
import type { Difficulty } from '../types';
import '../lit-components/index';

interface Props {
  onPlay: (difficulty: Difficulty) => void;
  onCustom: () => void;
  onLeaderboard: () => void;
}

const DIFFICULTIES: { key: Difficulty; label: string; emoji: string; desc: string; color: string }[] = [
  { key: 'easy', label: 'Easy', emoji: '🐱', desc: 'Numbers 0–10 with pictures', color: '#bbf7d0' },
  { key: 'medium', label: 'Medium', emoji: '🐘', desc: 'Numbers 5–20 with pictures', color: '#bfdbfe' },
  { key: 'hard', label: 'Hard', emoji: '🦁', desc: 'Numbers 10–50 with digits', color: '#fde68a' },
];

export function StartScreen({ onPlay, onCustom, onLeaderboard }: Props) {
  const btnRefs = useRef<(HTMLElement | null)[]>([]);
  const customRef = useRef<HTMLElement | null>(null);
  const lbRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    DIFFICULTIES.forEach((d, i) => {
      const el = btnRefs.current[i];
      if (!el) return;
      const handler = () => onPlay(d.key);
      el.addEventListener('kid-click', handler);
      return () => el.removeEventListener('kid-click', handler);
    });
    const customEl = customRef.current;
    const lbEl = lbRef.current;
    if (customEl) customEl.addEventListener('kid-click', onCustom);
    if (lbEl) lbEl.addEventListener('kid-click', onLeaderboard);
    return () => {
      if (customEl) customEl.removeEventListener('kid-click', onCustom);
      if (lbEl) lbEl.removeEventListener('kid-click', onLeaderboard);
    };
  }, [onPlay, onCustom, onLeaderboard]);

  return (
    <div className="start-screen">
      <div className="title-area">
        <div className="title-animals">🦄 🐰 🦁</div>
        <h1 className="game-title">Math Safari!</h1>
        <p className="game-subtitle">Count animals, drag the answer!</p>
      </div>

      <div className="difficulty-grid">
        {DIFFICULTIES.map((d, i) => (
          <div key={d.key} className="difficulty-card" style={{ background: d.color }}>
            <div className="diff-emoji">{d.emoji}</div>
            <div className="diff-label">{d.label}</div>
            <div className="diff-desc">{d.desc}</div>
            <kid-button
              ref={(el: HTMLElement | null) => { btnRefs.current[i] = el; }}
              variant="primary"
            >
              Play!
            </kid-button>
          </div>
        ))}
      </div>

      <div className="extra-buttons">
        <kid-button
          ref={(el: HTMLElement | null) => { customRef.current = el; }}
          variant="secondary"
        >
          ⚙️ Custom Game
        </kid-button>
        <kid-button
          ref={(el: HTMLElement | null) => { lbRef.current = el; }}
          variant="secondary"
        >
          🏆 Leaderboard
        </kid-button>
      </div>
    </div>
  );
}
