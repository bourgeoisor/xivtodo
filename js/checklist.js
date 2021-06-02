let weeklies = [
    {ID: 100, Name: "Weekly repeatable quests"},
    {ID: 101, Name: "Hunt marks"},
    {ID: 102, Name: "Challenge logs"},
    {ID: 103, Name: "Beast tribes"},
    {ID: 104, Name: "Squadron priority mission"},
    {ID: 105, Name: "Custom delivery"},
    {ID: 106, Name: "Wondrous Tails"},
    {ID: 107, Name: "Cap weekly tomestone"},
    {ID: 108, Name: "Faux Hollows"},
    {ID: 109, Name: "Masque Carnivale"},
    {ID: 110, Name: "Blue mage logs"},
    {ID: 111, Name: "Normal raid lockouts"},
    {ID: 112, Name: "Savage raid lockouts"},
    {ID: 113, Name: "Alliance raid lockouts"},
    {ID: 114, Name: "Doman enclave donation"},
    {ID: 115, Name: "Gold Saucer tournaments"},
    {ID: 116, Name: "Fashion report"},
    {ID: 117, Name: "Jumbo Cactpot"}
]

let dailies = [
    {ID: 200, Name: "Daily repeatable quests"},
    {ID: 201, Name: "Hunt marks"},
    {ID: 202, Name: "Map allocation"},
    {ID: 203, Name: "Squadron missions"},
    {ID: 204, Name: "Grand company turn-ins"},
    {ID: 205, Name: "Duty roulettes"},
    {ID: 206, Name: "Mini Cactpot"},
    {ID: 207, Name: "Retainer ventures"},
    {ID: 208, Name: "Housing gardening"},
    {ID: 209, Name: "Daily leve allowance"}
]

let todosHidden = new Set()
let todosHiddenData = JSON.parse(localStorage.getItem("todosHidden"))
if (todosHiddenData != null) todosHidden = new Set(todosHiddenData)

let todosCompleted = new Set()
let todosCompletedData = JSON.parse(localStorage.getItem("todosCompleted"))
if (todosCompletedData != null) todosCompleted = new Set(todosCompletedData)

// Render the weeklies checklist.
let weekliesHtml = ""
for (let i = 0; i < weeklies.length; i++) {
    if (todosHidden.has(weeklies[i]["ID"])) continue

    weekliesHtml += "<label class='list-group-item user-select-none'><input class='form-check-input' type='checkbox' value='' id='"
                 + weeklies[i]["Name"] + "' onclick='todoToggled(" + weeklies[i]["ID"] + ")'"
    if (todosCompleted.has(weeklies[i]["ID"])) weekliesHtml += " checked"
    weekliesHtml += ">&nbsp;&nbsp;" + weeklies[i]["Name"] + "</label>"
}
$("#weeklies").html(weekliesHtml)

// Render the dailies checklist.
let dailiesHtml = ""
for (let i = 0; i < dailies.length; i++) {
    if (todosHidden.has(dailies[i]["ID"])) continue

    dailiesHtml += "<label class='list-group-item user-select-none'><input class='form-check-input' type='checkbox' value='' id='"
                 + dailies[i]["Name"] + "' onclick='todoToggled(" + dailies[i]["ID"] + ")'"
    if (todosCompleted.has(dailies[i]["ID"])) dailiesHtml += " checked"
    dailiesHtml += ">&nbsp;&nbsp;" + dailies[i]["Name"] + "</label>"
}
$("#dailies").html(dailiesHtml)

function todoToggled(id) {
    if (todosCompleted.has(id)) {
        todosCompleted.delete(id)
    } else {
        todosCompleted.add(id)
    }

    localStorage.setItem("todosCompleted", JSON.stringify(Array.from(todosCompleted)))
}

// Find the timings between now and the next daily and weekly resets,
// and render those timings. Note that the reset times are in JST.
function setTimeUntilResets() {
    // JST is +9 hours relative to UTC.
    let now = moment().utc().add(9, 'hours')

    // Find the diff until the next midnight JST and render it.
    let nextDailyReset = now.clone().startOf('day').add(1, 'day')
    let dailyResetDuration = moment.duration(nextDailyReset.diff(now))

    let dailiesReset = ""
    if (dailyResetDuration.hours()%24 > 0) dailiesReset = dailyResetDuration.hours()%24 + "h " + dailyResetDuration.minutes() + "m"
    else dailiesReset = dailyResetDuration.minutes() + "m"
    $("#dailies-reset").html(dailiesReset)

    // Find the diff until the next Tuesday 5pm JST and render it.
    let nextWeeklyReset = now.clone().startOf('isoWeek').add(1, 'week').add(17 , 'hours').day("tuesday")
    let weeklyResetDuration = moment.duration(nextWeeklyReset.diff(now))

    let weekliesReset = ""
    if (weeklyResetDuration.days()%7 > 0) weekliesReset = weeklyResetDuration.days()%7 + "d " + weeklyResetDuration.hours() + "h"
    else if (weeklyResetDuration.hours() > 0) weekliesReset = weeklyResetDuration.hours() + "h " + weeklyResetDuration.minutes() + "m"
    else weekliesReset = weeklyResetDuration.minutes() + "m"
    $("#weeklies-reset").html(weekliesReset)
}
setTimeUntilResets()
setInterval(setTimeUntilResets, 60*1000)
