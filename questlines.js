function renderPage() {
    if (characterData == null) {
        $("#character-name").html("No Data")
        renderError("Character data could not be found. You can load a character from the <a class='alert-link' href='settings.html'>Settings</a>.")
        renderEmpty()
        return
      }
    
      $("#character-name").html(characterData["Name"])
}

let characterData = JSON.parse(localStorage.getItem("character"))
let achievementData = JSON.parse(localStorage.getItem("achievements"))
let achievementsPublicData = JSON.parse(localStorage.getItem("achievementsPublic"))
let achievements = new Map()
renderPage()