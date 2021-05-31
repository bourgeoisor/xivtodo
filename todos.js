let weeklies = [
    {Name: "Weekly repeatable quests"},
    {Name: "Hunt marks"},
    {Name: "Challenge logs"},
    {Name: "Beast tribes"},
    {Name: "Squadron priority mission"},
    {Name: "Custom delivery"},
    {Name: "Wondrous Tails"},
    {Name: "Cap weekly tomestone"},
    {Name: "Faux Hollows"},
    {Name: "Masque Carnivale"},
    {Name: "Blue mage logs"},
    {Name: "Normal raid lockouts"},
    {Name: "Savage raid lockouts"},
    {Name: "Alliance raid lockouts"},
    {Name: "Doman enclave donation"},
    {Name: "Gold Saucer tournaments"},
    {Name: "Fashion report"},
    {Name: "Jumbo Cactpot"}
]

let dailies = [
    {Name: "Daily repeatable quests"},
    {Name: "Hunt marks"},
    {Name: "Map allocation"},
    {Name: "Squadron missions"},
    {Name: "Grand company turn-ins"},
    {Name: "Duty roulettes"},
    {Name: "Mini Cactpot"},
    {Name: "Retainer ventures"},
    {Name: "Housing gardening"},
    {Name: "Daily leve allowance"}
]

// Render the weeklies checklist.
let weekliesHtml = ""
for (let i = 0; i < weeklies.length; i++) {
    weekliesHtml += "<li class='list-group-item d-flex justify-content-between align-items-center'>"
                 + "<div class='form-check'><input class='form-check-input' type='checkbox' value='' id='"
                 + weeklies[i]["Name"] + "'><label class='form-check-label' for='" + weeklies[i]["Name"] + "'>"
                 + weeklies[i]["Name"] + "</label></div></li>"
}
$("#weeklies").html(weekliesHtml)

// Render the dailies checklist.
let dailiesHtml = ""
for (let i = 0; i < dailies.length; i++) {
    dailiesHtml += "<li class='list-group-item d-flex justify-content-between align-items-center'>"
                + "<div class='form-check'><input class='form-check-input' type='checkbox' value='' id='"
                + dailies[i]["Name"] + "'><label class='form-check-label' for='" + dailies[i]["Name"] + "'>"
                + dailies[i]["Name"] + "</label></div></li>"
}
$("#dailies").html(dailiesHtml)

// Find the timings between now and the next daily and weekly resets,
// and render those timings. Note that the reset times are in JST.
function setTimeUntilResets() {
    // JST is +9 hours relative to UTC.
    let now = moment().utc().add(9, 'hours');

    // Find the diff until the next midnight JST and render it.
    let nextDailyReset = now.clone().startOf('day').add(1, 'day');
    let dailyResetDuration = moment.duration(nextDailyReset.diff(now));

    let dailiesReset = ""
    if (dailyResetDuration.hours()%24 > 0) dailiesReset = dailyResetDuration.hours()%24 + "h " + dailyResetDuration.minutes() + "m";
    else dailiesReset = dailyResetDuration.minutes() + "m " + dailyResetDuration.seconds() + "s";
    $("#dailies-reset").html(dailiesReset)

    // Find the diff until the next Tuesday 5pm JST and render it.
    let nextWeeklyReset = now.clone().startOf('isoWeek').add(1, 'week').add(17 , 'hours').day("tuesday");
    let weeklyResetDuration = moment.duration(nextWeeklyReset.diff(now));

    let weekliesReset = ""
    if (weeklyResetDuration.days()%7 > 0) weekliesReset = weeklyResetDuration.days()%7 + "d " + weeklyResetDuration.hours() + "h";
    else if (weeklyResetDuration.hours() > 0) weekliesReset = weeklyResetDuration.hours() + "h " + weeklyResetDuration.minutes() + "m";
    else weekliesReset = weeklyResetDuration.minutes() + "m " + weeklyResetDuration.seconds() + "s";
    $("#weeklies-reset").html(weekliesReset)
}
setTimeUntilResets();
setInterval(setTimeUntilResets, 60*1000);