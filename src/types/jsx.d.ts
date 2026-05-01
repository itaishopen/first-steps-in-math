import type { AnimalType } from '../lit-components/animal-svgs';

type LitEventHandler<T = Event> = (e: T) => void;

interface LitElementProps {
  class?: string;
  id?: string;
  style?: string | Record<string, string>;
  ref?: React.Ref<unknown>;
  onAnimalDropped?: LitEventHandler<CustomEvent>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'animal-display': LitElementProps & {
        animal?: AnimalType;
        count?: number;
        mode?: 'pictures' | 'numbers';
        size?: 'sm' | 'md' | 'lg';
      };
      'answer-card': LitElementProps & {
        value?: number;
        animal?: AnimalType;
        mode?: 'pictures' | 'numbers';
        selected?: boolean;
        disabled?: boolean;
        onCardSelected?: LitEventHandler<CustomEvent<{ value: number }>>;
        onAnswerDropped?: LitEventHandler<CustomEvent<{ value: number }>>;
      };
      'drop-zone': LitElementProps & {
        active?: boolean;
        feedback?: 'idle' | 'correct' | 'wrong';
        onAnswerDropped?: LitEventHandler<CustomEvent<{ value: number }>>;
        onDropZoneTapped?: LitEventHandler<CustomEvent>;
      };
      'kid-button': LitElementProps & {
        variant?: 'primary' | 'secondary' | 'danger' | 'success';
        disabled?: boolean;
        label?: string;
        onKidClick?: LitEventHandler<CustomEvent>;
      };
    }
  }
}
