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