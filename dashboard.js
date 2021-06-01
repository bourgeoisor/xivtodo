function renderPage() {
    if (characterData == null) {
      $("#character-name").html("No Data")
      renderError("Character data could not be found. You can load a character from the <a class='alert-link' href='settings.html'>Settings</a>.")
      renderEmpty(categories)
      return
    }
  
    $("#character-name").html(characterData["Name"])
}
renderPage()