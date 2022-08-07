<template>
  <li
    class="list-group-item d-flex justify-content-between align-items-center"
    :class="{
      'text-secondary': duty.cleared == -1,
      'text-success': duty.cleared >= 1,
      'list-group-item-action':
        this.$store.getters.hasCharacter && isHovering && (duty.cleared == -1 || duty.cleared == 2),
      'cursor-pointer': duty.cleared == -1 || duty.cleared == 2,
    }"
    @click="check"
    @mouseover="isHovering = true"
    @mouseout="isHovering = false"
  >
    <span
      class="duty-list-item"
      :class="{
        'duty-list-item-blur': duty.blur,
      }"
      :title="title"
    >
      <i
        class="me-2 fa-fw fal"
        :class="{
          'fa-question-circle': duty.cleared == -1 && !(duty.cleared == -1 && isHovering),
          'fa-badge-check': duty.cleared == 1,
          'fa-check-circle': duty.cleared == 2 || (duty.cleared == -1 && isHovering),
          'fa-circle': duty.cleared == 0,
        }"
      ></i>
      <a
        v-if="duty.LodestoneID && !duty.blur"
        class="text-reset lodestone-tooltip eorzeadb_link"
        :href="'https://na.finalfantasyxiv.com/lodestone/playguide/db/duty/' + duty.LodestoneID"
        target="_blank"
        rel="noopener noreferrer"
        :class="{
          'blur-maybe': duty.blur && duty.cleared == -1,
          'blur-cleared': duty.blur && duty.cleared == 1,
          'blur-uncleared': duty.blur && duty.cleared == 0,
          'user-select-none': duty.blur,
        }"
      >
        {{ duty.Name }}
      </a>
      <span
        v-else
        :class="{
          'blur-maybe': duty.blur && duty.cleared == -1,
          'blur-cleared': duty.blur && duty.cleared == 1,
          'blur-uncleared': duty.blur && duty.cleared == 0,
          'user-select-none': duty.blur,
          'text-bold': duty.Bold,
        }"
      >
        {{ duty.Name }}
      </span>
    </span>
    <span
      v-if="duty.IsMSQ"
      class="icon-marker-msq"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="MSQ content"
    ></span>
    <span
      v-if="duty.Expansion && duty.blur"
      :class="'icon-exp-' + duty.Expansion"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="Expansion unlocked in"
    ></span>
  </li>
</template>

<style lang="scss">
.blur-maybe {
  color: transparent;
  text-shadow: 0 0 20px rgb(148, 148, 148);
}

.blur-cleared {
  color: transparent;
  text-shadow: 0 0 20px #53b462;
  text-overflow: unset;
}

.blur-uncleared {
  color: transparent;
  text-shadow: 0 0 20px #c2c2c2;
  text-overflow: unset;
}

.duty-list-item {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: "… ";
}

.duty-list-item-blur {
  text-overflow: " ";
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
import { updateEncounterIDs } from "@/utilities/backend.js";

export default {
  data() {
    return {
      isHovering: false,
    };
  },
  props: {
    duty: Object,
  },
  computed: {
    title() {
      return this.duty.LodestoneID || this.duty.blur ? "" : this.duty.Name;
    },
  },
  methods: {
    check() {
      if (!this.$store.getters.hasCharacter) return;
      if (this.duty.cleared == 0 || this.duty.cleared == 1) return;

      let uuid = ~~this.duty.UUID;

      let encounterIDs = this.$store.getters.encounterIDs;
      if (encounterIDs.has(uuid)) {
        encounterIDs.set(uuid, false);
      } else {
        encounterIDs.set(uuid, true);
      }

      let encounterIDsAsArray = [];
      encounterIDs.forEach((v, k) => {
        if (v) {
          encounterIDsAsArray.push(k);
        }
      });

      this.$store.commit("setEncounterIDs", encounterIDsAsArray);

      let characterID = this.$store.getters.lodestoneData.Character.ID;
      updateEncounterIDs(characterID, encounterIDsAsArray);
    },
  },
};
</script>
