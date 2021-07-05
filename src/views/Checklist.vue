<template>
  <div class="container">
    <h1 class="d-flex align-items-end">
      <span class="me-auto">
        Checklist
        <span v-if="this.$store.getters.hasCharacter" class="fs-3 fw-lighter">
          for {{ this.$store.getters.character.Name }}
        </span>
      </span>
      <button
        v-if="this.$store.getters.hasCharacter"
        type="button"
        class="btn float-end"
        :class="{ 'btn-outline-success': !showHidden, 'btn-success': showHidden }"
        @click="showHidden = !showHidden"
      >
        Customize
      </button>
    </h1>
    <Alert
      v-if="!this.$store.getters.hasCharacter"
      msg="No characters found. You can add your characters from the <a href='/settings' class='alert-link'>Settings</a>."
    />
    <hr />
    <div class="row">
      <h2>Things to do</h2>

      <div class="col-md">
        <h3>Weeklies</h3>
        <span class="fw-lighter text-muted">{{ weeklyReset }} until reset</span>

        <ul class="list-group list-group-flush">
          <ChecklistItem
            v-for="item of db.weeklyChecklist"
            :key="item.ID"
            :item="item"
            :showHidden="showHidden"
            :rerender="rerender"
          />
        </ul>
        <br />
      </div>

      <div class="col-md">
        <h3>Dailies</h3>
        <span class="fw-lighter text-muted">{{ dailyReset }} until reset</span>

        <ul class="list-group list-group-flush">
          <ChecklistItem
            v-for="item of db.dailyChecklist"
            :key="item.ID"
            :item="item"
            :showHidden="showHidden"
            :rerender="rerender"
          />
        </ul>
        <br />
        <span
          v-if="this.$store.getters.todosHidden.length == 1"
          class="text-muted fw-light float-end"
        >
          There is 1 hidden task.<br /><br />
        </span>
        <span
          v-else-if="this.$store.getters.todosHidden.length > 1"
          class="text-muted fw-light float-end"
        >
          There are {{ this.$store.getters.todosHidden.length }} hidden tasks.<br /><br />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";
import ChecklistItem from "@/components/ChecklistItem.vue";

import dbJson from "@/assets/db.json";

export default {
  name: "Checklist",
  data() {
    return {
      db: dbJson,
      rerender: 0,
      showHidden: false,
      weeklyReset: this.formatTimeDiff(this.weeklyResetTime(), true),
      dailyReset: this.formatTimeDiff(this.dailyResetTime(), false),
    };
  },
  components: {
    Alert,
    ChecklistItem,
  },
  mounted() {
    this.$nextTick(function () {
      // Skip this if no active character is set.
      if (!this.$store.getters.hasCharacter) return;

      let existingDailies = this.db.dailyChecklist.map((item) => item.ID);
      let existingWeeklies = this.db.weeklyChecklist.map((item) => item.ID);
      let existingIds = existingDailies.concat(existingWeeklies);

      // Clear checked if they don't exist anymore.
      let todosChecked = this.$store.getters.todosChecked;
      for (let id of todosChecked) {
        if (existingIds.indexOf(id) == -1) {
          this.$store.commit("todoChecked", { id: id, checked: false });
        }
      }

      // Clear hidden if they don't exist anymore.
      let todosHidden = this.$store.getters.todosHidden;
      for (let id of todosHidden) {
        if (existingIds.indexOf(id) == -1) {
          this.$store.commit("todoHidden", { id: id, checked: false });
        }
      }
    });
    setInterval(() => {
      this.weeklyReset = this.formatTimeDiff(this.weeklyResetTime(), true);
      this.dailyReset = this.formatTimeDiff(this.dailyResetTime(), false);
      this.rerender++;

      // Skip this if no active character is set.
      if (!this.$store.getters.hasCharacter) return;

      // Clear checked if past weekly reset time.
      if (this.$store.getters.todosNextWeeklyReset < Date.now()) {
        this.$store.commit("todosNextWeeklyReset", this.weeklyResetTime());
        let todosChecked = this.$store.getters.todosChecked;
        for (let id of todosChecked) {
          if (id >= 1000 && id < 2000) {
            this.$store.commit("todoChecked", { id: id, checked: false });
          }
        }
      }

      // Clear checked if past daily reset time.
      if (this.$store.getters.todosNextDailyReset < Date.now()) {
        this.$store.commit("todosNextDailyReset", this.dailyResetTime());
        let todosChecked = this.$store.getters.todosChecked;
        for (let id of todosChecked) {
          if (id >= 2000 && id < 3000) {
            this.$store.commit("todoChecked", { id: id, checked: false });
          }
        }
      }
    }, 1000);
  },
  methods: {
    weeklyResetTime() {
      let now = new Date();
      let then = new Date();
      then.setUTCHours(8, 0, 0);
      then.setDate(now.getDate() + (7 + 2 - now.getDay()));

      let diff = then - now;
      let delta = 1000 * 60 * 60 * 24 * 7;

      return (diff % delta) + now.getTime();
    },
    dailyResetTime() {
      let now = new Date();
      let then = new Date();
      then.setUTCHours(15, 0, 0);
      then.setUTCDate(then.getDate() + 1);

      let diff = then - now;
      let delta = 1000 * 60 * 60 * 24;

      return (diff % delta) + now.getTime();
    },
    formatTimeDiff(then, showDays) {
      let now = new Date();
      let diff = then - now;

      let dday = 1000 * 60 * 60 * 24;
      let dhour = 1000 * 60 * 60;
      let dminute = 1000 * 60;
      let dsecond = 1000;

      let days = Math.floor(diff / dday);
      let hours = Math.floor(diff / dhour) - 24 * Math.floor(diff / dday);
      let minutes = Math.floor(diff / dminute) - 60 * Math.floor(diff / dhour);
      let seconds = Math.floor(diff / dsecond) - 60 * Math.floor(diff / dminute);

      if (days > 0 && showDays) {
        return `${days}d ${hours}h`;
      } else if (hours > 0) {
        return `${hours}h ${minutes}m`;
      } else {
        return `${minutes}m ${seconds}s`;
      }
    },
  },
};
</script>
