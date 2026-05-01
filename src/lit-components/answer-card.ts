import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getAnimalSvg, type AnimalType } from './animal-svgs';
import './animal-display';

@customElement('answer-card')
export class AnswerCard extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: String }) animal: AnimalType = 'cat';
  @property({ type: String }) mode: 'pictures' | 'numbers' = 'pictures';
  @property({ type: Boolean }) selected = false;
  @property({ type: Boolean }) disabled = false;

  @state() private dragging = false;
  @state() private pointerDown = false;

  private pointerId: number | null = null;
  private startX = 0;
  private startY = 0;
  private clone: HTMLElement | null = null;

  static styles = css`
    :host {
      display: block;
      user-select: none;
      -webkit-user-select: none;
      touch-action: none;
    }
    .card {
      background: #fff;
      border: 4px solid #e0e7ff;
      border-radius: 20px;
      padding: 12px;
      width: 100%;
      height: 100%;
      min-height: 90px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: grab;
      transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      position: relative;
      font-family: 'Comic Sans MS', 'Chalkboard SE', cursive, sans-serif;
    }
    .card:hover {
      transform: translateY(-4px) scale(1.04);
      box-shadow: 0 8px 24px rgba(124,58,237,0.2);
      border-color: #a78bfa;
    }
    .card.selected {
      border-color: #7c3aed;
      box-shadow: 0 0 0 4px #a78bfa88, 0 8px 24px rgba(124,58,237,0.3);
      transform: scale(1.06);
    }
    .card.dragging {
      opacity: 0.3;
      transform: scale(0.95);
    }
    .card.disabled {
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    }
    .value-label {
      font-size: 1.1em;
      font-weight: 800;
      color: #4f46e5;
    }
    animal-display {
      pointer-events: none;
    }
  `;

  private onPointerDown(e: PointerEvent) {
    if (this.disabled) return;
    e.preventDefault();
    this.pointerId = e.pointerId;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.pointerDown = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  private onPointerMove(e: PointerEvent) {
    if (!this.pointerDown || e.pointerId !== this.pointerId) return;
    const dx = e.clientX - this.startX;
    const dy = e.clientY - this.startY;
    if (!this.dragging && Math.sqrt(dx * dx + dy * dy) > 8) {
      this.dragging = true;
      this.createClone(e.clientX, e.clientY);
    }
    if (this.dragging && this.clone) {
      this.clone.style.left = `${e.clientX}px`;
      this.clone.style.top = `${e.clientY}px`;
    }
  }

  private onPointerUp(e: PointerEvent) {
    if (e.pointerId !== this.pointerId) return;
    if (this.dragging) {
      this.dragging = false;
      const target = document.elementFromPoint(e.clientX, e.clientY);
      this.destroyClone();
      if (target) {
        const dropZone = target.closest('drop-zone') as HTMLElement | null;
        if (dropZone) {
          dropZone.dispatchEvent(new CustomEvent('answer-dropped', {
            bubbles: true,
            composed: true,
            detail: { value: this.value },
          }));
        }
      }
    } else if (this.pointerDown) {
      // Tap/click selection
      this.dispatchEvent(new CustomEvent('card-selected', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      }));
    }
    this.pointerDown = false;
    this.pointerId = null;
  }

  private createClone(x: number, y: number) {
    const el = this.shadowRoot?.querySelector('.card') as HTMLElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const clone = el.cloneNode(true) as HTMLElement;
    clone.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%) scale(1.1) rotate(3deg);
      transition: none;
      opacity: 0.95;
      box-shadow: 0 16px 40px rgba(0,0,0,0.25);
      border-radius: 20px;
      background: #fff;
      border: 4px solid #7c3aed;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    document.body.appendChild(clone);
    this.clone = clone;
  }

  private destroyClone() {
    this.clone?.remove();
    this.clone = null;
  }

  render() {
    // Show up to 10 animals inline; beyond that show a grouped display with a plain number label
    const MAX_INLINE = 10;
    return html`
      <div
        class="card ${this.selected ? 'selected' : ''} ${this.dragging ? 'dragging' : ''} ${this.disabled ? 'disabled' : ''}"
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerUp}
      >
        <animal-display
          .animal=${this.animal}
          .count=${this.value}
          .mode=${this.mode}
          size="sm"
        ></animal-display>
        ${this.mode === 'pictures'
          ? html`<span class="value-label">${this.value}</span>`
          : html``
        }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'answer-card': AnswerCard;
  }
}
