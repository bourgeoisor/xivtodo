let arrDungeons = [
  {Name: "Sastasha", Bold: true, MaxID: 783, MaxAltID: 663},
  {Name: "The Tam-Tara Deepcroft", Bold: true, MaxID: 783, MaxAltID: 669},
  {Name: "Copperbell Mines", Bold: true, MaxID: 783, MaxAltID: 666},
  {Name: "Halatali", MaxAltID: 667},
  {Name: "The Thousand Maws of Toto-Rak", Bold: true, MaxID: 783, MaxAltID: 673},
  {Name: "Haukke Manor", Bold: true, MinID: 783, MaxID: 784, MaxAltID: 670},
  {Name: "Brayflox's Longstop", Bold: true, MinID: 784, MaxID: 785, MaxAltID: 674},
  {Name: "The Sunken Temple of Qarn", MaxAltID: 668},
  {Name: "Cutter's Cry", MaxAltID: 674},
  {Name: "The Stone Vigil", Bold: true, MinID: 785, MaxID: 786, MaxAltID: 672},
  {Name: "Dzemael Darkhold", MaxAltID: 675},
  {Name: "The Aurum Vale", MaxAltID: 676},
  {Name: "The Wanderer's Palace", MaxAltID: 665},
  {Name: "Castrum Meridianum", Bold: true, MinID: 787, MaxID: 788, MaxAltID: 678},
  {Name: "The Praetorium", Bold: true, MinID: 787, MaxID: 788, MaxAltID: 679},
  {Name: "Amdapor Keep", MaxAltID: 671},
  {Name: "Pharos Sirius", MaxAltID: 873},
  {Name: "Copperbell Mines (Hard)", MaxAltID: 871},
  {Name: "Haukke Manor (Hard)", MaxAltID: 872},
  {Name: "The Lost City of Amdapor", MaxAltID: 897},
  {Name: "Halatali (Hard)", MaxAltID: 895},
  {Name: "Brayflox's Longstop (Hard)", MaxAltID: 896},
  {Name: "Hullbreaker Isle", MaxAltID: 993},
  {Name: "The Stone Vigil (Hard)", MaxAltID: 992},
  {Name: "The Tam-Tara Deepcroft (Hard)", MaxAltID: 991},
  {Name: "Snowcloak", Bold: true, MinID: 1001, MaxID: 1029, MaxAltID: 1039},
  {Name: "Sastasha (Hard)", MaxAltID: 1038},
  {Name: "The Sunken Temple of Qarn (Hard)", MaxAltID: 1037},
  {Name: "The Keeper of the Lake", Bold: true, MinID: 1029, MaxID: 1129, MaxAltID: 1072},
  {Name: "The Wanderer's Palace (Hard)", MaxAltID: 1071},
  {Name: "Amdapor Keep (Hard)", MaxAltID: 1070}
]

let hwDungeons = [
  {Name: "The Dusk Vigil", Bold: true, ID: 1208},
  {Name: "Sohm Al", Bold: true, ID: 1209},
  {Name: "The Aery", Bold: true, ID: 1210},
  {Name: "The Vault", Bold: true, ID: 1211},
  {Name: "The Great Gubal Library", Bold: true, ID: 1212},
  {Name: "The Aetherochemical Research Facility", Bold: true, ID: 1213},
  {Name: "Neverreap", ID: 1214},
  {Name: "The Fractal Continuum", ID: 1215},
  {Name: "Saint Mocianne's Arboretum", ID: 1402},
  {Name: "Pharos Sirius (Hard)", ID: 1403},
  {Name: "The Antitower", Bold: true, ID: 1486},
  {Name: "The Lost City of Amdapor (Hard)", ID: 1487},
  {Name: "Sohr Khai", Bold: true, ID: 1599},
  {Name: "Hullbreaker Isle (Hard)", ID: 1600},
  {Name: "Xelphatol", Bold: true, ID: 1637},
  {Name: "The Great Gubal Library (Hard)", ID: 1638},
  {Name: "Baelsar's Wall", Bold: true, ID: 1686},
  {Name: "Sohm Al (Hard)", ID: 1687}
]

