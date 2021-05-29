let arr_trials_ex = [
  {Name: "The Minstrel's Ballad: Ultima's Bane", ID: -1},
  {Name: "The Howling Eye (Extreme)", ID: 856},
  {Name: "The Navel (Extreme)", ID: 857},
  {Name: "The Bowl of Embers (Extreme)", ID: 855},
  {Name: "Thornmarch (Extreme)", ID: 894},
  {Name: "The Whorleater (Extreme)", ID: 893},
  {Name: "The Striking Tree (Extreme)", ID: 994},
  {Name: "Akh Afah Amphitheatre (Extreme)", ID: 1045}
]

let hw_trials_ex = [
  {Name: "The Limitless Blue (Extreme)", ID: 1220},
  {Name: "Thok ast Thok (Extreme)", ID: 1221},
  {Name: "The Minstrel's Ballad: Thordan's Reign 	", ID: 1400},
  {Name: "The Minstrel's Ballad: Nidhogg's Rage", ID: 1601},
  {Name: "Containment Bay S1T7 (Extreme)", ID: 1485},
  {Name: "Containment Bay P1T6 (Extreme)", ID: 1636},
  {Name: "Containment Bay Z1T9 (Extreme)", ID: 1685}
]

let sb_trials_ex = [
  {Name: "The Pool of Tribute (Extreme)", ID: 1902},
  {Name: "Emanation (Extreme)", ID: 1901},
  {Name: "The Minstrel's Ballad: Shinryu's Domain", ID: 1989},
  {Name: "The Minstrel's Ballad: Tsukuyomi's Pain", ID: 2060},
  {Name: "The Great Hunt (Extreme)", ID: 2109},
  {Name: "The Jade Stoa (Extreme)", ID: 2023},
  {Name: "Hells' Kier (Extreme)", ID: 2117},
  {Name: "The Wreath of Snakes (Extreme)", ID: 2165}
]

let shb_trials_ex = [
  {Name: "The Dancing Plague (Extreme)", ID: 2385},
  {Name: "The Crown of the Immaculate (Extreme)", ID: 2386},
  {Name: "Minstrel's Ballad: Hades's Elegy", ID: 2441},
  {Name: "Cinder Drift (Extreme)", ID: 2590},
  {Name: "Memoria Misera (Extreme)", ID: 2586},
  {Name: "The Seat of Sacrifice (Extreme)", ID:2621},
  {Name: "Castrum Marinum (Extreme)", ID: 2718},
  {Name: "The Cloud Deck (Extreme)", ID: 2846}
]

let arr_raids = [
  {Name: "Labyrinth of the Ancients", ID: 883},
  {Name: "Syrcus Tower", ID: 995},
  {Name: "The World of Darkness", ID: 1068},
  {Name: "The Binding Coil of Bahamut", ID: 747},
  {Name: "The Second Coil of Bahamut", ID: 887},
  {Name: "The Final Coil of Bahamut", ID: 1040}
]

let hw_raids = [
  {Name: "The Void Ark", ID: 1399},
  {Name: "The Weeping City of Mhach", ID: 1574},
  {Name: "Dun Scaith", ID: 1689},
  {Name: "Alexander: Gordias", ID: 1228},
  {Name: "Alexander: Midas", ID: 1476},
  {Name: "Alexander: The Creator", ID: 1639}
]

let sb_raids = [
  {Name: "The Royal City of Rabanastre 	", ID: 1992},
  {Name: "The Ridorana Lighthouse", ID: 2106},
  {Name: "The Orbonne Monastery", ID: 2164},
  {Name: "Omega: Deltascape", ID: 1895},
  {Name: "Omega: Sigmascape", ID: 2024},
  {Name: "Omega: Alphascape", ID: 2118}
]

let shb_raids = [
  {Name: "The Copied Factory", ID: 2443},
  {Name: "The Puppets' Bunker", ID: 2622},
  {Name: "The Tower at Paradigm's Breach", ID: 2847},
  {Name: "Eden's Gate", ID: 2409},
  {Name: "Eden's Verse", ID: 2591},
  {Name: "Eden's Promise", ID: 2719}
]

let arr_raids_s = [
  {Name: "The Second Coil of Bahamut (Savage)", ID: 1000}
]

let hw_raids_s = [
  {Name: "Alexander: Gordias (Savage)", ID: 1231},
  {Name: "Alexander: Midas (Savage)", ID: 1479},
  {Name: "Alexander: The Creator (Savage)", ID: 1642}
]

let sb_raids_s = [
  {Name: "Omega: Deltascape (Savage)", ID: 1898},
  {Name: "Omega: Sigmascape (Savage)", ID: 2027},
  {Name: "Omega: Alphascape (Savage)", ID: 2121},
  {Name: "The Unending Coil of Bahamut (Ultimate)", ID: 1993},
  {Name: "The Minstrel's Ballad: The Weapon's Refrain (Ultimate)", ID: 2107}
]

let shb_raids_s = [
  {Name: "Eden's Gate (Savage)", ID: 2412},
  {Name: "Eden's Verse (Savage)", ID: 2594},
  {Name: "Eden's Promise (Savage)", ID: 2722},
  {Name: "The Epic of Alexander (Ultimate)", ID: 2444}
]

let searchParams = new URLSearchParams(window.location.search)
if (!searchParams.has("id")) {
  $("#error").show()
  $("#error").html("<b>Error:</b> The URL must contain a character ID.")
  throw new Error();
}
let characterID = searchParams.get("id")

let achievements

function renderList(id, list) {
  let html = ""
    for (let i = 0; i < list.length; i++) {
      if (list[i]["ID"] == -1) {
        html += "<li>"
      } else if (achievements.has(list[i]["ID"])) {
        html += "<li style='color: green;'>"
      } else {
        html += "<li style='color: red;'>"
      }
      html += list[i]["Name"] + "</li>"
    }
    $(id).html(html)
}

$.ajax({
	url: "https://xivapi.com/character/" + characterID + "?data=AC",
	dataType: "json",
	success: function(data) {
    let character = data["Character"]
    achievements = new Map()
    for (let i = 0; i < data["Achievements"]["List"].length; i++) {
      achievements.set(data["Achievements"]["List"][i]["ID"], data["Achievements"]["List"][i]["Date"])
    }

		console.log(data)

    $("#c_name").html(character["Name"])

    if (!data["AchievementsPublic"]) {
      $("#error").show()
      $("#error").html("<b>Error:</b> The achievements for this character are not set as public.")
    }

    renderList("#arr_trials_ex", arr_trials_ex)
    renderList("#hw_trials_ex", hw_trials_ex)
    renderList("#sb_trials_ex", sb_trials_ex)
    renderList("#shb_trials_ex", shb_trials_ex)

    renderList("#arr_raids", arr_raids)
    renderList("#hw_raids", hw_raids)
    renderList("#sb_raids", sb_raids)
    renderList("#shb_raids", shb_raids)

    renderList("#arr_raids_s", arr_raids_s)
    renderList("#hw_raids_s", hw_raids_s)
    renderList("#sb_raids_s", sb_raids_s)
    renderList("#shb_raids_s", shb_raids_s)
	}
});
