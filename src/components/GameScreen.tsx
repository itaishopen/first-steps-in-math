import { useState, useCallback } from 'react';
import type { GameSettings, Question, FeedbackState } from '../types';
import { generateQuestions } from '../utils/game';
import { playSuccess, playFail, playFinish, unlockAudio } from '../utils/sounds';
import { QuestionView } from './QuestionView';
import { ConfirmModal } from './ConfirmModal';
import '../lit-components/index';

interface Props {
  settings: GameSettings;
  onGameEnd: (score: number, total: number) => void;
  onBack: () => void;
}

export function GameScreen({ settings, onGameEnd, onBack }: Props) {
  const [questions] = useState<Question[]>(() => generateQuestions(settings));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackState>('idle');
  const [showConfirm, setShowConfirm] = useState(false);

  const currentQuestion = questions[currentIndex];
  const total = questions.length;

  const handleAnswer = useCallback((value: number) => {
    if (feedback !== 'idle') return;
    unlockAudio();

    if (value === currentQuestion.answer) {
      playSuccess();
      setFeedback('correct');
      const newScore = score + 1;
      setScore(newScore);
      setTimeout(() => {
        setFeedback('idle');
        if (currentIndex + 1 >= total) {
          playFinish();
          onGameEnd(newScore, total);
        } else {
          setCurrentIndex(i => i + 1);
        }
      }, 1200);
    } else {
      playFail();
      setFeedback('wrong');
      setTimeout(() => setFeedback('idle'), 900);
    }
  }, [feedback, currentQuestion, currentIndex, total, score, onGameEnd]);

  const progress = (currentIndex / total) * 100;

  return (
    <>
      <div className="game-screen">
        <div className="game-header">
          <div className="score-display">
            <span className="score-label">Score</span>
            <span className="score-value">{score} / {total}</span>
          </div>
          <div className="question-counter">
            Question {currentIndex + 1} of {total}
          </div>
          <button className="back-btn" onClick={() => setShowConfirm(true)}>
            ✕ Quit
          </button>
        </div>

        <div className="progress-bar-wrap">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>

        <QuestionView
          question={currentQuestion}
          onAnswer={handleAnswer}
          feedback={feedback}
        />
      </div>

      {showConfirm && (
        <ConfirmModal
          message="Are you sure you want to quit? Your progress will be lost! 😢"
          onConfirm={onBack}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}