let sbDungeons = [
  {Name: "The Sirensong Sea", Bold: true, ID: 1883},
  {Name: "Shisui of the Violet Tides", Bold: true, ID: 1884},
  {Name: "Bardam's Mettle", Bold: true, ID: 1885},
  {Name: "Doma Castle", Bold: true, ID: 1886},
  {Name: "Castrum Abania", Bold: true, ID: 1887},
  {Name: "Ala Mhigo", Bold: true, ID: 1888},
  {Name: "Kugane Castle", ID: 1889},
  {Name: "The Temple of the Fist", ID: 1890},
  {Name: "The Drowned City of Skalla", Bold: true, ID: 1988},
  {Name: "Hells' Lid", ID: 2021},
  {Name: "The Fractal Continuum (Hard)", ID: 2022},
  {Name: "The Swallow's Compass", ID: 2057},
  {Name: "The Burn", Bold: true, ID: 2115},
  {Name: "Saint Mocianne's Arboretum (Hard)", ID: 2116},
  {Name: "The Ghimlyt Dark", Bold: true, ID: 2162}
]

let shbDungeons = [
  {Name: "Holminster Switch", Bold: true, ID: 2377},
  {Name: "Dohn Mheg", Bold: true, ID: 2378},
  {Name: "The Qitana Ravel", Bold: true, ID: 2379},
  {Name: "Malikah's Well", Bold: true, ID: 2380},
  {Name: "Mt. Gulg", Bold: true, ID: 2381},
  {Name: "Amaurot", Bold: true, ID: 2382},
  {Name: "The Twinning", ID: 2383},
  {Name: "Akadaemia Anyder", ID: 2384},
  {Name: "The Grand Cosmos", Bold: true, ID: 2440},
  {Name: "Anamnesis Anyder", Bold: true, ID: 2589},
  {Name: "The Heroes' Gauntlet", Bold: true, ID: 2618},
  {Name: "Matoya's Relict", Bold: true, ID: 2717},
  {Name: "Paglth'an", Bold: true, ID: 2849}
]

let arrTrials = [
  {Name: "The Bowl of Embers", Bold: true, MaxID: 783},
  {Name: "The Navel", Bold: true, MinID: 784, MaxID: 785},
  {Name: "The Howling Eye", Bold: true, MinID: 786, MaxID: 787},
  {Name: "Cape Westwind", Bold: true, MinID: 787, MaxID: 788},
  {Name: "The Chrysalis", Bold: true, ID: 1067, MinID: 1029, MaxID: 1129},
  {Name: "The Steps of Faith", Bold: true, ID: 1065, MinID: 1029, MaxID: 1129},
  {Name: "A Relic Reborn: The Chimera", MinID: 788},
  {Name: "A Relic Reborn: The Hydra", MinID: 788},
  {Name: "Battle on the Big Bridge", MinID: 788, MaxID: 1061},
  {Name: "The Dragon's Neck", MinID: 788, MaxID: 1061},
  {Name: "Battle in the Big Keep", ID: 1066},
  {Name: "The Bowl of Embers (Hard)", MinID: 788, MaxID: 747, MaxAltID: 855},
  {Name: "The Howling Eye (Hard)", MinID: 788, MaxID: 747, MaxAltID: 856},
  {Name: "The Navel (Hard)", MinID: 788, MaxID: 747, MaxAltID: 857},
  {Name: "Thornmarch (Hard)", Bold: true, MinID: 788, MaxID: 898},
  {Name: "The Whorleater (Hard)", Bold: true, MinID: 898, MaxID: 899},
  {Name: "The Striking Tree (Hard)", Bold: true, MinID: 899, MaxID: 1001},
  {Name: "Akh Afah Amphitheatre (Hard)", Bold: true, MinID: 1001, MaxID: 1029},
  {Name: "Urth's Fount", MinID: 788, ID: 1064}
]

let hwTrials = [
  {Name: "Thok ast Thok (Hard)", Bold: true, MinID: 1134, MaxID: 1135},
  {Name: "The Limitless Blue (Hard)", Bold: true, MinID: 1136, MaxID: 1137},
  {Name: "The Singularity Reactor", Bold: true, MinID: 1138, MaxID: 1139},
  {Name: "The Final Steps of Faith", Bold: true, MinID: 1493, MaxID: 1594},
  {Name: "Containment Bay S1T7", MinID: 1139, MaxAltID: 1485},
  {Name: "Containment Bay P1T6", MinID: 1139, MaxAltID: 1636},
  {Name: "Containment Bay Z1T9", MinID: 1139, MaxAltID: 1685}
]

