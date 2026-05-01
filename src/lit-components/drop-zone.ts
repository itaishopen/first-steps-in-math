import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type FeedbackState = 'idle' | 'correct' | 'wrong';

@customElement('drop-zone')
export class DropZone extends LitElement {
  @property({ type: Boolean }) active = false;
  @property({ type: String }) feedback: FeedbackState = 'idle';

  static styles = css`
    :host {
      display: block;
    }
    .zone {
      min-width: 120px;
      min-height: 120px;
      border-radius: 24px;
      border: 4px dashed #a78bfa;
      background: #f5f3ff;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      font-family: 'Comic Sans MS', 'Chalkboard SE', cursive, sans-serif;
    }
    .zone.active {
      border-color: #7c3aed;
      background: #ede9fe;
      transform: scale(1.05);
      box-shadow: 0 0 0 6px #a78bfa44;
    }
    .zone.correct {
      border-color: #22c55e;
      background: #dcfce7;
      animation: correctPop 0.5s ease;
    }
    .zone.wrong {
      border-color: #ef4444;
      background: #fee2e2;
      animation: wrongShake 0.4s ease;
    }
    .label {
      color: #a78bfa;
      font-size: 1em;
      font-weight: 700;
      text-align: center;
      padding: 8px;
    }
    .zone.correct .label { color: #16a34a; }
    .zone.wrong .label { color: #dc2626; }
    .emoji {
      font-size: 2.5em;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      animation: popIn 0.3s ease;
    }
    @keyframes correctPop {
      0% { transform: scale(1); }
      50% { transform: scale(1.12); }
      100% { transform: scale(1); }
    }
    @keyframes wrongShake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }
    @keyframes popIn {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
      60% { transform: translate(-50%, -50%) scale(1.3); }
      100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    .stars {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .star {
      position: absolute;
      animation: starFly 0.8s ease forwards;
      font-size: 1.2em;
    }
    @keyframes starFly {
      0% { opacity: 1; transform: scale(1) translate(0,0); }
      100% { opacity: 0; transform: scale(0.5) translate(var(--dx), var(--dy)); }
    }
  `;

  private onPointerUp(e: PointerEvent) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('drop-zone-tapped', {
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const feedbackEmoji =
      this.feedback === 'correct' ? '⭐' :
      this.feedback === 'wrong' ? '💫' : null;

    return html`
      <div
        class="zone ${this.active ? 'active' : ''} ${this.feedback}"
        @pointerup=${this.onPointerUp}
      >
        ${this.feedback === 'idle'
          ? html`<span class="label">Drop<br/>here!</span>`
          : feedbackEmoji
          ? html`<span class="emoji">${feedbackEmoji}</span>`
          : html``
        }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'drop-zone': DropZone;
  }
}
