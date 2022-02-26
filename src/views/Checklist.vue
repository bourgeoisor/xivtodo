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
      v-if="!this.$store.getters.userData"
      type="normal"
      :msg="
        'No characters found. You can <a href=\'' +
        this.$store.state.env.VUE_APP_DISCORD_AUTH_URI +
        '\' class=\'alert-link\'>sign in with Discord</a> to add them.'
      "
    />
    <Alert
      v-else-if="!this.$store.getters.hasCharacter"
      type="normal"
      msg="No characters found. You can add your characters from the <a href='/settings' class='alert-link'>Settings</a>."
    />
    <hr />
    <div class="row">
      <h2>Things to do</h2>

      <div class="col-md">
        <h3>Weeklies</h3>
        <span class="fw-lighter text-muted">{{ weeklyReset }} until reset</span>

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
            v-for="item of [...this.$store.getters.checklistWeeklies]"
            :key="item.ID"
            :item="item"
            type="weekly"
            :showHidden="showHidden"
            :rerender="rerender"
          />
        </ul>
        <br />
      </div>

      <div class="col-md">
        <h3>Dailies</h3>
        <span class="fw-lighter text-muted">{{ dailyReset }} until reset</span>

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
            v-for="item of [...this.$store.getters.checklistDailies]"
            :key="item.ID"
            :item="item"
            type="daily"
            :showHidden="showHidden"
            :rerender="rerender"
          />
        </ul>
        <br />
        <span
          v-if="this.$store.getters.checklistLenHiddens == 1"
          class="text-muted fw-light float-end"
        >
          1 hidden task<br /><br />
        </span>
        <span
          v-else-if="this.$store.getters.checklistLenHiddens > 1"
          class="text-muted fw-light float-end"
        >
          {{ this.$store.getters.checklistLenHiddens }} hidden tasks<br /><br />
        </span>
      </div>
    </div>
    <div v-if="showHidden || this.$store.getters.checklistAdhocs.length > 0" class="row">
      <div class="col">
        <h3>Scratchpad</h3>
        <span class="fw-lighter text-muted">Checklist without deadlines</span>

        <div v-if="showHidden" class="input-group mt-3 mb-2">
          <input v-model="customAdhoc" type="text" class="form-control" placeholder="Custom item" />
          <button
            class="btn btn-outline-success"
            :class="{ disabled: !customAdhoc }"
            type="button"
            id="button-addon2"
            @click="addCustomAdhoc"
          >
            Add custom item
          </button>
        </div>

        <ul class="list-group list-group-flush">
          <ChecklistItem
            v-for="item of [...this.$store.getters.checklistAdhocs]"
            :key="item.ID"
            :item="item"
            type="adhoc"
            :showHidden="showHidden"
            :rerender="rerender"
          />
        </ul>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";
