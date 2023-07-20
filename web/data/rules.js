function generateRules(config) {
  const rules = [
    {
      name: "Main tank",
      count: config.mainTanks || 1,
      selectors: [
        {
          class: "Tank",
          spec: "Protection1",
        },
        {
          class: "Tank",
          spec: "Protection",
        },
        {
          class: "Tank",
          spec: "Blood_Tank",
        },
      ],
    },
    {
      name: "Off tank",
      count: (config.offTanks || 1) + 1, //+1 since rule also matches main tanks
      selectors: [
        {
          class: "Tank",
          spec: "Blood_Tank",
        },
        {
          class: "Tank",
          spec: "Protection",
        },
        {
          class: "Tank",
          spec: "Guardian",
        },
        {
          class: "Tank",
          spec: "Frost_Tank",
        },
        {
          class: "Tank",
          spec: "Unholy_Tank",
        },
        {
          class: "Druid",
          spec: "Feral",
        },
        {
          class: "DK",
          spec: "Frost1",
        },
        {
          class: "DK",
          spec: "Frost_DPS",
        },
        {
          class: "DK",
          spec: "Unholy",
        },
        {
          class: "DK",
          spec: "Unholy_DPS",
        },
        {
          class: "Tank",
          spec: "Protection1",
        },
      ],
    },
    {
      name: "Spell power",
      count: 1,
      selectors: [
        {
          class: "Warlock",
          spec: "Demonology",
        },
        {
          class: "Shaman",
          spec: "Elemental",
        },
      ],
    },
    {
      name: "Bloodlust",
      count: 1,
      selectors: [
        {
          class: "Shaman",
          spec: "Enhancement",
        },
        {
          class: "Shaman",
          spec: "Elemental",
        },
        {
          class: "Shaman",
          spec: "Restoration1",
        },
      ],
    },
    {
      name: "Healers",
      count: config.healers || 2,
      max: config.maxHealers || 2,
      selectors: [
        {
          class: "Paladin",
          spec: "Holy1",
        },
        {
          class: "Priest",
          spec: "Discipline",
        },
        {
          class: "Shaman",
          spec: "Restoration1",
        },
        {
          class: "Druid",
          spec: "Restoration",
        },
        {
          class: "Priest",
          spec: "Holy",
        },
      ],
    },
    {
      name: "13%",
      count: 1,
      selectors: [
        {
          class: "Druid",
          spec: "Balance",
        },
        {
          class: "DK",
          spec: "Unholy",
        },
        {
          class: "DK",
          spec: "Unholy_DPS",
        },
        {
          class: "Tank",
          spec: "Unholy_Tank",
        },
      ],
    },
    {
      name: "Melee haste",
      count: 1,
      selectors: [
        {
          class: "DK",
          spec: "Frost1",
        },
        {
          class: "DK",
          spec: "Frost_DPS",
        },
        {
          class: "Tank",
          spec: "Frost_Tank",
        },
        {
          class: "Tank",
          spec: "Blood_Tank",
        },
        {
          class: "Shaman",
          spec: "Enhancement",
        },
      ],
    },
    {
      name: "Tricks/MD",
      count: 1,
      selectors: [
        {
          class: "Hunter",
        },
        {
          class: "Rogue",
        },
      ],
    },
    {
      name: "BREZ/INNER",
      count: 1,
      selectors: [
        {
          class: "Druid",
          spec: "Feral",
        },
        {
          class: "Druid",
          spec: "Balance",
        },
        {
          class: "Tank",
          spec: "Guardian",
        },
        {
          class: "Druid",
          spec: "Restoration",
        },
      ],
    },
    {
      name: "Pally buffs",
      count: 2,
      selectors: [
        {
          class: "Paladin",
          spec: "Retribution",
        },
        {
          class: "Tank",
          spec: "Protection1",
        },
        {
          class: "Paladin",
          spec: "Holy1",
        },
      ],
    },
    {
      name: "HP buff",
      count: 1,
      selectors: [
        {
          class: "Priest",
          spec: "Shadow",
        },
        {
          class: "Priest",
          spec: "Discipline",
        },
        {
          class: "Priest",
          spec: "Holy",
        },
      ],
    },
    {
      name: "Filler",
      count: config.size,
      selectors: [
        {
          class: "Warlock",
          spec: "Affliction",
        },
        {
          class: "Mage",
        },
        {
          class: "Warrior",
          spec: "Arms",
        },
        {
          class: "Warrior",
          spec: "Fury",
        },
        {
          class: "Shaman",
          spec: "Enhancement",
        },
        {
          class: "Death_Knight",
          spec: "Unholy",
        },
        {
          class: "Death_Knight",
          spec: "Unholy_DPS",
        },
        {
          class: "Rogue",
        },
        {
          class: "Hunter",
        },
        {
          class: "Druid",
          spec: "Balance",
        },
        {
          class: "Death_Knight",
          spec: "Frost1",
        },
        {
          class: "Death_Knight",
          spec: "Frost_DPS",
        },
        {
          class: "Priest",
          spec: "Shadow",
        },
        {
          class: "Warlock",
          spec: "Demonology",
        },
        {
          class: "Shaman",
          spec: "Elemental",
        },
        {
          class: "Warlock",
          spec: "Destruction",
        },
        {
          class: "Paladin",
          spec: "Retribution",
        },
        {
          class: "Death_Knight",
          spec: "Blood_DPS",
        },
      ],
    },
  ];
  return rules;
}

export default generateRules;
