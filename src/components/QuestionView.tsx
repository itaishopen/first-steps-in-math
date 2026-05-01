import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { Question, FeedbackState } from '../types';
import '../lit-components/index';

interface Props {
  question: Question;
  onAnswer: (value: number) => void;
  feedback: FeedbackState;
}

export function QuestionView({ question, onAnswer, feedback }: Props) {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const dropZoneRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Map<number, HTMLElement>>(new Map());

  useEffect(() => {
    setSelectedValue(null);
  }, [question.id]);

  useEffect(() => {
    const el = dropZoneRef.current;
    if (!el) return;

    const onDropped = (e: Event) => {
      const detail = (e as CustomEvent<{ value: number }>).detail;
      onAnswer(detail.value);
      setSelectedValue(null);
    };
    const onTapped = () => {
      if (selectedValue !== null) {
        onAnswer(selectedValue);
        setSelectedValue(null);
      }
    };

    el.addEventListener('answer-dropped', onDropped);
    el.addEventListener('drop-zone-tapped', onTapped);
    return () => {
      el.removeEventListener('answer-dropped', onDropped);
      el.removeEventListener('drop-zone-tapped', onTapped);
    };
  }, [selectedValue, onAnswer]);

  useEffect(() => {
    const handlers: [HTMLElement, (e: Event) => void][] = [];
    cardRefs.current.forEach((el, value) => {
      const handler = () => setSelectedValue(prev => prev === value ? null : value);
      el.addEventListener('card-selected', handler);
      handlers.push([el, handler]);
    });
    return () => {
      handlers.forEach(([el, h]) => el.removeEventListener('card-selected', h));
    };
  }, [question.id]);

  const setCardRef = useCallback((value: number) => (el: HTMLElement | null) => {
    if (el) cardRefs.current.set(value, el);
    else cardRefs.current.delete(value);
  }, []);

  const { a, b, operator, animal, mode, choices } = question;
  const questionSize = mode === 'pictures' && (a > 5 || b > 5) ? 'sm' : 'md';

  return (
    <div className="question-view">
      <div className="math-question" dir="ltr">
        <div className="q-group">
          <animal-display animal={animal} count={a} mode={mode} size={questionSize} />
          {mode === 'pictures' && <div className="q-count">{a}</div>}
        </div>

        <div className="q-operator">{operator}</div>

        <div className="q-group">
          <animal-display animal={animal} count={b} mode={mode} size={questionSize} />
          {mode === 'pictures' && <div className="q-count">{b}</div>}
        </div>

        <div className="q-operator">=</div>

        <drop-zone
          ref={(el: HTMLElement | null) => { dropZoneRef.current = el; }}
          active={selectedValue !== null}
          feedback={feedback}
          label={t('dropHere')}
        />
      </div>

      {feedback === 'correct' && (
        <div className="feedback-msg correct">
          <span className="feedback-big">{t('feedbackCorrect')}</span>
        </div>
      )}
      {feedback === 'wrong' && (
        <div className="feedback-msg wrong">
          <span className="feedback-big">{t('feedbackWrong')}</span>
        </div>
      )}

      <div className="answer-cards">
        {choices.map((choice) => (
          <answer-card
            key={choice}
            ref={setCardRef(choice)}
            value={choice}
            animal={animal}
            mode={mode}
            selected={selectedValue === choice}
            disabled={feedback === 'correct'}
          />
        ))}
      </div>

      {selectedValue !== null && feedback === 'idle' && (
        <p className="tap-hint">{t('tapHint')}</p>
      )}
    </div>
  );
}
