<template>
  <div class="container">
    <h1 class="d-flex align-items-end">
      <span class="me-auto">
        {{ $t("page.checklist") }}
        <span v-if="this.$store.getters.hasCharacter" class="fs-3 fw-lighter">
          {{ $t("message.forCharacter", { characterName: this.$store.getters.character.Name }) }}
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
      type="normal"
      msg="No characters found. You can add your characters from the <a href='/settings' class='alert-link'>Settings</a>."
    />
    <hr />
    <div class="row">
      <h2>Things to do</h2>

      <div class="col-md">
        <h3>Weeklies</h3>
        <span v-if="!showHidden" class="fw-lighter text-muted">{{ weeklyReset }} until reset</span>

        <div v-if="showHidden" class="input-group mt-3 mb-2">
          <input
            v-model="customWeekly"
            type="text"
            class="form-control"
            placeholder="Custom weekly"
          />
          <button
            class="btn btn-outline-success"
            :class="{ disabled: !customWeekly }"
            type="button"
            id="button-addon2"
            @click="addCustomWeekly"
          >
            Add custom weekly
          </button>
        </div>

        <ul class="list-group list-group-flush">
          <ChecklistItem
            v-for="item of [...db.weeklyChecklist, ...this.$store.getters.todosCustomWeeklies]"
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
        <span v-if="!showHidden" class="fw-lighter text-muted">{{ dailyReset }} until reset</span>

        <div v-if="showHidden" class="input-group mt-3 mb-2">
          <input
            v-model="customDaily"
            type="text"
            class="form-control"
            placeholder="Custom daily"
          />
          <button
            class="btn btn-outline-success"
            :class="{ disabled: !customDaily }"
            type="button"
            id="button-addon2"
            @click="addCustomDaily"
          >
            Add custom daily
          </button>
        </div>

        <ul class="list-group list-group-flush">
          <ChecklistItem
            v-for="item of [...db.dailyChecklist, ...this.$store.getters.todosCustomDailies]"
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
      customWeekly: "",
      customDaily: "",
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

      let dailiesIds = this.db.dailyChecklist.map((item) => item.ID);
      let weekliesIds = this.db.weeklyChecklist.map((item) => item.ID);
      let customDailiesIds = this.$store.getters.todosCustomDailies.map((item) => item.ID);
      let customWeekliesIds = this.$store.getters.todosCustomWeeklies.map((item) => item.ID);
      let ids = [...dailiesIds, ...weekliesIds, ...customDailiesIds, ...customWeekliesIds];

      // Clear checked if they don't exist anymore.
      let todosChecked = this.$store.getters.todosChecked;
      for (let id of todosChecked) {
        if (ids.indexOf(id) == -1) {
          this.$store.commit("todoChecked", { id: id, checked: false });
        }
      }

      // Clear hidden if they don't exist anymore.
      let todosHidden = this.$store.getters.todosHidden;
      for (let id of todosHidden) {
        if (ids.indexOf(id) == -1) {
          this.$store.commit("todoHidden", { id: id, checked: false });
        }
      }

      // Reset old completions.
      this.resetDailliesWeeklies();
    });
    setInterval(() => {
      this.resetDailliesWeeklies();
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
    resetDailliesWeeklies() {
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
    },
    addCustomWeekly() {
      this.$store.commit("todosAddCustomWeekly", this.customWeekly);
      this.customWeekly = "";
    },
    addCustomDaily() {
      this.$store.commit("todosAddCustomDaily", this.customDaily);
      this.customDaily = "";
    },
  },
};
</script>
