<template>
  <div class="container">
    <h1>Checklist</h1>
    <hr />
    <div class="row">
      <h2>Things to do</h2>

      <div class="col-md">
        <h3>
          Weeklies
          <small class="text-muted">&mdash; <span id="weeklies-reset">?</span> until reset</small>
        </h3>

        <ul class="list-group list-group-flush">
          <ChecklistItem
            v-for="item of weeklies"
            :key="item.Title"
            :id="item.ID"
            :title="item.Title"
          />
        </ul>
        <br />
      </div>

      <div class="col-md">
        <h3>
          Dailies
          <small class="text-muted">&mdash; <span id="dailies-reset">?</span> until reset</small>
        </h3>

        <ul class="list-group list-group-flush">
          <ChecklistItem
            v-for="item of dailies"
            :key="item.Title"
            :id="item.ID"
            :title="item.Title"
          />
        </ul>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import ChecklistItem from "@/components/ChecklistItem.vue";

export default {
  name: "Checklist",
  data() {
    return {
      weeklies: [
        { ID: 100, Title: "Weekly repeatable quests" },
        { ID: 101, Title: "Weekly hunt marks" },
        { ID: 102, Title: "Squadron priority mission" },
        { ID: 103, Title: "Challenge logs" },
        { ID: 104, Title: "Custom delivery" },
        { ID: 105, Title: "Wondrous Tails" },
        { ID: 106, Title: "Cap weekly tomestone" },
        { ID: 107, Title: "Doman enclave donation" },
        { ID: 108, Title: "Normal raid lockouts" },
        { ID: 109, Title: "Savage raid lockouts" },
        { ID: 110, Title: "Alliance raid lockout" },
        { ID: 111, Title: "Faux Hollows" },
        { ID: 112, Title: "Masque Carnivale" },
        { ID: 113, Title: "Blue mage logs" },
        { ID: 114, Title: "Gold Saucer tournaments" },
        { ID: 115, Title: "Fashion report" },
        { ID: 116, Title: "Jumbo Cactpot" },
      ],
      dailies: [
        { ID: 200, Title: "Daily repeatable quests" },
        { ID: 201, Title: "Daily hunt marks" },
        { ID: 202, Title: "Squadron missions" },
        { ID: 203, Title: "Grand company turn-ins" },
        { ID: 204, Title: "Retainer ventures" },
        { ID: 205, Title: "Housing gardening" },
        { ID: 206, Title: "Beast tribe quests" },
        { ID: 207, Title: "Treasure map allowance" },
        { ID: 208, Title: "Leve allowance" },
        { ID: 209, Title: "Duty roulettes" },
        { ID: 210, Title: "Mini Cactpot" },
      ],
    };
  },
  components: {
    ChecklistItem,
  },
};

// function setTimeUntilResets() {
//     // JST is +9 hours relative to UTC.
//     let now = moment().utc().add(9, 'hours')

//     // Find the diff until the next midnight JST and render it.
//     let nextDailyReset = now.clone().startOf('day').add(1, 'day')
//     let dailyResetDuration = moment.duration(nextDailyReset.diff(now))

//     let dailiesReset = ""
//     if (dailyResetDuration.hours()%24 > 0) dailiesReset = dailyResetDuration.hours()%24 + "h " + dailyResetDuration.minutes() + "m"
//     else dailiesReset = dailyResetDuration.minutes() + "m"
//     $("#dailies-reset").html(dailiesReset)

//     // Find the diff until the next Tuesday 5pm JST and render it.
//     let nextWeeklyReset = now.clone().startOf('isoWeek').add(1, 'week').add(17 , 'hours').day("tuesday")
//     let weeklyResetDuration = moment.duration(nextWeeklyReset.diff(now))

//     let weekliesReset = ""
//     if (weeklyResetDuration.days()%7 > 0) weekliesReset = weeklyResetDuration.days()%7 + "d " + weeklyResetDuration.hours() + "h"
//     else if (weeklyResetDuration.hours() > 0) weekliesReset = weeklyResetDuration.hours() + "h " + weeklyResetDuration.minutes() + "m"
//     else weekliesReset = weeklyResetDuration.minutes() + "m"
//     $("#weeklies-reset").html(weekliesReset)
// }
// setTimeUntilResets()
// setInterval(setTimeUntilResets, 60*1000)
</script>
