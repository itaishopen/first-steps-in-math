import { useState, useEffect, useRef } from 'react';
import { topTen, clearLeaderboard } from '../utils/storage';
import type { LeaderboardEntry } from '../types';
import { ConfirmModal } from './ConfirmModal';
import '../lit-components/index';

interface Props {
  onBack: () => void;
}

const DIFF_LABELS: Record<string, string> = {
  easy: '🌟 Easy',
  medium: '⭐⭐ Medium',
  hard: '🔥 Hard',
  custom: '⚙️ Custom',
};

export function Leaderboard({ onBack }: Props) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const backRef = useRef<HTMLElement | null>(null);
  const clearRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setEntries(topTen());
  }, []);

  useEffect(() => {
    const b = backRef.current;
    const c = clearRef.current;
    if (b) b.addEventListener('kid-click', () => setShowConfirm(true));
    if (c) c.addEventListener('kid-click', handleClear);
    return () => {
      if (b) b.removeEventListener('kid-click', () => setShowConfirm(true));
      if (c) c.removeEventListener('kid-click', handleClear);
    };
  }, []);

  const handleClear = () => {
    clearLeaderboard();
    setEntries([]);
  };

  return (
    <>
      <div className="leaderboard-screen">
        <h2 className="lb-title">🏆 Leaderboard</h2>

        {entries.length === 0 ? (
          <div className="lb-empty">No scores yet! Be the first to play! 🎮</div>
        ) : (
          <div className="lb-table-wrap">
            <table className="lb-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Level</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e, i) => (
                  <tr key={e.id} className={i < 3 ? `top-${i + 1}` : ''}>
                    <td className="lb-rank">
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                    </td>
                    <td className="lb-name">{e.playerName}</td>
                    <td className="lb-score">{e.score}/{e.total}</td>
                    <td className="lb-diff">{DIFF_LABELS[e.difficulty] ?? e.difficulty}</td>
                    <td className="lb-date">{e.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="lb-buttons">
          <kid-button ref={(el: HTMLElement | null) => { backRef.current = el; }} variant="primary">
            ← Back
          </kid-button>
          {entries.length > 0 && (
            <kid-button ref={(el: HTMLElement | null) => { clearRef.current = el; }} variant="danger">
              🗑️ Clear
            </kid-button>
          )}
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