let sbTrials = [
  {Name: "The Pool of Tribute", Bold: true, MinID: 1788, MaxID: 1789},
  {Name: "Emanation", Bold: true, MinID: 1792, MaxID: 1793},
  {Name: "The Royal Menagerie", Bold: true, MinID: 1793, MaxID: 1794},
  {Name: "Castrum Fluminis", Bold: true, MinID: 2013, MaxID: 2098},
  {Name: "Kugane Ohashi", ID: 2236},
  {Name: "The Great Hunt", ID: 2108},
  {Name: "The Jade Stoa", MinID: 2057, MaxAltID: 2023},
  {Name: "Hells' Kier", MinID: 2057, MaxAltID: 2117},
  {Name: "The Wreath of Snakes", MinID: 2057, MaxAltID: 2165}
]

let shbTrials = [
  {Name: "The Dancing Plague", Bold: true, MinID: 2293, MaxID: 2294},
  {Name: "The Crown of the Immaculate", Bold: true, MinID: 2296, MaxID: 2297},
  {Name: "The Dying Gasp", Bold: true, MinID: 2297, MaxID: 2298},
  {Name: "Cinder Drift", MinID: 2424, MaxID: 2887, MaxAltID: 2590},
  {Name: "The Seat of Sacrifice", Bold: true, MinID: 2587, MaxID: 2642},
  {Name: "Castrum Marinum", MinID: 2424, MaxID: 2887, MaxAltID: 2718},
  {Name: "The Cloud Deck", MinID: 2424, MaxID: 2887, MaxAltID: 2846}
]

let arrTrialsEx = [
  {Name: "The Minstrel's Ballad: Ultima's Bane"},
  {Name: "The Howling Eye (Extreme)", ID: 856},
  {Name: "The Navel (Extreme)", ID: 857},
  {Name: "The Bowl of Embers (Extreme)", ID: 855},
  {Name: "Thornmarch (Extreme)", ID: 894},
  {Name: "The Whorleater (Extreme)", ID: 893},
  {Name: "The Striking Tree (Extreme)", ID: 994},
  {Name: "Akh Afah Amphitheatre (Extreme)", ID: 1045}
]

let hwTrialsEx = [
  {Name: "The Limitless Blue (Extreme)", ID: 1220},
  {Name: "Thok ast Thok (Extreme)", ID: 1221},
  {Name: "The Minstrel's Ballad: Thordan's Reign 	", ID: 1400},
  {Name: "The Minstrel's Ballad: Nidhogg's Rage", ID: 1601},
  {Name: "Containment Bay S1T7 (Extreme)", ID: 1485},
  {Name: "Containment Bay P1T6 (Extreme)", ID: 1636},
  {Name: "Containment Bay Z1T9 (Extreme)", ID: 1685}
]

let sbTrialsEx = [
  {Name: "The Pool of Tribute (Extreme)", ID: 1902},
  {Name: "Emanation (Extreme)", ID: 1901},
  {Name: "The Minstrel's Ballad: Shinryu's Domain", ID: 1989},
  {Name: "The Minstrel's Ballad: Tsukuyomi's Pain", ID: 2060},
  {Name: "The Great Hunt (Extreme)", ID: 2109},
  {Name: "The Jade Stoa (Extreme)", ID: 2023},
  {Name: "Hells' Kier (Extreme)", ID: 2117},
  {Name: "The Wreath of Snakes (Extreme)", ID: 2165}
]

let shbTrialsEx = [
  {Name: "The Dancing Plague (Extreme)", ID: 2385},
  {Name: "The Crown of the Immaculate (Extreme)", ID: 2386},
  {Name: "Minstrel's Ballad: Hades's Elegy", ID: 2441},
  {Name: "Cinder Drift (Extreme)", ID: 2590},
  {Name: "Memoria Misera (Extreme)", ID: 2586},
  {Name: "The Seat of Sacrifice (Extreme)", ID:2621},
  {Name: "Castrum Marinum (Extreme)", ID: 2718},
  {Name: "The Cloud Deck (Extreme)", ID: 2846}
]

let arrRaids = [
  {Name: "Labyrinth of the Ancients", Bold: true, ID: 883},
  {Name: "Syrcus Tower", Bold: true, ID: 995},
  {Name: "The World of Darkness", Bold: true, ID: 1068},
  {Name: "The Binding Coil of Bahamut", ID: 747},
  {Name: "The Second Coil of Bahamut", ID: 887},
  {Name: "The Final Coil of Bahamut", ID: 1040}
]

let hwRaids = [
  {Name: "The Void Ark", ID: 1399},
  {Name: "The Weeping City of Mhach", ID: 1574},
  {Name: "Dun Scaith", ID: 1689},
  {Name: "Alexander: Gordias", ID: 1228},
  {Name: "Alexander: Midas", ID: 1476},
  {Name: "Alexander: The Creator", ID: 1639}
]

