import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

@customElement('kid-button')
export class KidButton extends LitElement {
  @property({ type: String }) variant: ButtonVariant = 'primary';
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) label = '';

  static styles = css`
    :host { display: inline-block; }
    button {
      font-family: 'Comic Sans MS', 'Chalkboard SE', cursive, sans-serif;
      font-size: 1.1em;
      font-weight: 800;
      padding: 14px 28px;
      border: none;
      border-radius: 999px;
      cursor: pointer;
      transition: transform 0.1s, box-shadow 0.1s;
      box-shadow: 0 6px 0 rgba(0,0,0,0.15);
      letter-spacing: 0.5px;
      outline: none;
      min-width: 120px;
    }
    button:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow: 0 9px 0 rgba(0,0,0,0.15);
    }
    button:active:not(:disabled) {
      transform: translateY(3px);
      box-shadow: 0 3px 0 rgba(0,0,0,0.15);
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    button.primary {
      background: linear-gradient(135deg, #7c3aed, #a78bfa);
      color: #fff;
    }
    button.secondary {
      background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
      color: #374151;
    }
    button.danger {
      background: linear-gradient(135deg, #ef4444, #f87171);
      color: #fff;
    }
    button.success {
      background: linear-gradient(135deg, #22c55e, #4ade80);
      color: #fff;
    }
  `;

  private handleClick(e: MouseEvent) {
    if (this.disabled) { e.stopPropagation(); return; }
    this.dispatchEvent(new CustomEvent('kid-click', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <button
        class=${this.variant}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <slot>${this.label}</slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kid-button': KidButton;
  }
}
