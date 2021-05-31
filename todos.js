let weeklies = [
    {Name: "Weekly repeatable quests"},
    {Name: "Hunt marks"},
    {Name: "Challenge logs"},
    {Name: "Beast tribes"},
    {Name: "Custom delivery"},
    {Name: "Wondrous Tails"},
    {Name: "Cap weekly tomestone"},
    {Name: "Faux Hollows"},
    {Name: "Masque Carnivale"},
    {Name: "Blue mage logs"},
    {Name: "Normal raid lockout"},
    {Name: "Alliance raid lockout"},
    {Name: "Doman reconstruction donation"},
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
    {Name: "Retainer ventures"}
]

let weekliesHtml = ""
for (let i = 0; i < weeklies.length; i++) {
    weekliesHtml += "<li class='list-group-item d-flex justify-content-between align-items-center'>"
                 + "<div class='form-check'><input class='form-check-input' type='checkbox' value='' id='"
                 + weeklies[i]["Name"] + "'><label class='form-check-label' for='" + weeklies[i]["Name"] + "'>"
                 + weeklies[i]["Name"] + "</label></div></li>"
}
$("#weeklies").html(weekliesHtml)

let dailiesHtml = ""
for (let i = 0; i < dailies.length; i++) {
    dailiesHtml += "<li class='list-group-item d-flex justify-content-between align-items-center'>"
                + "<div class='form-check'><input class='form-check-input' type='checkbox' value='' id='"
                + dailies[i]["Name"] + "'><label class='form-check-label' for='" + dailies[i]["Name"] + "'>"
                + dailies[i]["Name"] + "</label></div></li>"
}
$("#dailies").html(dailiesHtml)