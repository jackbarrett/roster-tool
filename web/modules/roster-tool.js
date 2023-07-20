import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "@polymer/paper-styles/typography.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/iron-icons/iron-icons.js";
import "cobalt-file-upload/cobalt-file-upload.js";
import "./roster-container.js";
import _ from "lodash/lodash.js";
import { sleep } from "cobalt-utils/cobalt-utils.js";
import generate from "/src/generator.js";
import generateRules from "../data/rules.js";
let _id = Date.now();
function genId() {
  _id++;
  return _id;
}
class RosterTool extends PolymerElement {
  static get is() {
    return "roster-tool";
  }
  static get template() {
    return html`
      <style include="iron-positioning iron-flex iron-flex-alignment">
        :host{
          display:block;
          position:relative;
          width:100%;
          height:100%;
        }
        roster-container {
          margin: 0 0 20px 20px;
        }
        .players {
          width: 500px;
          background-color: #666;
          @apply --layout-vertical;
          overflow:auto;
          height:100%;
          padding:20px;
        }
        roster-player,
        roster-slot {
          width: 200px;
          height: 50px;
          margin: 4px;
        }
        paper-button {
          font-size: 14px;
          background-color: #222;
          color: #ddd;
          margin-left: 8px;
        }
        .buttons {
          padding: 12px 0;
          border-bottom:1px solid #222;
          background-color:#333;
        }
        .wrapper{
          position:relative;
          width:100%;
          height:100%;
          @apply --layout-horizontal;
        }
        .left-panel{
          @apply --layout-vertical;
          @apply --layout-flex;
        }
        .rosters{
          @apply --layout-horizontal;
          @apply --layout-wrap;
          overflow:auto;
          max-height:100%;
        }
      </style>
      <div class="wrapper">
        <div class="left-panel">
          <div class="layout horizontal buttons">
            <paper-button on-tap="generate">Generate</paper-button>
            <cobalt-file-upload on-file-changed="_import" accept="application/json" icon="file-upload"></cobalt-file-uploaad>
          </div>
          <div class="rosters">
            <template is="dom-repeat" items="[[rosters]]">
              <roster-container slots="{{item.slots}}" name="{{item.name}}" group-count="[[groupsPerRoster]]"></roster-container>
            </template>
          </div>
        </div>
        <div class="players">
          <div class="label">Sidelines</div>
          <div class="layout horizontal wrap sidelines">
            <roster-slot on-player-drop="_sidelinePlayerTop"></roster-slot>
            <template is="dom-repeat" items="[[sidelines]]">
              <roster-player player="{{item}}"></roster-player>
            </template>
            <roster-slot on-player-drop="_sidelinePlayer"></roster-slot>
          </div>
          <div class="label">Bench</div>
          <div class="layout vertical bench">
            <template is="dom-repeat" items="[[bench]]">
              <roster-player player="{{item}}"></roster-player>
            </template>
            <roster-slot on-player-drop="_benchPlayer"></roster-slot>
          </div>
        </div>
      </div>
    `;
  }
  static get properties() {
    return {
      groupsPerRoster: {
        type: Number,
        value: 2,
      },
      numRaids: {
        type: Number,
        value: 5,
      },
      sidelines: {
        type: Array,
        value() {
          return [];
        },
      },
      bench: {
        type: Array,
        value() {
          return [];
        },
      },
      rosters: {
        type: Array,
        value() {
          return [];
        },
      },
      onPlayerDrop: {
        type: Function,
        value() {
          return ({ detail: player }) => {
            let index = _.findIndex(this.sidelines, { id: player.id });
            if (index >= 0) {
              this.splice("sidelines", index, 1);
              return;
            }
            index = _.findIndex(this.bench, { id: player.id });
            if (index >= 0) {
              this.splice("bench", index, 1);
              return;
            }
            const rosters = this.shadowRoot.querySelectorAll("roster-container");
            for (const roster of rosters) {
              roster.removePlayer(player);
            }
          };
        },
      },
      onPlayerSwap: {
        type: Function,
        value() {
          return ({ detail: { from, to } }) => {
            let index = _.findIndex(this.sidelines, { id: from.id });
            if (index >= 0) {
              this.set(`sidelines.${index}`, to);
              return;
            }
            index = _.findIndex(this.bench, { id: from.id });
            if (index >= 0) {
              this.set(`bench.${index}`, to);
              return;
            }
            const rosters = this.shadowRoot.querySelectorAll("roster-container");
            for (const roster of rosters) {
              roster.swapPlayer(from, to);
            }
          };
        },
      },
    };
  }
  static get observers() {
    return ["_prepRosters(numRaids,groupsPerRoster)"];
  }
  _prepRosters(numRaids, groupsPerRoster) {
    if (numRaids && groupsPerRoster) {
      const rosters = _.clone(this.rosters);
      if (rosters.length > numRaids) {
        rosters.splice(numRaids, rosters.length - numRaids);
      } else if (rosters.length < numRaids) {
        const slots = [];
        for (let x = 0; x < groupsPerRoster * 5; x++) {
          slots.push({
            player: null,
          });
        }
        for (let x = rosters.length; x < numRaids; x++) {
          rosters.push({
            name: `Group ${x + 1}`,
            slots: _.cloneDeep(slots),
          });
        }
      }
      this.rosters = rosters;
    }
  }
  _resetRosters() {
    this.rosters = [];
    this._prepRosters(this.numRaids, this.groupsPerRoster);
  }
  generate() {
    const _players = _.clone(this.sidelines);
    const players = [];
    const ignore = ["Absence", "Bench", "Late"];
    for (const player of _players) {
      if (!ignore.includes(player.class)) {
        players.push(player);
      }
    }
    const [sidelines, ...rosters] = generate(
      _.cloneDeep(this.rosters),
      players,
      generateRules({
        size: this.groupsPerRoster * 5,
        count: this.numRaids,
        healers: 2,
        maxHealers: 2,
        mainTanks: 1,
        offTanks: 1,
      }),
    );
    this.rosters = rosters;
    this.sidelines = sidelines;
  }
  _import(e, { value }) {
    const data = JSON.parse(new TextDecoder().decode(value.data));
    const signups = data.signups;
    for (const signup of signups) {
      signup.id = genId();
    }
    this._resetRosters();
    this.bench = [];
    this.sidelines = signups;
  }
  async _benchPlayer(e, player) {
    //sleep so player gets removed first
    await sleep(10);
    this.push("bench", player);
  }
  async _sidelinePlayerTop(e, player) {
    //sleep so player gets removed first
    await sleep(10);
    this.splice("sidelines", 0, 0, player);
  }
  async _sidelinePlayer(e, player) {
    //sleep so player gets removed first
    await sleep(10);
    this.push("sidelines", player);
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("player-drop", this.onPlayerDrop);
    this.addEventListener("player-swap", this.onPlayerSwap);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("player-drop", this.onPlayerDrop);
    this.removeEventListener("player-swap", this.onPlayerSwap);
  }
}
customElements.define(RosterTool.is, RosterTool);
