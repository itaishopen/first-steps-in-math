// Custom Lit Web Component type declarations for React JSX
declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      'animal-display': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        animal?: string;
        count?: number;
        mode?: 'pictures' | 'numbers';
        size?: 'sm' | 'md' | 'lg';
      };
      'answer-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        value?: number;
        animal?: string;
        mode?: 'pictures' | 'numbers';
        selected?: boolean;
        disabled?: boolean;
      };
      'drop-zone': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        active?: boolean;
        feedback?: 'idle' | 'correct' | 'wrong';
        label?: string;
      };
      'kid-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        variant?: 'primary' | 'secondary' | 'danger' | 'success';
        disabled?: boolean;
        label?: string;
      };
    }
  }
}
