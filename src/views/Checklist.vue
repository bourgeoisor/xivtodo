<template>
  <div class="container">
    <h1 class="d-flex align-items-end">
      <span class="me-auto">Checklist</span>
      <button
        type="button"
        class="btn float-end"
        :class="{ 'btn-outline-secondary': !showHidden, 'btn-outline-success': showHidden }"
        @click="showHidden = !showHidden"
      >
        Customize
      </button>
    </h1>
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
            v-for="item of db.weeklyChecklist"
            :key="item.ID"
            :item="item"
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
            v-for="item of db.dailyChecklist"
            :key="item.ID"
            :item="item"
            :showHidden="showHidden"
          />
        </ul>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import ChecklistItem from "@/components/ChecklistItem.vue";

import dbJson from "@/assets/db.json";

export default {
  name: "Checklist",
  data() {
    return {
      db: dbJson,
      showHidden: false,
      dailyReset: this.dailyResetTime(),
      weeklyReset: this.weeklyResetTime(),
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
      else if (diff.getUTCHours() > 0)
        return diff.getUTCHours() + "h " + diff.getUTCMinutes() + "m";
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