import ChecklistItem from "@/components/ChecklistItem.vue";
import { updateChecklist } from "@/utilities/backend.js";

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
      customAdhoc: "",
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

      // Sync weekly checklist with DB
      let weeklyChecklist = [...this.$store.getters.checklistWeeklies];
      for (let dbItem of this.db.weeklyChecklist) {
        let found = false;
        for (let item of weeklyChecklist) {
          if (item.name == dbItem.Name && !item.custom) {
            found = true;
          }
        }
        if (!found) {
          let newItem = {
            name: dbItem.Name,
            custom: false,
            checked: false,
            hidden: false,
          };
          weeklyChecklist.push(newItem);
        }
      }
      for (let i = 0; i < this.$store.getters.checklistWeeklies.length; i++) {
        let item = this.$store.getters.checklistWeeklies[i];
        let found = false;
        for (let dbItem of this.db.weeklyChecklist) {
          if (dbItem.Name == item.name) {
            found = true;
          }
        }
        if (!found && !item.custom) {
          weeklyChecklist.splice(i, 1);
        }
      }
      this.$store.commit("setChecklistWeeklies", weeklyChecklist);

      // Sync daily checklist with DB
      let dailyChecklist = [...this.$store.getters.checklistDailies];
      for (let dbItem of this.db.dailyChecklist) {
        let found = false;
        for (let item of dailyChecklist) {
          if (item.name == dbItem.Name && !item.custom) {
            found = true;
          }
        }
        if (!found) {
          let newItem = {
            name: dbItem.Name,
            custom: false,
            checked: false,
            hidden: false,
          };
          dailyChecklist.push(newItem);
        }
      }
      for (let i = 0; i < this.$store.getters.checklistDailies.length; i++) {
        let item = this.$store.getters.checklistDailies[i];
        let found = false;
        for (let dbItem of this.db.dailyChecklist) {
          if (dbItem.Name == item.name) {
            found = true;
          }
        }
        if (!found && !item.custom) {
          dailyChecklist.splice(i, 1);
        }
      }
      this.$store.commit("setChecklistDailies", dailyChecklist);

      let characterID = this.$store.getters.lodestoneData.Character.ID;
      updateChecklist(characterID, this.$store.getters.checklistData);

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
      then.setUTCDate(now.getUTCDate() + (7 + 2 - now.getUTCDay()));

      let diff = then - now;
      let delta = 1000 * 60 * 60 * 24 * 7;

      return (diff % delta) + now.getTime();
    },
    dailyResetTime() {
      let now = new Date();
      let then = new Date();
      then.setUTCHours(15, 0, 0);
      then.setUTCDate(then.getUTCDate() + 1);

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
      if (this.$store.getters.checklistNextWeeklyReset < Date.now()) {
        this.$store.commit("checklistNextWeeklyReset", this.weeklyResetTime());
        let checklistWeeklies = this.$store.getters.checklistWeeklies;
        for (let i = 0; i < checklistWeeklies.length; i++) {
          checklistWeeklies[i].checked = false;
        }

        let characterID = this.$store.getters.lodestoneData.Character.ID;
        updateChecklist(characterID, this.$store.getters.checklistData);
      }

      // Clear checked if past daily reset time.
      if (this.$store.getters.checklistNextDailyReset < Date.now()) {
        this.$store.commit("checklistNextDailyReset", this.dailyResetTime());
        let checklistDailies = this.$store.getters.checklistDailies;
        for (let i = 0; i < checklistDailies.length; i++) {
          checklistDailies[i].checked = false;
        }

        let characterID = this.$store.getters.lodestoneData.Character.ID;
        updateChecklist(characterID, this.$store.getters.checklistData);
      }
    },
    addCustomWeekly() {
      let newItem = {
        name: this.customWeekly,
        custom: true,
        checked: false,
        hidden: false,
      };

      let weeklyChecklist = [...this.$store.getters.checklistWeeklies];
      weeklyChecklist.push(newItem);
      this.$store.commit("setChecklistWeeklies", weeklyChecklist);

      this.customWeekly = "";
      let characterID = this.$store.getters.lodestoneData.Character.ID;
      updateChecklist(characterID, this.$store.getters.checklistData);
    },
    addCustomDaily() {
      let newItem = {
        name: this.customDaily,
        custom: true,
        checked: false,
        hidden: false,
      };

      let dailyChecklist = [...this.$store.getters.checklistDailies];
      dailyChecklist.push(newItem);
      this.$store.commit("setChecklistDailies", dailyChecklist);

      this.customDaily = "";
      let characterID = this.$store.getters.lodestoneData.Character.ID;
      updateChecklist(characterID, this.$store.getters.checklistData);
    },
    addCustomAdhoc() {
      let newItem = {
        name: this.customAdhoc,
        custom: true,
        checked: false,
        hidden: false,
      };

      let adhocChecklist = [...this.$store.getters.checklistAdhocs];
      adhocChecklist.push(newItem);
      this.$store.commit("setChecklistAdhocs", adhocChecklist);

      this.customAdhoc = "";
      let characterID = this.$store.getters.lodestoneData.Character.ID;
      updateChecklist(characterID, this.$store.getters.checklistData);
    },
  },
};
</script>
