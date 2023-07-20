import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-flex-layout/iron-flex-layout.js";
import specs from "../data/specs.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "@polymer/paper-styles/typography.js";
import "@polymer/paper-input/paper-input.js";
import "./roster-slot.js";
import "./roster-player.js";
import _ from "lodash/lodash.js";
import { toast, debounce } from "cobalt-utils/cobalt-utils.js";

class RosterContainer extends PolymerElement {
  static get is() {
    return "roster-container";
  }
  static get template() {
    return html`
      <style include="iron-positioning iron-flex iron-flex-alignment">
        :host {
          display: block;
          height: 320px;
        }
        roster-player,
        roster-slot {
          width: 200px;
          height: 50px;
          margin: 4px;
        }
        paper-input {
          margin-left: 6px;
          width: 200px;
          --paper-input-container-input-color: #ccc;
        }
        .slots {
          width: auto;
          height: 290px;
          @apply --layout-vertical;
          @apply --layout-wrap;
        }
        .slots[groups="1"] {
          width: calc(204px + 4px);
        }
        .slots[groups="2"] {
          width: calc(204px * 2 + 4px);
        }
        .slots[groups="3"] {
          width: calc(204px * 3 + 4px);
        }
        .slots[groups="4"] {
          width: calc(204px * 4 + 4px);
        }
        .slots[groups="5"] {
          width: calc(204px * 5 + 4px);
        }
        .slots[groups="6"] {
          width: calc(204px * 6 + 4px);
        }
        .slots[groups="7"] {
          width: calc(204px * 7 + 4px);
        }
        .slots[groups="8"] {
          width: calc(204px * 8 + 4px);
        }
      </style>
      <div class="header layout horizontal center">
        <div class="name flex">
          <paper-input value="{{name}}" no-label-float></paper-input>
        </div>
        <paper-icon-button icon="link" title="wowhead link" on-tap="_wowhead"></paper-icon-button>
      </div>
      <div class="slots" groups$="[[groupCount]]">
        <template is="dom-repeat" items="[[slots]]">
          <template is="dom-if" if="[[item.player]]">
            <roster-player player="{{item.player}}" on-player-changed="_change" player-id$="[[item.player.id]]" is-dual-box="[[_dualBoxCheck(item.player,slots,changes,slots.*,slots.splices)]]"></roster-player>
          </template>
          <template is="dom-if" if="[[!item.player]]">
            <roster-slot player="{{item.player}}" on-player-changed="_change"></roster-slot>
          </template>
        </template>
      </div>
    `;
  }
  static get properties() {
    return {
      name: {
        type: String,
        notify:true,
        value: "",
      },
      groupCount: {
        type: Number,
        value: 2,
      },
      slots: {
        type: Array,
        value() {
          return [];
        },
      },
      changes: {
        type: Number,
        value: 0,
      },
    };
  }
  async _change() {
    if (await debounce(this, "_change", 10)) {
      this.changes++;
    }
  }
  _dualBoxCheck(player, slots) {
    if (player && slots) {
      for (const slot of slots) {
        if (!_.isEqual(player,slot.player) && slot.player?.userid == player.userid) {
          return true;
        }
      }
    }
    return false;
  }
  async _wowhead() {
    let sp = "";
    let names = "";
    for (const { player } of this.slots) {
      if (player) {
        const spec = _.find(specs, { spec: player.spec });
        sp += spec.wowhead;
        names += `${player.name};`;
      } else {
        sp += "0";
        names += ";";
      }
    }
    try {
      await navigator.clipboard.writeText(`wowhead.com/wotlk/raid-composition#0${sp};${names}`);
      toast({ message: "link copied to clipboard" });
    } catch (err) {
      console.error(err);
    }
  }
  removePlayer({ id }) {
    const elem = this.shadowRoot.querySelector(`roster-player[player-id="${id}"]`);
    if (elem) {
      elem.player = null;
    }
  }
  swapPlayer({ id }, to) {
    const elem = this.shadowRoot.querySelector(`roster-player[player-id="${id}"]`);
    if (elem) {
      elem.player = to;
    }
  }
}
customElements.define(RosterContainer.is, RosterContainer);
