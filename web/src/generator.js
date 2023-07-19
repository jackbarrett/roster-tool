import signups from "../data/signups.js";
import rules from "../data/rules.js";
import config from "../data/config.js";
import specs from "../data/specs.js";
import _ from "lodash";
function logProgress(groups) {
  console.log(
    groups.map(({ players }) => {
      return players.length;
    }),
  );
}
function getAllMatches(rule, players) {
  const matches = [];
  for (const selector of rule.selectors) {
    const bucket = [];
    matches.push(bucket);
    for (const player of players) {
      if (!selector.class || player.class == selector.class) {
        if (!selector.spec || player.spec == selector.spec) {
          bucket.push(player);
        }
      }
    }
  }
  return matches;
}
function getFirstMatch(rule, players) {
  for (const selector of rule.selectors) {
    for (const player of players) {
      if (!selector.class || player.class == selector.class) {
        if (!selector.spec || player.spec == selector.spec) {
          return player;
        }
      }
    }
  }
  return null;
}
function playerMatchesRule(rule, player) {
  for (const selector of rule.selectors) {
    if (!selector.class || player.class == selector.class) {
      if (!selector.spec || player.spec == selector.spec) {
        return true;
      }
    }
  }
  return false;
}
function playerIsInGroup(group, player) {
  for (const p of group.players) {
    if (p.userid == player.userid) {
      return true;
    }
  }
  return false;
}
function countMatches(rule, players) {
  const matches = getAllMatches(rule, players);
  let count = 0;
  for (const bucket of matches) {
    count += bucket.length;
  }
  return count;
}
//this is greedy and slow but idc
function generate() {
  const groups = [];
  const sidelines = [];
  const ignore = ["Absence", "Bench", "Late"];
  for (const player of signups) {
    if (!ignore.includes(player.class)) {
      sidelines.push(player);
    }
  }
  for (let x = 0; x < config.count; x++) {
    groups.push({ name: `Group ${x + 1}`, players: [] });
  }
  const checkMax = [];
  for (const rule of rules) {
    if (rule.max) {
      checkMax.push(rule);
    }
  }
  for (const rule of rules) {
    console.log(`Rule: ${rule.name}`);
    const pending = [];
    for (const group of groups) {
      const count = countMatches(rule, group.players);
      if (count < rule.count) {
        pending.push({ group, count, notFound: 0 });
      }
    }
    const buckets = getAllMatches(rule, sidelines);
    let at = 0;
    for (let x = 0; x < buckets.length; x++) {
      const bucket = buckets[x];
      //TODO random order for fairness
      for (at; at < pending.length; at) {
        const item = pending[at];
        const group = item.group;
        let found = false;
        for (const p of bucket) {
          if (!playerIsInGroup(group, p)) {
            let valid = true;
            //check if adding player goes over max allowed
            for (const r of checkMax) {
              const matches = playerMatchesRule(r, p);
              if (matches) {
                const count = countMatches(r, group.players);
                if (count >= r.max) {
                  valid = false;
                  break;
                }
              }
            }
            if (valid) {
              let index = sidelines.indexOf(p); //I know lmao
              sidelines.splice(index, 1);
              index = bucket.indexOf(p); //I know lmao
              bucket.splice(index, 1);
              group.players.push(p);
              item.count++;
              found = true;
              break;
            }
          }
        }
        if (!found) {
          item.notFound++;
        } else {
          item.notFound = 0;
        }
        if (item.count >= rule.count || item.notFound >= buckets.length) {
          pending.splice(at, 1);
          if (!pending.length) {
            break;
          }
        } else {
          at++;
        }
        if (at == pending.length) {
          at = 0;
        }
        if (!bucket.length) {
          break;
        }
      }
      if (x + 1 == buckets.length && pending.length) {
        x = 0;
      }
    }
    logProgress(groups);
  }
  groups.push({ name: "Sidelines", players: sidelines });
  return groups;
}
const data = generate();
console.log(JSON.stringify(data, null, 2));
for (const group of data) {
  let sp = "";
  let names = "";
  for (const player of group.players) {
    const spec = _.find(specs, { spec: player.spec });
    sp += spec.wowhead;
    names += `${player.name};`;
  }
  console.log(`wowhead.com/wotlk/raid-composition#0${sp};${names}`);
}
