import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "@polymer/paper-styles/typography.js";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/iron-icons/iron-icons.js";
import "cobalt-file-upload/cobalt-file-upload.js";
import "cobalt-popup/cobalt-popup.js";
import "cobalt-form/cobalt-form.js";
import "cobalt-select/cobalt-select.js";
import "./roster-container.js";
import _ from "lodash/lodash.js";
import { sleep,toast } from "cobalt-utils/cobalt-utils.js";
import generate from "/src/generator.js";
import generateRules from "../data/rules.js";
import specs from "../data/specs.js";
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
          box-sizing:border-box;
        }
        .sidelines,.bench{
          box-sizing:border-box;
          padding: 8px 20px 20px 20px;
        }
        .players .label{
          margin-left:20px;
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
        .players .buttons{
          margin-bottom:12px;
        }
        .buttons {
          @apply --layout-horizontal;
          @apply --layout-center;
          height:62px;
          min-height:62px;
          border-bottom:1px solid #222;
          background-color:#333;
        }
        .buttons>*{
          margin-left:8px;
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
          box-sizing:border-box;
        }
      </style>
      <div class="wrapper">
        <div class="left-panel">
          <div class="buttons">
            <paper-button on-tap="save">Save</paper-button>
            <paper-button on-tap="load">Load</paper-button>
            <paper-button on-tap="clear">clear</paper-button>
            <paper-button on-tap="reset">reset</paper-button>
            <paper-button on-tap="generate">Generate</paper-button>
            <paper-button on-tap="generateStep">Step</paper-button>
            <cobalt-file-upload on-file-changed="_import" accept="application/json" icon="file-upload"></cobalt-file-upload>
            <paper-input type="number" label="Rosters" value="{{numRaids}}"></paper-input>
            <paper-input type="number" label="Groups per" value="{{groupsPerRoster}}"></paper-input>
          </div>
          <div class="rosters">
            <template is="dom-repeat" items="[[rosters]]">
              <roster-container slots="{{item.slots}}" name="{{item.name}}" group-count="[[groupsPerRoster]]"></roster-container>
            </template>
          </div>
        </div>
        <div class="players">
          <div class="buttons">
            <paper-button on-tap="createPlayer">Add Player</paper-button>
          </div>
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
      <cobalt-popup id="player-popup">
        <template>
          <style>
            cobalt-select{
              color:black;
            }
            .delete{
              color:var(--paper-red-500);
            }
          </style>
          <cobalt-form>
            <paper-input label="Name" value="{{edit.player.name}}"></paper-input>
            <cobalt-select options="[[specs]]" bindings="[[specBindings]]" value="{{edit.player.spec}}"></cobalt-select>
          </cobalt-form>
          <div class="buttons">
            <paper-button on-tap="_acceptPlayerEdit">ACCEPT</paper-button>
            <paper-button dismiss>CANCEL</paper-button>
            <paper-button class="delete" on-tap="_deletePlayerEdit">DELETE</paper-button>
          </div>
        </template>
      </cobalt-popup>
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
      specs: {
        type: Array,
        value() {
          return _.clone(specs);
        },
      },
      ruleIndex:{
        type:Number,
        value:0,
      },
      specBindings:{
        type:Object,
        value:{label:"spec",value:"spec"},
      },
      edit: {
        type: Object,
        value:null,
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
      onPlayerEdit: {
        type: Function,
        value() {
          return ({ detail: {element,player} }) => {
            this.edit={player,element};
            this.shadowRoot.querySelector("#player-popup").show();
          };
        },
      },
    };
  }
  static get observers() {
    return ["_prepRosters(numRaids,groupsPerRoster)"];
  }
  createPlayer(){
    this.edit={player:{
      id:genId(),
      userid:genId(),
      spec:null,
      name:"",
    },path:"sidelines"};
    this.shadowRoot.querySelector("#player-popup").show();
  }
  _deletePlayerEdit(){
    const player=this.edit.player;
    let index = _.findIndex(this.sidelines, { id: player.id });
    if (index >= 0) {
      this.splice("sidelines", index, 1);
    }else{
      index = _.findIndex(this.bench, { id: player.id });
      if (index >= 0) {
        this.splice("bench", index, 1);
      }else{
        const rosters = this.shadowRoot.querySelectorAll("roster-container");
        for (const roster of rosters) {
          roster.removePlayer(player);
        }
      }
    }
    this.shadowRoot.querySelector("#player-popup").hide();
  }
  _acceptPlayerEdit(){
    const spec=_.find(this.specs,{spec:this.edit.player.spec});
    if(spec){
      const {class_emote,spec_emote,role_emote,class:klass} = spec;
      _.assign(this.edit.player,{class_emote,spec_emote,role_emote,class:klass});
    }
    const player=this.edit.player;
    const userid=this._findUserIdByName(player.name);
    if(userid){
      player.userid=userid;
    }
    if(this.edit.element){
      this.edit.element.player=player;
    }else if(this.edit.path){
      this.splice(this.edit.path,0,0,player);
    }
    this.shadowRoot.querySelector("#player-popup").hide();
  }
  _findUserIdByName(name){
    let player=_.find(this.sidelines,{name});
    if(player){
      return player.userid;
    }
    player=_.find(this.bench,{name});
    if(player){
      return player.userid;
    }
    for(const roster of this.rosters){
      for(const {player} of roster.slots){
        if(player?.name==name){
          return player?.userid;
        }
      }
    }
  }
  async _prepRosters(numRaids, groupsPerRoster) {
    numRaids=parseInt(numRaids);
    groupsPerRoster=parseInt(groupsPerRoster);
    if (numRaids && groupsPerRoster) {
      const rosters = _.cloneDeep(this.rosters);
      const numSlots = groupsPerRoster * 5;
      if (rosters.length > numRaids) {
        rosters.splice(numRaids, rosters.length - numRaids);
      } else if (rosters.length < numRaids) {
        const slots = [];
        for (let x = 0; x < numSlots; x++) {
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
      for(const roster of rosters){
        if(roster.slots.length<numSlots){
          for(let x=roster.slots.length;x<numSlots;x++){
            roster.slots.push({
              player: null,
            });
          }
        }else if(roster.slots.length>numSlots){
          roster.slots.splice(numSlots,roster.slots.length-numSlots);
        }
      }
      this.ruleIndex = 0;
      this.rosters = rosters;
    }
  }
  _resetRosters() {
    this.rosters = [];
    this._prepRosters(this.numRaids, this.groupsPerRoster);
    this.ruleIndex=0;
  }
  clear(){
    this.sidelines=[];
    this.bench=[];
    this._resetRosters();
  }
  reset(){
    const players=[];
    for(const roster of this.rosters){
      for(const slot of roster.slots){
        if(slot.player){
          players.push(slot.player);
        }
      }
    }
    this._resetRosters();
    this.sidelines=[...players,...this.sidelines];
  }
  save(){
    const {rosters,sidelines,bench,numRaids,groupsPerRoster,ruleIndex} = this;
    localStorage["roster-tool-data"]=JSON.stringify({rosters,sidelines,bench,numRaids,groupsPerRoster,ruleIndex});
  }
  load(){
    try{
      const {rosters,sidelines,bench,numRaids,groupsPerRoster} = JSON.parse(localStorage["roster-tool-data"]);
      _.assign(this,{rosters,sidelines,bench,numRaids,groupsPerRoster});
    }catch(e){
      toast({message:"Nothing to load"});
    }
  }
  _load(){
    try{
      const {rosters,sidelines,bench,numRaids,groupsPerRoster} = JSON.parse(localStorage["roster-tool-data"]);
      _.assign(this,{rosters,sidelines,bench,numRaids,groupsPerRoster});
    }catch(e){
      /* */
    }
  }
  generateStep(){
    const _players = _.clone(this.sidelines);
    const players = [];
    const ignore = ["Absence", "Bench", "Late"];
    for (const player of _players) {
      if (!ignore.includes(player.class)) {
        players.push(player);
      }
    }
    const rules=generateRules({
      size: this.groupsPerRoster * 5,
      count: this.numRaids,
      healers: 2,
      maxHealers: 2,
      mainTanks: 1,
      offTanks: 1,
    });
    const rule=[rules[this.ruleIndex]];
    const [sidelines, ...rosters] = generate(
      _.cloneDeep(this.rosters),
      players,
      rule,
    );
    this.rosters = rosters;
    this.sidelines = sidelines;
    this.ruleIndex++;
    if(this.ruleIndex>=rules.length){
      this.ruleIndex=0;
    }
    toast({message:`Finished step ${rule[0].name}`});
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
    this.addEventListener("player-edit", this.onPlayerEdit);
    this._load();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("player-drop", this.onPlayerDrop);
    this.removeEventListener("player-swap", this.onPlayerSwap);
    this.removeEventListener("player-edit", this.onPlayerEdit);
  }
}
customElements.define(RosterTool.is, RosterTool);
