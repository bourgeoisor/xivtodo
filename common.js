// Render and display the error alert.
function renderError(message) {
    $("#error-block").show()
    $("#error-msg").html(message)
  }

// Generate the tooltips.
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

// Wait 50ms before showing the page.
function displayPage() {
  $("main").css("display", "block")
}
setTimeout(displayPage, 50)

// Render an array of items into a list of completion based on achievements.
function renderList(id, list) {
  let html = ""
  for (let i = 0; i < list.length; i++) {
    let cleared = 0 // Not cleared
    if ("ID" in list[i] && achievements.has(list[i]["ID"])) cleared = 1 // Cleared
    else if ("MaxID" in list[i] && achievements.has(list[i]["MaxID"])) cleared = 1 // Cleared
    else if ("MaxAltID" in list[i] && achievements.has(list[i]["MaxAltID"])) cleared = 1 // Cleared
    else if ("MinID" in list[i] && achievements.has(list[i]["MinID"])) cleared = -1 // Maybe
    else if ("MinID" in list[i] && !achievements.has(list[i]["MinID"])) cleared = 0 // Not cleared
    else if (!("ID" in list[i])) cleared = -1 // Maybe

    html += "<li class='list-group-item d-flex justify-content-between align-items-center "
    if (cleared == -1) {
      html += "text-secondary'><span class='bi-question-square'>"
    } else if (cleared == 1) {
      html += "text-success'><span class='bi-check-square'>"
    } else {
      html += "text-danger'><span class='bi-square'>"
    }
    html += "&nbsp;&nbsp;"
    if (list[i]["Bold"]) html += "<b>" + list[i]["Name"] + "</b>"
    else html += list[i]["Name"]
    html += "</span>"
    // @TODO: Display date (on hover?)
    // if (achievements.has(list[i]["ID"])) {
    //   html += moment.unix(achievements.get(list[i]["ID"])).format('dddd, MMMM Do, YYYY h:mm:ss A')
    // }
    html += "</li>"
  }
  $(id).html(html)
}

// Render a list of categories with no data.
function renderEmpty(categories) {
  for (let i = 0; i < categories.length; i++) {
    $("#" + categories[i]).html("<li class='list-group-item d-flex justify-content-between align-items-center'>No data to display.</li>")
  }
}