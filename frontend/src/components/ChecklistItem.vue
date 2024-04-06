<template>
  <li
    v-if="showHidden || (!itemCopy.hidden && !showHidden)"
    class="list-group-item fw-medium"
    :class="{
      'drag-hovered': dragHovered,
      'list-group-item-action': this.$store.getters.hasCharacter,
      'cursor-pointer': this.$store.getters.hasCharacter,
      'user-select-none': this.$store.getters.hasCharacter,
    }"
    @click="check"
    @mouseover="isHovering = true"
    @mouseout="isHovering = false"
  >
    <span v-if="!itemCopy.hidden && !showHidden">
      <i
        v-if="!showHidden && this.$store.getters.hasCharacter"
        class="me-2 fa-fw fal"
        :class="{
          'fa-check-circle': itemCopy.checked || isHovering,
          'fa-circle': !itemCopy.checked && !isHovering,
          'text-success': itemCopy.checked,
        }"
      ></i>
      <span :class="{ 'checklist-checked': itemCopy.checked }">{{ item.name }}</span>
      <!-- <br /><small class="text-muted">Token and gear coffer lockout for the Savage raid</small> -->
    </span>

    <span v-if="showHidden" class="d-flex justify-content-between align-items-center">
      <span :class="{ 'text-muted': itemCopy.hidden }">
        <i class="fa-fw fas fa-grip-lines cursor-grab d-none d-md-inline" :title="$t('shared.dragToReorder')"></i>
        &nbsp;
        {{ item.name }}
      </span>
      <span v-if="showHidden">
        <a v-if="item.custom" class="text-danger cursor-pointer tt" @click="remove">
          <i class="fa-fw fas fa-trash-alt"></i>
          <span class="tt-text">{{ $t("shared.remove") }}</span>
        </a>
        <a v-else-if="itemCopy.hidden" class="text-secondary cursor-pointer tt" @click="hid">
          <i class="fa-fw fas fa-eye-slash"></i>
          <span class="tt-text">{{ $t("shared.show") }}</span>
        </a>
        <a v-else-if="!itemCopy.hidden" class="text-success cursor-pointer tt" @click="hid">
          <i class="fa-fw fas fa-eye"></i>
          <span class="tt-text">{{ $t("shared.hide") }}</span>
        </a>
      </span>
    </span>
  </li>
</template>

<style lang="scss">
.checklist-checked {
  color: #53b462;
  text-decoration: line-through;
  text-decoration-thickness: 2px;
}

.drag-hovered {
  border-top: 2px solid #41b883 !important;
}

.cursor-grab {
  cursor: grab;
}

.night {
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
      isHovering: false,
    };
  },
  props: {
    item: Object,
    type: String,
    showHidden: Boolean,
    dragHovered: Boolean,
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
      if (!this.$store.getters.hasCharacter) return;
      if (this.showHidden) return;

      this.itemCopy.checked = !this.itemCopy.checked;
      this.updateItem(false);
    },
    remove() {
      this.updateItem(true);
    },
    updateItem(toRemove) {
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
