let searchParams = new URLSearchParams(window.location.search)
if (!searchParams.has("id")) {
  alert("You forgot your ID.")
  throw new Error();
}
let characterID = searchParams.get("id")

let sb_trials_ex = [
  {Name: "Emanation (Extreme)", ID: 1901},
  {Name: "The Pool of Tribute (Extreme)", ID: 1902},
  {Name: "The Minstrel's Ballad: Shinryu's Domain", ID: 1989},
  {Name: "The Jade Stoa (Extreme)", ID: 2023},
  {Name: "The Minstrel's Ballad: Tsukuyomi's Pain", ID: 2060},
  {Name: "The Great Hunt (Extreme)", ID: 2109},
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

let achievements

function renderList(id, list) {
  let html = ""
    for (let i = 0; i < list.length; i++) {
      if (achievements.has(list[i]["ID"])) {
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

    console.log(achievements)
		console.log(data)


    $("#c_name").html(character["Name"])

    renderList("#a_sb_trials_ex", sb_trials_ex)
    renderList("#a_shb_trials_ex", shb_trials_ex)
	}
});
