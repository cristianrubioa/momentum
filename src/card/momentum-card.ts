import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

interface MomentumCardConfig {
  entity: string;
  title?: string;
}

interface HassEntity {
  state: string;
  attributes: Record<string, string | number>;
}

interface Hass {
  states: Record<string, HassEntity>;
}

@customElement("momentum-card")
export class MomentumCard extends LitElement {
  @property({ attribute: false }) hass?: Hass;
  @state() private _config?: MomentumCardConfig;
  @state() private _svgContent = "";
  @state() private _svgUrl = "";

  static styles = css`
    :host {
      display: block;
    }
    ha-card {
      overflow: hidden;
    }
    .card-content {
      padding: 0;
    }
    .sky-map {
      width: 100%;
      display: block;
      aspect-ratio: 1;
      background: #0a0a1a;
      overflow: hidden;
    }
    .sky-map svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    .placeholder {
      width: 100%;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0a0a1a;
      color: #555;
      font-size: 0.9rem;
    }
    .info {
      padding: 12px 16px;
    }
    .memento-name {
      font-size: 0.85rem;
      color: var(--secondary-text-color);
      margin-bottom: 4px;
    }
    .elapsed {
      font-size: 1.1rem;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .elapsed.unavailable {
      color: var(--disabled-text-color);
    }
  `;

  setConfig(config: MomentumCardConfig): void {
    if (!config.entity) {
      throw new Error("momentum-card: 'entity' is required");
    }
    this._config = config;
  }

  getCardSize(): number {
    return 3;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("momentum-card-editor");
  }

  static getStubConfig(): MomentumCardConfig {
    return { entity: "sensor.momentum_example" };
  }

  updated(_changedProps: Map<string, unknown>) {
    const url = this._imageUrl;
    console.log("[momentum-card] updated — imageUrl:", url, "svgUrl:", this._svgUrl);
    if (url && url !== this._svgUrl) {
      this._svgUrl = url;
      this._fetchSvg(url);
    }
  }

  private async _fetchSvg(url: string): Promise<void> {
    console.log("[momentum-card] fetching:", url);
    try {
      const resp = await fetch(url);
      console.log("[momentum-card] response:", resp.status, resp.ok);
      const text = resp.ok ? await resp.text() : "";
      console.log("[momentum-card] content length:", text.length);
      this._svgContent = text;
    } catch (e) {
      console.error("[momentum-card] fetch error:", e);
      this._svgContent = "";
    }
  }

  private get _entity(): HassEntity | undefined {
    if (!this.hass || !this._config) return undefined;
    return this.hass.states[this._config.entity];
  }

  private get _imageUrl(): string {
    return (this._entity?.attributes?.image_url as string) ?? "";
  }

  private get _name(): string {
    if (this._config?.title) return this._config.title;
    return (this._entity?.attributes?.name as string) ?? "Memento";
  }

  private get _elapsed(): string | null {
    const entity = this._entity;
    if (!entity || entity.state === "unavailable" || entity.state === "unknown") {
      return null;
    }
    return entity.state;
  }

  render() {
    if (!this._config) return nothing;

    return html`
      <ha-card>
        <div class="card-content">
          ${!this._svgContent
            ? html`<div class="placeholder">Sky map unavailable</div>`
            : html`<div class="sky-map">${unsafeHTML(this._svgContent)}</div>`}
          <div class="info">
            <div class="memento-name">${this._name}</div>
            <div class="elapsed ${this._elapsed === null ? "unavailable" : ""}">
              ${this._elapsed ?? "—"}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
}

// Card editor (minimal — supports visual picker registration)
@customElement("momentum-card-editor")
export class MomentumCardEditor extends LitElement {
  @property({ attribute: false }) hass?: Hass;
  @state() private _config?: MomentumCardConfig;

  setConfig(config: MomentumCardConfig): void {
    this._config = config;
  }

  render() {
    if (!this._config) return nothing;
    return html`
      <div>
        <label>Entity ID: <input type="text" .value=${this._config.entity} /></label>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "momentum-card": MomentumCard;
    "momentum-card-editor": MomentumCardEditor;
  }
}
