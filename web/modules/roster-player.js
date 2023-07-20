import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-styles/typography.js";
import { fire, sleep } from "cobalt-utils/cobalt-utils.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/iron-icons/iron-icons.js";
import _ from "lodash/lodash.js";

class Player extends PolymerElement {
  static get is() {
    return "roster-player";
  }
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          box-sizing: border-box;
          border-radius: 4px;
          border: 1px solid #000;
          @apply --layout-horizontal;
          @apply --layout-center;
          background-color: #333;
          color: #ccc;
          position: relative;
        }
        .icon {
          height: 40px;
          padding: 0 4px;
        }
        .icon img {
          width: 40px;
          height: 40px;
        }
        .name {
          margin: 0 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          @apply --layout-flex;
        }
        :host([is-dual-box]) {
          border-color: var(--paper-red-500);
        }
      </style>
      <div title$="[[player.spec]]" class="icon">
        <template is="dom-if" if="[[player]]" restamp>
          <img src$="/images/[[player.spec_emote]].png" />
        </template>
      </div>
      <div class="name">[[player.name]]</div>
      <paper-icon-button icon="create" on-tap="_edit"></paper-icon-button>
    `;
  }
  static get properties() {
    return {
      player: {
        type: Object,
        notify: true,
        value: null,
      },
      isDualBox: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
      },
      draggable: {
        type: String,
        value: "true",
        reflectToAttribute: true,
      },
      onDrag: {
        type: Function,
        value() {
          return (e) => {
            e.dataTransfer.setData("text/json", JSON.stringify(this.player));
          };
        },
      },
      onDrop: {
        type: Function,
        value() {
          return async (e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData("text/json");
            if (data) {
              const player = JSON.parse(data);
              if (player?.spec) {
                const current = this.player;
                fire(this, "player-swap", { from: player, to: current });
                await sleep(10);
                this.player = player;
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
  _edit(){
    fire(this,"player-edit",{player:_.clone(this.player),element:this});
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("dragstart", this.onDrag);
    this.addEventListener("dragover", this.onDragOver);
    this.addEventListener("drop", this.onDrop);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("dragstart", this.onDrag);
    this.removeEventListener("dragover", this.onDragOver);
    this.removeEventListener("drop", this.onDrop);
  }
}
customElements.define(Player.is, Player);
