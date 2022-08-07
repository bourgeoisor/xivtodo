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
    <AlertMsg
      v-if="!this.$store.getters.userData"
      type="normal"
      :msg="
        'No characters found. You can <a href=\'' +
        this.$store.state.env.VUE_APP_DISCORD_AUTH_URI +
        '\' class=\'alert-link\'>sign in with Discord</a> to add them.'
      "
    />
    <AlertMsg
      v-else-if="!this.$store.getters.hasCharacter"
      type="normal"
      msg="No characters found. You can add your characters from the <a href='/settings' class='alert-link'>Settings</a>."
    />
    <hr />
    <h2>Things to do</h2>
    <div class="row">
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
            :key="item.name"
            :item="item"
            type="weekly"
            :showHidden="showHidden"
            :draggable="showHidden"
            @dragstart="startDrag($event, item)"
            @dragend="endDrag()"
            @dragleave="endDrag()"
            @drop="onDrop($event, item)"
            @dragover="onDragOver($event, item)"
            @dragover.prevent
            @dragenter.prevent
            :dragHovered="item.name == this.draggedOverName"
          />
        </ul>
        <br />
      </div>

      <div class="col-md order-first order-md-last">
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
            :draggable="showHidden"
            @dragstart="startDrag($event, item)"
            @dragend="endDrag()"
            @dragleave="endDrag()"
            @drop="onDrop($event, item)"
            @dragover="onDragOver($event, item)"
            @dragover.prevent
            @dragenter.prevent
            :dragHovered="item.name == this.draggedOverName"
          />
        </ul>
        <br />
        <span class="d-none d-md-block">
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
            :draggable="showHidden"
            @dragstart="startDrag($event, item)"
            @dragend="endDrag()"
            @dragleave="endDrag()"
            @drop="onDrop($event, item)"
            @dragover="onDragOver($event, item)"
            @dragover.prevent
            @dragenter.prevent
            :dragHovered="item.name == this.draggedOverName"
          />
          <li v-if="this.$store.getters.checklistAdhocs.length == 0" class="list-group-item">
            Once you add checklist items, they will appear here
          </li>
        </ul>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import AlertMsg from "@/components/AlertMsg.vue";
import ChecklistItem from "@/components/ChecklistItem.vue";
import { updateChecklist } from "@/utilities/backend.js";
import { swapChecklistItems } from "@/utilities/checklist.js";

export default {
  name: "ChecklistView",
  data() {
    return {
      showHidden: false,
      weeklyReset: this.formatTimeDiff(this.weeklyResetTime(), true),
      dailyReset: this.formatTimeDiff(this.dailyResetTime(), false),
      customWeekly: "",
      customDaily: "",
      customAdhoc: "",
      draggedOverName: "",
    };
  },
  components: {
    AlertMsg,
    ChecklistItem,
  },
  mounted() {
    this.$nextTick(function () {
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
      let resetHappened = false;

      // Skip this if no active character is set.
      if (!this.$store.getters.hasCharacter) return;

      // Clear checked if past weekly reset time.
      if (this.$store.getters.checklistNextWeeklyReset < Date.now()) {
        resetHappened = true;
        this.$store.commit("checklistNextWeeklyReset", this.weeklyResetTime());
        let checklistWeeklies = this.$store.getters.checklistWeeklies;
        for (let i = 0; i < checklistWeeklies.length; i++) {
          checklistWeeklies[i].checked = false;
        }
      }

      // Clear checked if past daily reset time.
      if (this.$store.getters.checklistNextDailyReset < Date.now()) {
        resetHappened = true;
        this.$store.commit("checklistNextDailyReset", this.dailyResetTime());
        let checklistDailies = this.$store.getters.checklistDailies;
        for (let i = 0; i < checklistDailies.length; i++) {
          checklistDailies[i].checked = false;
        }
      }

      if (resetHappened) {
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
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemName", item.name);
    },
    endDrag() {
      this.draggedOverName = "";
    },
    onDrop(evt, item) {
      let fromName = evt.dataTransfer.getData("itemName");
      let toName = item.name;

      if (toName == fromName) return;

      swapChecklistItems(fromName, toName);

      let characterID = this.$store.getters.lodestoneData.Character.ID;
      updateChecklist(characterID, this.$store.getters.checklistData);
    },
    onDragOver(evt, item) {
      this.draggedOverName = item.name;
    },
  },
};
</script>
