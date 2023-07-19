const buffs = [
  [
    {
      caption: "General",
      spellList: [
        {
          name: "Gift of the Wild",
          specs: ["Balance", "Feral", "Restoration", "Guardian"],
          tooltip: [
            {
              spell: "Gift of the Wild",
              icon: "spell_nature_giftofthewild",
              color: "#FF7C0A",
            },
          ],
        },
        {
          name: "Blessing of Kings",
          specs: ["Holy1", "Protection1", "Retribution"],
          tooltip: [
            {
              spell: "Greater Blessing of Kings",
              icon: "spell_magic_greaterblessingofkings",
              color: "#F48CBA",
            },
          ],
        },
        {
          name: "Strength and Agility",
          specs: ["Enhancement", "Restoration1", "Elemental", "Frost_Tank", "Blood_Tank", "Unholy_Tank", "Frost_DPS", "Blood_DPS", "Unholy_DPS"],
          tooltip: [
            {
              spell: "Horn of Winter",
              icon: "inv_misc_horn_02",
              color: "#C41E3A",
            },
            {
              spell: "Strength of Earth Totem",
              icon: "spell_nature_earthbindtotem",
              color: "#0070DD",
            },
          ],
        },
        {
          name: "Attack Power: Static",
          specs: ["Holy1", "Protection1", "Retribution", "Protection", "Arms", "Fury"],
          tooltip: [
            {
              spell: "Greater Blessing of Might",
              icon: "spell_holy_greaterblessingofkings",
              color: "#F48CBA",
            },
            {
              spell: "Battleshout",
              icon: "ability_warrior_battleshout",
              color: "#C69B6D",
            },
          ],
        },
        {
          name: "10% Attack Power",
          specs: ["Blood_Tank", "Blood_DPS", "Marksmanship", "Marksman", "Enhancement"],
          tooltip: [
            {
              spell: "Unleashed Rage",
              icon: "spell_nature_unleashedrage",
              color: "#0070DD",
            },
            {
              spell: "Abomination's Might",
              icon: "ability_warrior_intensifyrage",
              color: "#C41E3A",
            },
            {
              spell: "Trueshot Aura",
              icon: "ability_trueshot",
              color: "#AAD372",
            },
          ],
        },
        {
          name: "5% Physical Crit",
          specs: ["Guardian", "Feral", "Fury"],
          tooltip: [
            {
              spell: "Leader of the Pack",
              icon: "spell_nature_unyeildingstamina",
              color: "#FF7C0A",
            },
            {
              spell: "Rampage",
              icon: "ability_warrior_rampage",
              color: "#C69B6D",
            },
          ],
        },
        {
          name: "20% Melee Haste",
          specs: ["Blood_Tank", "Blood_DPS", "Frost_Tank", "Frost_DPS", "Enhancement"],
          tooltip: [
            {
              spell: "Improved Windfury Totem",
              icon: "spell_nature_windfury",
              color: "#0070DD",
            },
            {
              spell: "Improved Icy Talons",
              icon: "spell_deathknight_icytalons",
              color: "#C41E3A",
            },
          ],
        },
        {
          name: "3% Damage",
          specs: ["Arcane", "Beast Mastery", "Beastmastery", "Retribution"],
          tooltip: [
            {
              spell: "Sanctified Retribution",
              icon: "spell_holy_mindvision",
              color: "#F48CBA",
            },
            {
              spell: "Ferocious Inspiration",
              icon: "ability_hunter_ferociousinspiration",
              color: "#AAD372",
            },
            {
              spell: "Arcane Empowerment",
              icon: "spell_nature_starfall",
              color: "#3FC7EB",
            },
          ],
        },
        {
          name: "3% Haste",
          specs: ["Retribution", "Balance"],
          tooltip: [
            {
              spell: "Improved Moonkin Form",
              icon: "ability_druid_improvedmoonkinform",
              color: "#FF7C0A",
            },
            {
              spell: "Swift Retribution",
              icon: "ability_paladin_swiftretribution",
              color: "#F48CBA",
            },
          ],
        },
        {
          name: "Heroism / Bloodlust",
          specs: ["Enhancement", "Restoration1", "Elemental"],
          tooltip: [
            {
              spell: "Heroism/Bloodlust",
              icon: "spell_nature_bloodlust",
              color: "#0070DD",
            },
          ],
        },
        {
          name: "Intellect",
          specs: ["Affliction", "Arcane", "Fire", "Frost"],
          tooltip: [
            {
              spell: "Arcane Intellect",
              icon: "spell_holy_magicalsentry",
              color: "#3FC7EB",
            },
            {
              spell: "Fel Intelligence",
              icon: "spell_shadow_brainwash",
              color: "#8788EE",
            },
          ],
        },
        {
          name: "Spell Power",
          specs: ["Demonology", "Enhancement", "Restoration1", "Elemental"],
          tooltip: [
            {
              spell: "Totem of Wrath",
              icon: "spell_fire_totemofwrath",
              color: "#0070DD",
            },
            {
              spell: "Flametongue Totem",
              icon: "spell_nature_guardianward",
              color: "#0070DD",
            },
            {
              spell: "Demonic pact",
              icon: "spell_shadow_demonicpact",
              color: "#8788EE",
            },
          ],
        },
        {
          name: "5% Spell Crit",
          specs: ["Elemental", "Balance"],
          tooltip: [
            {
              spell: "Moonkin Aura",
              icon: "spell_nature_moonglow",
              color: "#FF7C0A",
            },
            {
              spell: "Elemental Oath",
              icon: "spell_shaman_elementaloath",
              color: "#0070DD",
            },
          ],
        },
        {
          name: "5% Spell Haste",
          specs: ["Enhancement", "Restoration1", "Elemental"],
          tooltip: [
            {
              spell: "",
              icon: "spell_nature_slowingtotem",
              color: "#0070DD",
            },
          ],
        },
        {
          name: "Spirit",
          specs: ["Discipline", "Holy", "Shadow", "Smite", "Affliction"],
          tooltip: [
            {
              spell: "Divine Spirit",
              icon: "spell_holy_divinespirit",
              color: "#FFFFFF",
            },
            {
              spell: "Fel Intelligence",
              icon: "spell_shadow_brainwash",
              color: "#8788EE",
            },
          ],
        },
        {
          name: "Stamina",
          specs: ["Discipline", "Holy", "Shadow", "Smite"],
          tooltip: [
            {
              spell: "Power Word: Fortitude",
              icon: "spell_holy_wordfortitude",
              color: "#FFFFFF",
            },
          ],
        },
        {
          name: "Health",
          specs: ["Arms", "Fury", "Protection", "Destruction"],
          tooltip: [
            {
              spell: "Commanding Shout",
              icon: "ability_warrior_rallyingcry",
              color: "#C69B6D",
            },
            {
              spell: "Blood Pact",
              icon: "spell_shadow_bloodboil",
              color: "#8788EE",
            },
          ],
        },
      ],
    },
  ],
  [
    {
      caption: "Single-Player Buffs",
      spellList: [
        {
          name: "Focus Magic",
          specs: ["Arcane", "Fire"],
          tooltip: [
            {
              spell: "Focus Magic",
              icon: "spell_arcane_studentofmagic",
              color: "#3FC7EB",
            },
          ],
        },
        {
          name: "Unholy Frenzy",
          specs: ["Blood_Tank", "Blood_DPS", "Blood"],
          tooltip: [
            {
              spell: "Unholy Frenzy",
              icon: "spell_deathknight_bladedarmor",
              color: "#C41E3A",
            },
          ],
        },
        {
          name: "Tricks of the Trade",
          specs: ["Assassination", "Combat", "Subtlety"],
          tooltip: [
            {
              spell: "Tricks of the Trade",
              icon: "ability_rogue_tricksofthetrade",
              color: "#FFF468",
            },
          ],
        },
        {
          name: "Power Infusion",
          specs: ["Discipline", "Smite"],
          tooltip: [
            {
              spell: "Power Infusion",
              icon: "spell_holy_powerinfusion",
              color: "#FFFFFF",
            },
          ],
        },
      ],
    },
    {
      caption: "Health Return",
      spellList: [
        {
          name: "Imp. Leader of the Pack",
          specs: ["Guardian", "Feral"],
          tooltip: [
            {
              spell: "Improved Leader of the Pack",
              icon: "spell_nature_unyeildingstamina",
              color: "#FF7C0A",
            },
          ],
        },
        {
          name: "Judgement of Light",
          specs: ["Holy1", "Protection1", "Retribution"],
          tooltip: [
            {
              spell: "Judgement of Light",
              icon: "spell_holy_righteousfury",
              color: "#F48CBA",
            },
          ],
        },
        {
          name: "Vampiric Embrace",
          specs: ["Shadow"],
          tooltip: [
            {
              spell: "Vampiric Embrace",
              icon: "spell_shadow_unsummonbuilding",
              color: "#FFFFFF",
            },
          ],
        },
      ],
    },
  ],
  [
    {
      caption: "Offensive Debuffs",
      spellList: [
        {
          name: "30% Bleed Damage",
          specs: ["Guardian", "Feral", "Beast Mastery", "Beastmastery", "Arms"],
          tooltip: [
            {
              spell: "Mangle",
              icon: "ability_druid_mangle2",
              color: "#FF7C0A",
            },
            {
              spell: "Trauma",
              icon: "ability_warrior_bloodnova",
              color: "#C69B6D",
            },
            {
              spell: "Stampede",
              icon: "spell_shaman_astralshift",
              color: "#AAD372",
            },
          ],
        },
        {
          name: "4% Physical Damage",
          specs: ["Combat", "Arms"],
          tooltip: [
            {
              spell: "Blood Frenzy",
              icon: "ability_warrior_bloodfrenzy",
              color: "#C69B6D",
            },
            {
              spell: "Savage Combat",
              icon: "ability_creature_disease_03",
              color: "#FFF468",
            },
          ],
        },
        {
          name: "3% Crit",
          specs: ["Retribution", "Elemental", "Assassination"],
          tooltip: [
            {
              spell: "Totem of Wrath",
              icon: "spell_fire_totemofwrath",
              color: "#0070DD",
            },
            {
              spell: "Heart of the Crusader",
              icon: "spell_holy_holysmite",
              color: "#F48CBA",
            },
            {
              spell: "Master Poisoner",
              icon: "ability_creature_poison_06",
              color: "#FFF468",
            },
          ],
        },
        {
          name: "5% Spell Crit Debuff",
          specs: ["Affliction", "Demonology", "Frost", "Fire"],
          tooltip: [
            {
              spell: "Improved Scorch",
              icon: "spell_fire_soulburn",
              color: "#3FC7EB",
            },
            {
              spell: "Winter's Chill",
              icon: "spell_frost_chillingblast",
              color: "#3FC7EB",
            },
            {
              spell: "Improved Shadow Bolt",
              icon: "spell_shadow_shadowbolt",
              color: "#8788EE",
            },
          ],
        },
        {
          name: "3% Spell Hit",
          specs: ["Balance", "Shadow"],
          tooltip: [
            {
              spell: "Improved Faerie Fire",
              icon: "spell_nature_faeriefire",
              color: "#FF7C0A",
            },
            {
              spell: "Misery",
              icon: "spell_shadow_misery",
              color: "#FFFFFF",
            },
          ],
        },
        {
          name: "13% Spell Damage",
          specs: ["Balance", "Affliction", "Demonology", "Destruction", "Unholy_Tank", "Unholy_DPS"],
          tooltip: [
            {
              spell: "Curse of Elements",
              icon: "spell_shadow_chilltouch",
              color: "#8788EE",
            },
            {
              spell: "Earth of Moon",
              icon: "ability_druid_earthandsky",
              color: "#FF7C0A",
            },
            {
              spell: "Ebon Plaguebringer",
              icon: "ability_creature_cursed_03",
              color: "#C41E3A",
            },
          ],
        },
      ],
    },
    {
      caption: "Reduction Debuffs",
      spellList: [
        {
          name: "20% Armor",
          specs: ["Arms", "Fury", "Protection", "Assassination", "Combat", "Subtlety", "Beast Mastery", "Beastmastery"],
          tooltip: [
            {
              spell: "Sunder Armor",
              icon: "ability_warrior_sunder",
              color: "#C69B6D",
            },
            {
              spell: "Expose Armor",
              icon: "ability_warrior_riposte",
              color: "#FFF468",
            },
            {
              spell: "Acid Spit",
              icon: "spell_nature_acid_01",
              color: "#AAD372",
            },
          ],
        },
        {
          name: "5% Armor",
          specs: ["Guardian", "Feral", "Beast Mastery", "Beastmastery", "Marksmanship", "Marksman", "Survival", "Affliction", "Demonology", "Destruction"],
          tooltip: [
            {
              spell: "Curse of Weakness",
              icon: "spell_shadow_curseofmannoroth",
              color: "#8788EE",
            },
            {
              spell: "Fearie Fire",
              icon: "spell_nature_faeriefire",
              color: "#FF7C0A",
            },
            {
              spell: "Sting",
              icon: "spell_nature_slowpoison",
              color: "#AAD372",
            },
          ],
        },
        {
          name: "20% Attack Speed",
          specs: ["Arms", "Fury", "Unholy_Tank", "Unholy_DPS", "Frost_Tank", "Frost_DPS", "Blood_Tank", "Blood_DPS", "Protection", "Protection1", "Guardian", "Feral"],
          tooltip: [
            {
              spell: "Improved Thunder Clap",
              icon: "ability_thunderclap",
              color: "#C69B6D",
            },
            {
              spell: "Judgements of the Just",
              icon: "ability_paladin_judgementsofthejust",
              color: "F48CBA",
            },
            {
              spell: "Infected Wounds",
              icon: "ability_druid_infectedwound",
              color: "#FF7C0A",
            },
            {
              spell: "Improved Frost Fever",
              icon: "spell_deathknight_frostfever",
              color: "#C41E3A",
            },
          ],
        },
        {
          name: "Attack Power",
          specs: ["Affliction", "Demonology", "Destruction", "Arms", "Fury", "Protection", "Guardian", "Feral", "Retribution"],
          tooltip: [
            {
              spell: "Demoralizing Shout",
              icon: "ability_warrior_warcry",
              color: "#C69B6D",
            },
            {
              spell: "Demoralizing Roar",
              icon: "classic_ability_druid_demoralizingroar",
              color: "#FF7C0A",
            },
            {
              spell: "Curse of Weakness",
              icon: "spell_shadow_curseofmannoroth",
              color: "#8788EE",
            },
            {
              spell: "Vindication",
              icon: "spell_holy_vindication",
              color: "#F48CBA",
            },
          ],
        },
        {
          name: "Physical Hit",
          specs: ["Beast Mastery", "Beastmastery", "Marksmanship", "Marksman", "Survival", "Balance"],
          tooltip: [
            {
              spell: "Insect Swarm",
              icon: "spell_nature_insectswarm",
              color: "#FF7C0A",
            },
            {
              spell: "Scorpid Sting",
              icon: "ability_hunter_criticalshot",
              color: "#AAD372",
            },
          ],
        },
      ],
    },
  ],
  [
    {
      caption: "Damage Reduction",
      spellList: [
        {
          name: "Divine Guardian",
          specs: ["Protection1"],
          tooltip: [
            {
              spell: "Divine Guardian",
              icon: "spell_holy_powerwordbarrier",
              color: "#F48CBA",
            },
          ],
        },
        {
          name: "Blessing of Sanctuary",
          specs: ["Protection1"],
          tooltip: [
            {
              spell: "Greater Blessing of Sanctuary",
              icon: "spell_holy_greaterblessingofsanctuary",
              color: "#F48CBA",
            },
          ],
        },
      ],
    },
    {
      caption: "Ressource Return",
      spellList: [
        {
          name: "Judgment of Wisdom",
          specs: ["Holy1", "Protection1", "Retribution"],
          tooltip: [
            {
              spell: "Greater Blessing of Wisdom",
              icon: "ability_paladin_judgementblue",
              color: "#F48CBA",
            },
          ],
        },
        {
          name: "Mana Replenishment",
          specs: ["Retribution", "Shadow", "Survival", "Frost", "Destruction"],
          tooltip: [
            {
              spell: "Vampiric Touch",
              icon: "spell_holy_stoicism",
              color: "#FFFFFF",
            },
            {
              spell: "Judgement of the Wise",
              icon: "ability_paladin_judgementofthewise",
              color: "#F48CBA",
            },
            {
              spell: "Hunting Party",
              icon: "ability_hunter_huntingparty",
              color: "#AAD372",
            },
            {
              spell: "Improved Soul Leech",
              icon: "ability_warlock_improvedsoulleech",
              color: "#8788EE",
            },
            {
              spell: "Enduring Winte",
              icon: "spell_frost_summonwaterelemental_2",
              color: "#3FC7EB",
            },
          ],
        },
        {
          name: "Mana Restoration",
          specs: ["Enhancement", "Restoration1", "Elemental", "Holy1", "Protection1", "Retribution"],
          tooltip: [
            {
              spell: "Greater Blessing of Wisdom",
              icon: "spell_holy_greaterblessingofwisdom",
              color: "#F48CBA",
            },
            {
              spell: "Mana Spring Totem",
              icon: "spell_nature_manaregentotem",
              color: "#0070DD",
            },
          ],
        },
        {
          name: "Mana Tide Totem",
          specs: ["Restoration1"],
          tooltip: [
            {
              spell: "Mana Tide Totem",
              icon: "spell_frost_summonwaterelemental",
              color: "#0070DD",
            },
          ],
        },
        {
          name: "Hymn of Hope",
          specs: ["Discipline", "Holy", "Shadow", "Smite"],
          tooltip: [
            {
              spell: "Hymn of Hope",
              icon: "spell_holy_symbolofhope",
              color: "#FFFFFF",
            },
          ],
        },
        {
          name: "Rapture",
          specs: ["Discipline", "Smite"],
          tooltip: [
            {
              spell: "Rapture",
              icon: "spell_holy_rapture",
              color: "#FFFFFF",
            },
          ],
        },
        {
          name: "Revitalize",
          specs: ["Restoration"],
          tooltip: [
            {
              spell: "Revitalize",
              icon: "ability_druid_replenish",
              color: "#FF7C0A",
            },
          ],
        },
        {
          name: "Innervate",
          specs: ["Balance", "Feral", "Restoration", "Guardian"],
          tooltip: [
            {
              spell: "Innervate",
              icon: "spell_nature_lightning",
              color: "#FF7C0A",
            },
          ],
        },
      ],
    },
  ],
];
export default buffs;
