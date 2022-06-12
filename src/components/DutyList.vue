<template>
  <h3><img v-if="type" :src="'/icons/duty-' + type + '.png'" />{{ title }}</h3>
  <span v-if="showTotal" class="fw-lighter text-muted">{{ duties.length }} total</span>
  <ul class="list-group list-group-flush">
    <DutyListItem
      v-for="item of injectDutyCompletion(duties)"
      :key="item.Name"
      :duty="item"
      :clearedMaybe="true"
      :blur="false"
    />
  </ul>
  <br />
</template>

<script>
import DutyListItem from "@/components/DutyListItem.vue";

export default {
  props: {
    title: String,
    duties: Array,
    type: String,
    showTotal: Boolean,
  },
  components: {
    DutyListItem,
  },
  methods: {
    hasMaxIDOneOf(achievements, item) {
      if (item.MaxIDOneOf.length > 0) {
        for (let id of item.MaxIDOneOf) {
          if (achievements.has(id)) return true;
        }
      }
      return false;
    },
    injectDutyCompletion(duties) {
      let achievements = this.$store.getters.achievements;
      let spoilersOption = this.$store.getters.settings.spoilersOption || 0;
      let encounterIDs = this.$store.getters.encounterIDs;

      for (let item of duties) {
        let cleared = 0;
        if (!this.$store.getters.achievementsPublic) cleared = -1;
        else if (item.ID && achievements.has(item.ID)) cleared = 1;
        else if (item.MaxIDOneOf && this.hasMaxIDOneOf(achievements, item)) cleared = 1;
        else if (item.MaxIDAllOf && item.MaxIDAllOf.length > 0) {
          cleared = 1;
          for (let id of item.MaxIDAllOf) {
            if (!achievements.has(id)) cleared = 0;
          }
        } else if (item.MinID && achievements.has(item.MinID)) cleared = -1;
        else if (item.MinID && !achievements.has(item.MinID)) cleared = 0;
        else if (!item.MinID && item.MaxIDOneOf) cleared = 0;
        else if (!item.ID) cleared = -1;
        if (cleared == -1 && encounterIDs.has(~~item.UUID)) cleared = 2;
        item.cleared = cleared;

        let blur = false;
        if (item.Spoilers) {
          let showIfAllowed = false;
          if (item.SpoilersUntil && achievements.has(item.SpoilersUntil)) showIfAllowed = true;
          if (spoilersOption == "1" || (cleared == 0 && !showIfAllowed)) {
            blur = true;
          }
          if (!this.$store.getters.achievementsPublic && !showIfAllowed) blur = true;
        }
        if (item.Expansion == "2x" && !achievements.has(788)) blur = true;
        if (item.Expansion == "3x" && !achievements.has(1139)) blur = true;
        if (item.Expansion == "4x" && !achievements.has(1794)) blur = true;
        if (item.Expansion == "5x" && !achievements.has(2298)) blur = true;
        if (item.Expansion == "6x" && !achievements.has(2958)) blur = true;
        if (spoilersOption == "2") blur = false;
        item.blur = blur;
      }
      return duties;
    },
    numClearedDuties() {
      return this.injectDutyCompletion(this.duties).filter((obj) => obj.cleared == 1).length;
    },
  },
};
</script>
