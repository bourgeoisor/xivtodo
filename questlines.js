let mainStoryQuests = [
  {"Name": "A Realm Reborn (2.0)", Bold: true, ID: 788},
  {"Name": "A Realm Awoken (2.1)", ID: 898},
  {"Name": "Through the Maelstrom (2.2)", ID: 899},
  {"Name": "Defenders of Eorzea (2.3)", ID: 1001},
  {"Name": "Dreams of Ice (2.4)", ID: 1029},
  {"Name": "Before the Fall (2.55)", ID: 1129},
  {"Name": "Heavensward (3.0)", Bold: true, ID: 1139},
  {"Name": "As Goes Light, So Goes Darkness (3.1)", ID: 1387},
  {"Name": "The Gears of Change (3.2)", ID: 1493},
  {"Name": "Revenge of the Horde (3.3)", ID: 1594},
  {"Name": "Soul Surrender (3.4)", ID: 1630},
  {"Name": "The Far Edge of Fate - Part 1 (3.5)", ID: 1690},
  {"Name": "The Far Edge of Fate - Part 2 (3.56)", ID: 1691},
  {"Name": "Stormblood (4.0)", Bold: true, ID: 1794},
  {"Name": "The Legend Returns (4.1)", ID: 1990},
  {"Name": "Rise of a New Sun (4.2)", ID: 2013},
  {"Name": "Under the Moonlight (4.3)", ID: 2098},
  {"Name": "Prelude in Violet (4.4)", ID: 2124},
  {"Name": "A Requiem for Heroes - Part 1 (4.5)", ID: 2160},
  {"Name": "A Requiem for Heroes - Part 2 (4.56)", ID: 2233},
  {"Name": "Shadowbringers (5.0)", Bold: true, ID: 2298},
  {"Name": "Vows of Virtue, Deeds of Cruelty (5.1)", ID: 2424},
  {"Name": "Echoes of a Fallen Star (5.2)", ID: 2587},
  {"Name": "Reflections in Crystal (5.3)", ID: 2642},
  {"Name": "Futures Rewritten (5.4)", ID: 2714},
  {"Name": "Death Unto Dawn - Part 1 (5.5)", ID: 2850},
  {"Name": "Death Unto Dawn - Part 2 (5.55)", ID: 2851}
]

let categories = ["main-story-quests"]

function renderPage() {
    if (characterData == null) {
        $("#character-name").html("No Data")
        renderError("Character data could not be found. You can load a character from the <a class='alert-link' href='settings.html'>Settings</a>.")
        renderEmpty(categories)
        return
      }
    
      $("#character-name").html(characterData["Name"])

      if (!achievementsPublicData) {
        renderError("The achievements for this character are not public. You can set Achievements to Public in your <a class='alert-link' href='https://na.finalfantasyxiv.com/lodestone/my/setting/account/'>character settings</a>.")
        renderEmpty(categories)
        return
      }
    
      for (let i = 0; i < achievementData["List"].length; i++) {
          achievements.set(achievementData["List"][i]["ID"], achievementData["List"][i]["Date"])
      }

      renderList("#main-story-quests", mainStoryQuests)
}

let characterData = JSON.parse(localStorage.getItem("character"))
let achievementData = JSON.parse(localStorage.getItem("achievements"))
let achievementsPublicData = JSON.parse(localStorage.getItem("achievementsPublic"))
let achievements = new Map()
renderPage()