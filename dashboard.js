function renderPage() {
    if (characterData == null) {
      $("#character-name").html("No Data")
      renderError("Character data could not be found. You can load a character from the <a class='alert-link' href='settings.html'>Settings</a>.")
      renderEmpty(categories)
      return
    }
  
    $("#character-name").html(characterData["Name"])

    let characterInfo = "World: " + characterData["DC"] + "/" + characterData["Server"] + "<br><br>"
    characterInfo += "Achievements: " + achievementData["List"].length + "<br><br>"
    characterInfo += "Elemental level: " + characterData["ClassJobsElemental"]["Level"] + "<br>"
    characterInfo += "Resistance rank: " + characterData["ClassJobsBozjan"]["Level"]
    $("#character-info").html(characterInfo)

    $("#character-portrait").html("<img width='300px' class='img-thumbnail' src='" + characterData["Portrait"] + "'>")
}
renderPage()