import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { topTen, clearLeaderboard } from '../utils/storage';
import type { LeaderboardEntry } from '../types';
import { ConfirmModal } from './ConfirmModal';
import '../lit-components/index';

interface Props {
  onBack: () => void;
}

export function Leaderboard({ onBack }: Props) {
  const { t } = useTranslation();
  const diffLabels: Record<string, string> = {
    easy: t('diffLabelEasy'),
    medium: t('diffLabelMedium'),
    hard: t('diffLabelHard'),
    custom: t('diffLabelCustom'),
  };
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
        <h2 className="lb-title">{t('leaderboardTitle')}</h2>

        {entries.length === 0 ? (
          <div className="lb-empty">{t('noScores')}</div>
        ) : (
          <div className="lb-table-wrap">
            <table className="lb-table">
              <thead>
                <tr>
                  <th>{t('colRank')}</th>
                  <th>{t('colName')}</th>
                  <th>{t('colScore')}</th>
                  <th>{t('colLevel')}</th>
                  <th>{t('colDate')}</th>
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
                    <td className="lb-diff">{diffLabels[e.difficulty] ?? e.difficulty}</td>
                    <td className="lb-date">{e.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="lb-buttons">
          <kid-button ref={(el: HTMLElement | null) => { backRef.current = el; }} variant="primary">
            {t('back')}
          </kid-button>
          {entries.length > 0 && (
            <kid-button ref={(el: HTMLElement | null) => { clearRef.current = el; }} variant="danger">
              {t('clearScores')}
            </kid-button>
          )}
        </div>
      </div>

      {showConfirm && (
        <ConfirmModal
          message={t('backToMenu')}
          onConfirm={onBack}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}
