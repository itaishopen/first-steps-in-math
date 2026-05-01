import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getAnimalSvg, type AnimalType } from './animal-svgs';

@customElement('animal-display')
export class AnimalDisplay extends LitElement {
  @property({ type: String }) animal: AnimalType = 'cat';
  @property({ type: Number }) count = 1;
  @property({ type: String }) mode: 'pictures' | 'numbers' = 'pictures';
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 2px;
    }
    .animal-svg {
      display: inline-block;
    }
    .animal-svg.xs { width: 20px; height: 20px; }
    .animal-svg.sm { width: 32px; height: 32px; }
    .animal-svg.md { width: 48px; height: 48px; }
    .animal-svg.lg { width: 64px; height: 64px; }
    .number-display {
      font-size: 2.5em;
      font-weight: 900;
      color: #4f46e5;
      font-family: 'Comic Sans MS', 'Chalkboard SE', cursive, sans-serif;
    }
  `;

  render() {
    if (this.mode === 'numbers') {
      return html`<span class="number-display">${this.count}</span>`;
    }

    const svgSize =
      this.count <= 6 ? (this.size ?? 'md') :
      this.count <= 15 ? 'sm' :
      'xs';

    return html`
      <div class="container">
        ${Array.from({ length: this.count }, () =>
          html`<span class="animal-svg ${svgSize}">${unsafeHTML(getAnimalSvg(this.animal))}</span>`
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'animal-display': AnimalDisplay;
  }
}
