<template>
  <label
    v-if="!itemCopy.hidden && !showHidden"
    class="
      list-group-item list-group-item-action
      d-flex
      justify-content-between
      align-items-center
      user-select-none
    "
  >
    <span>
      <input
        v-if="!showHidden && this.$store.getters.hasCharacter"
        v-model="itemCopy.checked"
        :class="{ 'checkbox-checked': itemCopy.checked }"
        class="form-check-input"
        type="checkbox"
        :id="item.name"
        @change="check"
      />
      &nbsp;&nbsp;<span :class="{ 'checklist-checked': itemCopy.checked }">{{ item.name }}</span>
    </span>
  </label>
  <span v-if="showHidden" class="list-group-item d-flex justify-content-between align-items-center">
    <span :class="{ 'text-muted': itemCopy.hidden }" class="user-select-none">
      {{ item.name }}
    </span>
    <span v-if="showHidden">
      <a v-if="item.custom" class="bi-trash text-danger cursor-pointer tt" @click="remove">
        <span class="tt-text">Remove</span>
      </a>
      <a
        v-else-if="itemCopy.hidden"
        class="bi-eye-slash text-secondary cursor-pointer tt"
        @click="hid"
      >
        <span class="tt-text">Show</span>
      </a>
      <a v-else-if="!itemCopy.hidden" class="bi-eye text-success cursor-pointer tt" @click="hid">
        <span class="tt-text">Hide</span>
      </a>
    </span>
  </span>
</template>

<style lang="scss">
.checklist-checked {
  color: #53b462;
  text-decoration: line-through;
  text-decoration-thickness: 2px;
}

.night {
  .form-check-input.checkbox-checked[type="checkbox"] {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23198754' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
  }

  .form-check-input[type="checkbox"]:hover:not(.checkbox-checked) {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23dddddd' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
  }

  .form-check-input.checkbox-checked {
    border-color: #53b462;
  }

  .list-group-item-action:focus,
  .list-group-item-action:hover {
    background-color: #212529 !important;
  }

  .list-group-item-action:active {
    background-color: #1c2024 !important;
  }
}
</style>

<script>
import { updateChecklist } from "@/utilities/backend.js";

export default {
  data() {
    return {
      itemCopy: this.item,
    };
  },
  props: {
    item: Object,
    type: String,
    showHidden: Boolean,
  },
  watch: {
    item() {
      this.itemCopy = this.item;
    },
  },
  methods: {
    hid() {
      this.itemCopy.hidden = !this.itemCopy.hidden;
      this.updateItem(false);
    },
    check() {
      this.updateItem(false);
    },
    remove() {
      this.updateItem(true);
    },
    updateItem(toRemove) {
      // Skip this if no active character is set.
      if (!this.$store.getters.hasCharacter) return;

      if (this.type == "weekly") {
        let weeklyChecklist = this.$store.getters.checklistWeeklies;
        for (let i = 0; i < weeklyChecklist.length; i++) {
          if (weeklyChecklist[i].name == this.item.name) {
            weeklyChecklist[i] = this.itemCopy;
            if (toRemove) {
              weeklyChecklist.splice(i, 1);
            }
          }
        }

        this.$store.commit("setChecklistWeeklies", weeklyChecklist);
      }

      if (this.type == "daily") {
        let dailyChecklist = this.$store.getters.checklistDailies;
        for (let i = 0; i < dailyChecklist.length; i++) {
          if (dailyChecklist[i].name == this.item.name) {
            dailyChecklist[i] = this.itemCopy;
            if (toRemove) {
              dailyChecklist.splice(i, 1);
            }
          }
        }

        this.$store.commit("setChecklistDailies", dailyChecklist);
      }

      if (this.type == "adhoc") {
        let adhocChecklist = this.$store.getters.checklistAdhocs;
        for (let i = 0; i < adhocChecklist.length; i++) {
          if (adhocChecklist[i].name == this.item.name) {
            adhocChecklist[i] = this.itemCopy;
            if (toRemove) {
              adhocChecklist.splice(i, 1);
            }
          }
        }

        this.$store.commit("setChecklistAdhocs", adhocChecklist);
      }

      let characterID = this.$store.getters.lodestoneData.Character.ID;
      updateChecklist(characterID, this.$store.getters.checklistData);
    },
  },
};
</script>
