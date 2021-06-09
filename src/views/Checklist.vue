<template>
  <div class="container">
    <h1>Checklist</h1>
    <hr />
    <div class="row">
      <h2>Things to do</h2>

      <div class="col-md">
        <h3>
          Weeklies
          <small class="text-muted">&mdash; {{ weeklyReset }} until reset</small>
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
          <small class="text-muted">&mdash; {{ dailyReset }} until reset</small>
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
      dailyReset: this.dailyResetTime(),
      weeklyReset: this.weeklyResetTime(),
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
  mounted() {
    setInterval(() => {
      this.weeklyReset = this.weeklyResetTime();
      this.dailyReset = this.dailyResetTime();
    }, 1000);
  },
  methods: {
    weeklyResetTime() {
      let now = new Date();
      let then = new Date();
      then.setUTCHours(12, 0, 0);
      then.setDate(then.getDate() + ((12 - then.getDay()) % 7));
      let diff = new Date(then - now);

      if (diff.getDay() > 0) return diff.getDay() + "d " + diff.getHours() + "h";
      else if (diff.getHours() > 0) return diff.getHours() + "h " + diff.getMinutes() + "m";
      else return diff.getMinutes() + "m " + diff.getSeconds() + "s";
    },
    dailyResetTime() {
      let now = new Date();
      let then = new Date();
      then.setUTCHours(19, 0, 0);
      then.setDate(then.getDate() + 1);
      let diff = new Date(then - now);

      if (diff.getHours() > 0) return diff.getHours() + "h " + diff.getMinutes() + "m";
      else return diff.getMinutes() + "m " + diff.getSeconds() + "s";
    },
  },
};
</script>
