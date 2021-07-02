<template>
  <h3><img v-if="type" :src="'/icons/duty-' + type + '.png'" />{{ title }}</h3>
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
    duties: Object,
    type: String,
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
      let achievementList = this.$store.getters.achievements;
      let achievements = new Map();
      for (let i = 0; i < achievementList.length; i++) {
        achievements.set(achievementList[i].ID, achievementList[i].Date);
      }

      let spoilersOption = this.$store.state.settings.spoilersOption;

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
        item.cleared = cleared;

        let blur = false;
        if (item.Spoilers && spoilersOption != "2") {
          let showIfAllowed = false;
          if (item.SpoilersUntil && achievements.has(item.SpoilersUntil)) showIfAllowed = true;
          if (spoilersOption == "0" || (cleared == 0 && !showIfAllowed)) {
            blur = true;
          }
          if (!this.$store.getters.achievementsPublic && !showIfAllowed) blur = true;
        }
        item.blur = blur;
      }
      return duties;
    },
  },
};
</script>