let sbRaids = [
  {Name: "The Royal City of Rabanastre 	", ID: 1992},
  {Name: "The Ridorana Lighthouse", ID: 2106},
  {Name: "The Orbonne Monastery", ID: 2164},
  {Name: "Omega: Deltascape", ID: 1895},
  {Name: "Omega: Sigmascape", ID: 2024},
  {Name: "Omega: Alphascape", ID: 2118}
]

let shbRaids = [
  {Name: "The Copied Factory", ID: 2443},
  {Name: "The Puppets' Bunker", ID: 2622},
  {Name: "The Tower at Paradigm's Breach", ID: 2847},
  {Name: "Eden's Gate", ID: 2409},
  {Name: "Eden's Verse", ID: 2591},
  {Name: "Eden's Promise", ID: 2719}
]

let arrRaidsS = [
  {Name: "The Second Coil of Bahamut (Savage)", ID: 1000}
]

let hwRaidsS = [
  {Name: "Alexander: Gordias (Savage)", ID: 1231},
  {Name: "Alexander: Midas (Savage)", ID: 1479},
  {Name: "Alexander: The Creator (Savage)", ID: 1642}
]

let sbRaidsS = [
  {Name: "Omega: Deltascape (Savage)", ID: 1898},
  {Name: "Omega: Sigmascape (Savage)", ID: 2027},
  {Name: "Omega: Alphascape (Savage)", ID: 2121},
  {Name: "The Unending Coil of Bahamut (Ultimate)", ID: 1993},
  {Name: "The Minstrel's Ballad: The Weapon's Refrain (Ultimate)", ID: 2107}
]

let shbRaidsS = [
  {Name: "Eden's Gate (Savage)", ID: 2412},
  {Name: "Eden's Verse (Savage)", ID: 2594},
  {Name: "Eden's Promise (Savage)", ID: 2722},
  {Name: "The Epic of Alexander (Ultimate)", ID: 2444}
]

let sbExploratory = [
  {Name: "Baldesion Arsenal", ID: 2227}
]

let shbExploratory = [
  {Name: "Castrum Lacus Litore", ID: 2680},
  {Name: "Delubrum Reginae", ID: 2762},
  {Name: "Delubrum Reginae (Savage)", ID: 2765},
  {Name: "Dalriada", ID: 2874}
]

let categories = ["arr-dungeons", "hw-dungeons", "sb-dungeons", "shb-dungeons",
                    "arr-trials", "hw-trials", "sb-trials", "shb-trials",
                    "arr-trials-ex", "hw-trials-ex", "sb-trials-ex", "shb-trials-ex",
                    "arr-raids", "hw-raids", "sb-raids", "shb-raids",
                    "arr-raids-s", "hw-raids-s", "sb-raids-s", "shb-raids-s",
                    "sb-exploratory", "shb-exploratory"]

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

  renderList("#arr-dungeons", arrDungeons)
  renderList("#hw-dungeons", hwDungeons)
  renderList("#sb-dungeons", sbDungeons)
  renderList("#shb-dungeons", shbDungeons)

  renderList("#arr-trials", arrTrials)
  renderList("#hw-trials", hwTrials)
  renderList("#sb-trials", sbTrials)
  renderList("#shb-trials", shbTrials)

  renderList("#arr-trials-ex", arrTrialsEx)
  renderList("#hw-trials-ex", hwTrialsEx)
  renderList("#sb-trials-ex", sbTrialsEx)
  renderList("#shb-trials-ex", shbTrialsEx)

  renderList("#arr-raids", arrRaids)
  renderList("#hw-raids", hwRaids)
  renderList("#sb-raids", sbRaids)
  renderList("#shb-raids", shbRaids)

  renderList("#arr-raids-s", arrRaidsS)
  renderList("#hw-raids-s", hwRaidsS)
  renderList("#sb-raids-s", sbRaidsS)
  renderList("#shb-raids-s", shbRaidsS)

  renderList("#sb-exploratory", sbExploratory)
  renderList("#shb-exploratory", shbExploratory)
}

let characterData = JSON.parse(localStorage.getItem("character"))
let achievementData = JSON.parse(localStorage.getItem("achievements"))
let achievementsPublicData = JSON.parse(localStorage.getItem("achievementsPublic"))
let achievements = new Map()
renderPage()