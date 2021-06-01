function saveSettings() {
    let settingsFormValues = new FormData(document.querySelector("#settings-form"))

    $("#settings-save-btn").prop('disabled', true)
    $("#settings-save-btn").html("<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Saving...")

    $.ajax({
        url: "https://xivapi.com/character/" + settingsFormValues.get("inputCharacterID") + "?data=AC",
        dataType: "json",
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            renderError("The character ID you've entered does not exist.")

            $("#settings-save-btn").prop('disabled', false)
            $("#settings-save-btn").html("Save")
        },
        success: function(data) {
            localStorage.setItem("characterID", settingsFormValues.get("inputCharacterID"))
            localStorage.setItem("character", JSON.stringify(data["Character"]))
            localStorage.setItem("achievements", JSON.stringify(data["Achievements"]))
            localStorage.setItem("achievementsPublic", JSON.stringify(data["AchievementsPublic"]))

            $("#settings-save-btn").prop('disabled', false)
            $("#settings-save-btn").html("Save")
        }
    })
}

let characterID = localStorage.getItem("characterID")
if (characterID != null) {
    $("#inputCharacterID").val(characterID)
}
