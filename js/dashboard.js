// Render character information.
function renderPage() {
    if (characterData == null) {
        renderError("Character data could not be found. You can load a character from the <a class='alert-link' href='settings.html'>Settings</a>.")
        $("#portrait-block").removeClass("d-md-block")
        return
    }

    $("#character-portrait").html("<img width='100%' class='shadow-sm p-2 mb-2 bg-body rounded' src='" + characterData["Portrait"] + "'>")

    let infoBio = characterData["Bio"]
    if (infoBio != null && infoBio != "-") {
        $("#character-bio").removeClass("text-muted fst-italic")
        $("#character-bio").html("<b>Bio:</b> " + infoBio)
    }

    let infoFreeCompanyName = characterData["FreeCompanyName"]

    let infoAchievements = achievementData["List"].length
    if (infoAchievements == 0) infoAchievements = "Data unavailable"

    let infoElementalLevel = characterData["ClassJobsElemental"]["Level"]
    if (infoElementalLevel == null) infoElementalLevel = 0

    let infoResistanceRank = characterData["ClassJobsBozjan"]["Level"]
    if (infoResistanceRank == null) infoResistanceRank = 0

    let characterInfo = "<b>World:</b> " + characterData["DC"] + "/" + characterData["Server"] + "<br>"
    characterInfo += "<b>Free Company:</b> " + infoFreeCompanyName + "<br><br>"
    characterInfo += "<b>Achievements:</b> " + infoAchievements + "<br><br>"
    characterInfo += "<b>Elemental level:</b> " + infoElementalLevel + "<br>"
    characterInfo += "<b>Resistance rank:</b> " + infoResistanceRank
    $("#character-info").html(characterInfo)
}
renderPage()