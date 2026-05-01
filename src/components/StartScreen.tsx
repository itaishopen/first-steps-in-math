import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { Difficulty } from '../types';
import '../lit-components/index';

interface Props {
  onPlay: (difficulty: Difficulty) => void;
  onCustom: () => void;
  onLeaderboard: () => void;
}

export function StartScreen({ onPlay, onCustom, onLeaderboard }: Props) {
  const { t } = useTranslation();
  const btnRefs = useRef<(HTMLElement | null)[]>([]);
  const customRef = useRef<HTMLElement | null>(null);
  const lbRef = useRef<HTMLElement | null>(null);

  const difficulties: { key: Difficulty; labelKey: string; descKey: string; emoji: string; color: string }[] = [
    { key: 'easy', labelKey: 'diffEasyLabel', descKey: 'diffEasyDesc', emoji: '🐱', color: '#bbf7d0' },
    { key: 'medium', labelKey: 'diffMediumLabel', descKey: 'diffMediumDesc', emoji: '🐘', color: '#bfdbfe' },
    { key: 'hard', labelKey: 'diffHardLabel', descKey: 'diffHardDesc', emoji: '🦁', color: '#fde68a' },
  ];

  useEffect(() => {
    difficulties.forEach((d, i) => {
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
        <h1 className="game-title">{t('gameTitle')}</h1>
        <p className="game-subtitle">{t('gameSubtitle')}</p>
      </div>

      <div className="difficulty-grid">
        {difficulties.map((d, i) => (
          <div key={d.key} className="difficulty-card" style={{ background: d.color }}>
            <div className="diff-emoji">{d.emoji}</div>
            <div className="diff-label">{t(d.labelKey)}</div>
            <div className="diff-desc">{t(d.descKey)}</div>
            <kid-button
              ref={(el: HTMLElement | null) => { btnRefs.current[i] = el; }}
              variant="primary"
            >
              {t('play')}
            </kid-button>
          </div>
        ))}
      </div>

      <div className="extra-buttons">
        <kid-button
          ref={(el: HTMLElement | null) => { customRef.current = el; }}
          variant="secondary"
        >
          {t('customGame')}
        </kid-button>
        <kid-button
          ref={(el: HTMLElement | null) => { lbRef.current = el; }}
          variant="secondary"
        >
          {t('leaderboard')}
        </kid-button>
      </div>
    </div>
  );
}
