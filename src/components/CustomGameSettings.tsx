import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { GameSettings, DisplayMode, Operator } from '../types';
import { ConfirmModal } from './ConfirmModal';
import '../lit-components/index';

interface Props {
  onStart: (settings: GameSettings) => void;
  onBack: () => void;
}

export function CustomGameSettings({ onStart, onBack }: Props) {
  const { t } = useTranslation();
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(10);
  const [questionCount, setQuestionCount] = useState(10);
  const [mode, setMode] = useState<DisplayMode>('pictures');
  const [operators, setOperators] = useState<Operator[]>(['+']);
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const startRef = useRef<HTMLElement | null>(null);
  const backRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const s = startRef.current;
    const b = backRef.current;
    if (s) s.addEventListener('kid-click', handleStart);
    if (b) b.addEventListener('kid-click', () => setShowConfirm(true));
    return () => {
      if (s) s.removeEventListener('kid-click', handleStart);
      if (b) b.removeEventListener('kid-click', () => setShowConfirm(true));
    };
  }, [min, max, questionCount, mode, operators]);

  const toggleOperator = (op: Operator) => {
    setOperators(prev => {
      if (prev.includes(op)) {
        if (prev.length === 1) return prev;
        return prev.filter(o => o !== op);
      }
      return [...prev, op];
    });
  };

  const handleStart = () => {
    if (min < 1) { setError(t('errorMinOne')); return; }
    if (min > max) { setError(t('errorMinMax')); return; }
    if (questionCount < 1 || questionCount > 30) { setError(t('errorQuestions')); return; }
    setError('');
    onStart({ difficulty: 'custom', min, max, questionCount, mode, operators });
  };

  return (
    <>
      <div className="custom-screen">
        <h2 className="custom-title">{t('customTitle')}</h2>

        <div className="settings-form">
          <div className="setting-row">
            <label>{t('minNumber')}</label>
            <input type="number" min={1} max={max} value={min}
              onChange={e => setMin(Math.max(1, Number(e.target.value)))}
              className="setting-input" />
          </div>
          <div className="setting-row">
            <label>{t('maxNumber')}</label>
            <input type="number" min={min} max={999} value={max}
              onChange={e => setMax(Math.max(min, Number(e.target.value)))}
              className="setting-input" />
          </div>
          <div className="setting-row">
            <label>{t('questions')}</label>
            <input type="number" min={1} max={30} value={questionCount}
              onChange={e => setQuestionCount(Math.min(30, Math.max(1, Number(e.target.value))))}
              className="setting-input" />
          </div>
          <div className="setting-row">
            <label>{t('operators')}</label>
            <div className="mode-toggle">
              <button className={`mode-btn ${operators.includes('+') ? 'active' : ''}`}
                onClick={() => toggleOperator('+')}>{t('opAdd')}</button>
              <button className={`mode-btn ${operators.includes('-') ? 'active' : ''}`}
                onClick={() => toggleOperator('-')}>{t('opSub')}</button>
            </div>
          </div>
          <div className="setting-row">
            <label>{t('display')}</label>
            <div className="mode-toggle">
              <button className={`mode-btn ${mode === 'pictures' ? 'active' : ''}`}
                onClick={() => setMode('pictures')}>{t('displayPictures')}</button>
              <button className={`mode-btn ${mode === 'numbers' ? 'active' : ''}`}
                onClick={() => setMode('numbers')}>{t('displayNumbers')}</button>
            </div>
          </div>
        </div>

        {error && <div className="settings-error">{error}</div>}

        <div className="custom-buttons">
          <kid-button ref={(el: HTMLElement | null) => { startRef.current = el; }} variant="primary">
            {t('startGame')}
          </kid-button>
          <kid-button ref={(el: HTMLElement | null) => { backRef.current = el; }} variant="secondary">
            {t('back')}
          </kid-button>
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
