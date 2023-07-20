function getAllMatches(rule, players) {
  const matches = [];
  for (const selector of rule.selectors) {
    const bucket = [];
    for (const player of players) {
      if (!selector.class || player.class == selector.class) {
        if (!selector.spec || player.spec == selector.spec) {
          bucket.push(player);
        }
      }
    }
    if (bucket.length) {
      matches.push(bucket);
    }
  }
  return matches;
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
  for (const slot of group.slots) {
    if (player.userid == slot?.player?.userid) {
      return true;
    }
  }
  return false;
}
function countMatchesInGroup(rule, group) {
  let count = 0;
  for (const slot of group.slots) {
    if (slot.player && playerMatchesRule(rule, slot.player)) {
      count++;
    }
  }
  return count;
}
function hasFreeSlot(group) {
  for (const slot of group.slots) {
    if (!slot.player) {
      return true;
    }
  }
  return false;
}
function insertPlayer(group, player) {
  for (const slot of group.slots) {
    if (!slot.player) {
      slot.player = player;
      return true;
    }
  }
  return false;
}
//this is greedy and slow but idc
function generate(groups, sidelines, rules) {
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
      if (!hasFreeSlot(group)) {
        continue;
      }
      const count = countMatchesInGroup(rule, group);
      if (count < rule.count) {
        pending.push({ group, count, notFound: 0 });
      }
    }
    const buckets = getAllMatches(rule, sidelines);
    let at = 0;
    for (let x = 0; x < buckets.length; x++) {
      const bucket = buckets[x];
      //TODO random order for fairness
      for (let x = 0; x < pending.length; x++) {
        const item = pending[at];
        const group = item.group;
        let found = false;
        let splice = false;
        for (const p of bucket) {
          if (!playerIsInGroup(group, p)) {
            let valid = true;
            //check if adding player goes over max allowed
            for (const r of checkMax) {
              const matches = playerMatchesRule(r, p);
              if (matches) {
                const count = countMatchesInGroup(r, group);
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
              insertPlayer(group, p);
              item.count++;
              found = true;
              break;
            }
          }
        }
        if (!found) {
          item.notFound++;
          if (item.notFound >= buckets.length) {
            pending.splice(at, 1);
            splice = true;
            if (!pending.length) {
              break;
            }
          }
        } else {
          item.notFound = 0;
          if (!hasFreeSlot(group) || item.count >= rule.count) {
            pending.splice(at, 1);
            splice = true;
            if (!pending.length) {
              break;
            }
          }
        }
        if (!splice) {
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
  }
  return [sidelines, ...groups];
}
export default generate;
