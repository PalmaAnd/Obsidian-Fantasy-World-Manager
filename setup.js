const fs = require("fs");
const path = require("path");

const vaultName = "Campaign_Vault"; // Change this if needed
const baseDir = path.join(__dirname, vaultName);

// Folder structure definition
const structure = {
    "00 - Meta": [
        "Campaign Overview",
        "Campaign Roadmap",
        "Player Info",
        "Session Zero Notes",
        "Session Summaries",
        "Game System Rules",
        "Random Ideas",
        "DM Inspirations",
    ],
    "01 - Worldbuilding": {
        "Regions & Locations": [
            "Continents & Nations",
            "Cities & Settlements",
            "Dungeons & Adventure Sites",
            "Landmarks & Wonders",
        ],
        "Factions & Organizations": [
            "Religions & Cults",
            "Guilds & Societies",
            "Political Powers",
        ],
        "History & Legends": [
            "Timeline of Major Events",
            "Myths & Folklore",
            "Wars & Cataclysms",
        ],
        "Culture & Technology": [
            "Magic & Its Role",
            "Common Knowledge & Superstitions",
            "Science & Industry",
        ],
        "Economy & Trade": [
            "Currency",
            "Trade Routes",
            "Major Exports & Resources",
        ],
    },
    "02 - Characters": {
        "Villains & Antagonists": [
            "Main Villain",
            "Villain's Minions",
            "Rival Adventurers",
        ],
        "Allies & Quest Givers": ["Mentors & Patrons", "Fellow Adventurers"],
        "Deities & Mythical Beings": [
            "Pantheon Overview",
            "Godly Domains & Worship",
        ],
        "Random NPC Generator": [
            "Name Lists",
            "Personalities & Quirks",
            "Random Encounter NPCs",
        ],
    },
    "03 - Story & Quests": {
        "Story Arcs": [
            "Act 1 - Setup",
            "Act 2 - Rising Action",
            "Act 3 - Climax & Resolution",
        ],
        "Side Quests": ["Faction Missions", "Player-Specific Quests"],
        "One-Shots & Mini-Arcs": ["Standalone Adventures"],
    },
    "04 - Mechanics & Homebrew": {
        "Custom Rules": ["Unique Mechanics", "Skill Challenges"],
        "Items & Equipment": ["Unique Magical Items", "Artifacts & Relics"],
        "Custom Spells & Abilities": ["New Spell Mechanics"],
        "Custom Monsters & Encounters": [
            "Bosses & Legendary Creatures",
            "Custom Enemy Stats",
            "Traps & Hazards",
        ],
        "Downtime & Lifestyle": ["Crafting, Shopping", "Training & Learning"],
    },
    "05 - Session Planning": [
        "Next Session Agenda",
        "Encounters & Combat Notes",
        "Roleplay Prompts",
        "Player Goals & Side Plots",
        "XP & Rewards Tracker",
        "Notes & Adjustments",
    ],
    "06 - Random Generators & Tables": {
        Encounters: ["Wilderness Encounters", "City Encounters"],
        NPCs: ["Names & Backgrounds"],
        "Magic & Items": ["Loot Tables"],
        "Weather & Events": [
            "Random Weather Generator",
            "Festival & Holiday Calendar",
        ],
        "World Events": ["Political Changes", "Disasters & Plagues"],
    },
    "07 - Reference Materials": [
        "Rules Summary",
        "Player Abilities Reference",
        "Common Conditions",
        "Spell Lists",
        "Monster Index",
        "DM Screen Quick Notes",
    ],
    "08 - Logs & Archives": [
        "Completed Arcs",
        "Retired NPCs",
        "Old Session Notes",
        "Scrapped Ideas",
    ],
};

// Function to create folders and files recursively
function createStructure(base, structure) {
    for (const key in structure) {
        const folderPath = path.join(base, key);
        fs.mkdirSync(folderPath, { recursive: true });

        const items = structure[key];
        if (Array.isArray(items)) {
            // Create markdown files inside the folder
            items.forEach((file) => {
                fs.writeFileSync(
                    path.join(folderPath, file + ".md"),
                    `# ${file}\n\n`,
                    "utf8"
                );
            });
        } else if (typeof items === "object") {
            // Recursively create subfolders
            createStructure(folderPath, items);
        }
    }
}

// Create the vault folder
fs.mkdirSync(baseDir, { recursive: true });
createStructure(baseDir, structure);

console.log(`✅ Obsidian vault "${vaultName}" has been created successfully!`);
