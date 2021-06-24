const jobInitials = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "CRP",
  "BSM",
  "ARM",
  "GSM",
  "LTW",
  "WVR",
  "ALC",
  "CUL",
  "MIN",
  "BTN",
  "FSH",
  "PLD",
  "MNK",
  "WAR",
  "DRG",
  "BRD",
  "WHM",
  "BLM",
  "",
  "SMN",
  "SCH",
  "",
  "NIN",
  "MCH",
  "DRK",
  "AST",
  "SAM",
  "RDM",
  "BLU",
  "GNB",
  "DNC",
];

const races = ["Hyur", "Elezen", "Lalafell", "Miqo'te", "Roegadyn", "Au Ra", "Hrothgar", "Viera"];

const tribes = [
  "Midlander",
  "Highlander",
  "Wildwood",
  "Duskwight",
  "Plainsfolk",
  "Dunesfolk",
  "Seeker of the Sun",
  "Keeper of the Moon",
  "Sea Wolf",
  "Hellsguard",
  "Raen",
  "Xaela",
  "Helions",
  "The Lost",
  "Rava",
  "Veena",
];

const cities = ["Limsa Lominsa", "Gridania", "Ul'dah"];

const guardians = [
  "Halone, the Fury",
  "Menphina, the Lover",
  "Thaliak, the Scholar",
  "Nymeia, the Spinner",
  "Llymlaen, the Navigator",
  "Oschon, the Wanderer",
  "Byregot, the Builder",
  "Rhalgr, the Destroyer",
  "Azeyma, the Warden",
  "Nald'thal, the Traders",
  "Nophica, the Matron",
  "Althyk, the Keeper",
];

const gcNames = ["Maelstrom", "Order of the Twin Adder", "Immortal Flames"];

const gcRanks = [
  [
    "Storm Private Third Class",
    "Storm Private Second Class",
    "Storm Private First Class",
    "Storm Corporal",
    "Storm Sergeant Third Class",
    "Storm Sergeant Second Class",
    "Storm Sergeant First Class",
    "Chief Storm Sergeant",
    "Second Storm Lieutenant",
    "First Storm Lieutenant",
    "Storm Captain",
  ],
  [
    "Serpent Private Third Class",
    "Serpent Private Second Class",
    "Serpent Private First Class",
    "Serpent Corporal",
    "Serpent Sergeant Third Class",
    "Serpent Sergeant Second Class",
    "Serpent Sergeant First Class",
    "Chief Serpent Sergeant",
    "Second Serpent Lieutenant",
    "First Serpent Lieutenant",
    "Serpent Captain",
  ],
  [
    "Flame Private Third Class",
    "Flame Private Second Class",
    "Flame Private First Class",
    "Flame Corporal",
    "Flame Sergeant Third Class",
    "Flame Sergeant Second Class",
    "Flame Sergeant First Class",
    "Chief Flame Sergeant",
    "Second Flame Lieutenant",
    "First Flame Lieutenant",
    "Flame Captain",
  ],
];

function injectData(characterData) {
  let achievementList = characterData.Achievements?.List || [];
  for (let i = 0; i < achievementList.length; i++) {
    if (achievementList[i].ID == 789) {
      characterData.PlayingSince = achievementList[i].Date;
    }
  }

  characterData.Jobs = {};
  for (let classJob of characterData.Character.ClassJobs) {
    characterData.Jobs[jobInitials[classJob.JobID]] = classJob;
  }

  characterData.Character.Race = races[characterData.Character.Race - 1];
  characterData.Character.Tribe = tribes[characterData.Character.Tribe - 1];
  characterData.Character.GuardianDeity = guardians[characterData.Character.GuardianDeity - 1];
  characterData.Character.Town = cities[characterData.Character.Town - 1];
  if (characterData.Character.GrandCompany) {
    characterData.Character.GrandCompany.Name =
      gcNames[characterData.Character.GrandCompany.NameID - 1];
    characterData.Character.GrandCompany.Rank =
      gcRanks[characterData.Character.GrandCompany.NameID - 1][
        characterData.Character.GrandCompany.RankID - 1
      ];
  }
}

const fetchCharacterData = (id) =>
  new Promise((resolve, reject) => {
    fetch("https://xivapi.com/character/" + id + "?data=AC", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((characterData) => {
        injectData(characterData);
        resolve(characterData);
      })
      .catch((err) => {
        if (err.status == 404) {
          reject("The character profile you have entered does not exist.");
        } else {
          reject("An unknown error has ocurred while fetching character data.");
        }
      });
  });

export { fetchCharacterData };
