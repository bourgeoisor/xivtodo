function renderError(message) {
    $("#error-block").show()
    $("#error-msg").html(message)
  }

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

function displayPage() {
  $("main").css("display", "block")
}
setTimeout(displayPage, 50)