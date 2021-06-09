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
            :showHidden="showHidden"
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
            :showHidden="showHidden"
          />
        </ul>
        <br />
        <span v-if="showHidden" class="text-muted float-end">
          <a class="text-reset cursor-pointer" @click="showHidden = false">Hide hidden todos.</a>
          <br /><br />
        </span>
        <span v-else-if="this.$store.state.todosHidden.length == 1" class="text-muted float-end">
          There is 1 hidden todo.
          <a class="text-reset cursor-pointer" @click="showHidden = true">Show it.</a>
          <br /><br />
        </span>
        <span v-else-if="this.$store.state.todosHidden.length > 1" class="text-muted float-end">
          There are {{ this.$store.state.todosHidden.length }} hidden todos.
          <a class="text-reset cursor-pointer" @click="showHidden = true">Show them.</a>
          <br /><br />
        </span>
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
      showHidden: false,
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
      then.setUTCHours(8, 0, 0);
      then.setUTCDate(then.getUTCDate() + ((12 - then.getUTCDay()) % 7));
      let diff = new Date(then - now);

      if (diff.getUTCDay() > 0) return diff.getUTCDay() + "d " + diff.getUTCHours() + "h";
      else if (diff.getUTCHours() > 0) return diff.getUTCHours() + "h " + diff.getUTCMinutes() + "m";
      else return diff.getUTCMinutes() + "m " + diff.getUTCSeconds() + "s";
    },
    dailyResetTime() {
      let now = new Date();
      let then = new Date();
      then.setUTCHours(15, 0, 0);
      then.setUTCDate(then.getDate() + 1);
      let diff = new Date(then - now);

      if (diff.getUTCHours() > 0) return diff.getUTCHours() + "h " + diff.getUTCMinutes() + "m";
      else return diff.getUTCMinutes() + "m " + diff.getUTCSeconds() + "s";
    },
  },
};
</script>
