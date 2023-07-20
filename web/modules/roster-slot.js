import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "@polymer/paper-styles/typography.js";
import { fire } from "cobalt-utils/cobalt-utils.js";

class RosterSlot extends PolymerElement {
  static get is() {
    return "roster-slot";
  }
  static get template() {
    return html`
      <style include="iron-positioning iron-flex iron-flex-alignment">
        :host {
          display: block;
          box-sizing: border-box;
          border-radius: 4px;
          border: 1px solid #000;
        }
      </style>
    `;
  }
  static get properties() {
    return {
      player: {
        type: Object,
        notify: true,
        value: null,
      },
      onDrop: {
        type: Function,
        value() {
          return (e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData("text/json");
            if (data) {
              const player = JSON.parse(data);
              if (player?.spec) {
                this.player = player;
                fire(this, "player-drop", player);
              }
            }
          };
        },
      },
      onDragOver: {
        type: Function,
        value() {
          return (e) => {
            e.preventDefault();
          };
        },
      },
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("dragover", this.onDragOver);
    this.addEventListener("drop", this.onDrop);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("dragover", this.onDragOver);
    this.removeEventListener("drop", this.onDrop);
  }
}
customElements.define(RosterSlot.is, RosterSlot);
