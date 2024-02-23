<template>
  <div
    class="list-group-item align-items-center duty-list-group"
    :class="{
      'list-group-item-action':
        this.$store.getters.hasCharacter && isHoveringListItem && (duty.cleared == -1 || duty.cleared == 2),
      'cursor-pointer': this.$store.getters.hasCharacter && (duty.cleared == -1 || duty.cleared == 2),
    }"
  >
    <div
      class="d-flex justify-content-between align-items-center"
      :class="{
        'text-secondary': duty.cleared == -1,
        'text-success': duty.cleared >= 1,
      }"
      @click="check"
      @mouseover="isHoveringListItem = true"
      @mouseout="isHoveringListItem = false"
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
            'fa-question-circle':
              duty.cleared == -1 && !(duty.cleared == -1 && isHoveringListItem && !isHoveringWikiLink),
            'fa-badge-check': duty.cleared == 1,
            'fa-check-circle': duty.cleared == 2 || (duty.cleared == -1 && isHoveringListItem && !isHoveringWikiLink),
            'fa-circle': duty.cleared == 0,
          }"
        ></i>
        <a
          v-if="duty.LodestoneID && !duty.blur"
          class="text-reset lodestone-tooltip eorzeadb_link"
          :href="getLodestoneURL() + 'playguide/db/duty/' + duty.LodestoneID"
          target="_blank"
          rel="noopener noreferrer"
          :class="{
            'blur-maybe': duty.blur && duty.cleared == -1,
            'blur-cleared': duty.blur && duty.cleared == 1,
            'blur-uncleared': duty.blur && duty.cleared == 0,
            'user-select-none': duty.blur,
          }"
        >
          {{ dutyName }}
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
          {{ dutyName }}
        </span>
      </span>
      <div class="d-inline-flex align-items-center duty-icons">
        <span
          v-if="duty.IsMSQ"
          class="icon-marker-msq"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          :title="$t('encounters.msqContent')"
        ></span>
        <span
          v-if="duty.Expansion && showPatchNums"
          :class="'icon-exp-' + duty.Expansion"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          :title="$t('encounters.unlockedInExp')"
        ></span>
        <a
          v-if="showWikiLink"
          :href="duty.WikiUrl"
          class="text-success tt duty-wiki-link"
          @click.stop=""
          @mouseover="isHoveringWikiLink = true"
          @mouseout="isHoveringWikiLink = false"
        >
          <i class="fa-fw fad fa-external-link"></i>
          <span class="tt-text">Wiki resource</span>
        </a>
      </div>
    </div>
    <div id="rewards" v-if="filters.rewards && !duty.blur && ('Mounts' in duty || 'Minions' in duty)">
      <div v-if="'Mounts' in duty">
        <div
          v-for="mountID of duty.Mounts.split(' ')"
          :key="mountID"
          :class="{
            'reward-obtained': this.$store.getters.mounts[mountID],
          }"
        >
          <img v-if="mountID" :src="dbs.mounts[mountID].icon" />
          {{ dbs.mounts[mountID].name }}
          <i
            v-if="this.$store.getters.mounts[mountID]"
            class="fa-fw fal fa-check"
            :title="$t('encounters.obtained')"
          ></i>
          <i
            v-else-if="dbs.mounts[mountID].tradeable"
            class="fa-fw fal fa-comments-dollar"
            :title="$t('encounters.tradeable')"
          ></i>
        </div>
      </div>
      <div v-if="'Minions' in duty">
        <div
          v-for="minionID of duty.Minions.split(' ')"
          :key="minionID"
          :class="{
            'reward-obtained': this.$store.getters.minions[minionID],
          }"
        >
          <img v-if="minionID" :src="dbs.minions[minionID].icon" />
          {{ dbs.minions[minionID].name }}
          <i
            v-if="this.$store.getters.minions[minionID]"
            class="fa-fw fal fa-check"
            :title="$t('encounters.obtained')"
          ></i>
          <i
            v-else-if="dbs.minions[minionID].tradeable"
            class="fa-fw fal fa-comments-dollar"
            :title="$t('encounters.tradeable')"
          ></i>
        </div>
      </div>
    </div>
  </div>
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

.duty-list-group {
  padding: 0;
}

.duty-list-item {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: "… ";
  width: 100%;
}

.duty-wiki-link,
.duty-list-item {
  padding: var(--bs-list-group-item-padding-y) var(--bs-list-group-item-padding-x);
}

.duty-icons > :not(.duty-wiki-link):last-child {
  padding-right: var(--bs-list-group-item-padding-x);
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

#rewards {
  font-weight: 300;
  padding-top: 5px;
  padding-left: 30px;
  padding-bottom: 5px;

  div {
    margin-bottom: 5px;
  }
}

.reward-obtained {
  color: #666;
  img {
    filter: brightness(50%);
  }
}
</style>

<script>
import { getLodestoneURL } from "@/utilities/shared.js";
import { updateEncounterIDs } from "@/utilities/backend.js";

import dbs from "@/utilities/dbs.js";

export default {
  data() {
    return {
      isHoveringListItem: false,
      isHoveringWikiLink: false,
    };
  },
  props: {
    duty: Object,
    filters: Object,
  },
  computed: {
    dbs() {
      return dbs[this.$store.getters.language];
    },
    title() {
      return this.duty.LodestoneID || this.duty.blur ? "" : this.duty.Name;
    },
    dutyName() {
      return this.duty["Name" + this.$i18n.locale.toUpperCase()] || this.duty["NameEN"];
    },
    showPatchNums() {
      let patchNumsSetting = this.$store.getters.settings.patchNumsOption || 0;

      return (
        (patchNumsSetting == 0 && this.duty.blur) ||
        (patchNumsSetting == 1 && this.duty.cleared != 1 && this.duty.cleared != 2) ||
        patchNumsSetting == 2
      );
    },
    showWikiLink() {
      return !this.duty.blur && this.duty.WikiUrl ? true : false;
    },
  },
  methods: {
    getLodestoneURL: getLodestoneURL,
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
