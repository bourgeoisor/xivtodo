<template>
  <h3>{{ title }}</h3>
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
  },
  components: {
    DutyListItem,
  },
  methods: {
    injectDutyCompletion(duties) {
      let achievementList = this.$store.getters.achievements.List || [];
      let achievements = new Map();
      for (let i = 0; i < achievementList.length; i++) {
        achievements.set(achievementList[i].ID, achievementList[i].Date);
      }

      let spoilersOption = this.$store.state.settings.spoilersOption;

      for (let item of duties) {
        let cleared = 0;
        if (!this.$store.getters.achievementsPublic) cleared = -1;
        else if (item.ID && achievements.has(item.ID)) cleared = 1;
        else if (item.MaxID && achievements.has(item.MaxID)) cleared = 1;
        else if (item.MaxAltID && achievements.has(item.MaxAltID)) cleared = 1;
        else if (item.MinID && achievements.has(item.MinID)) cleared = -1;
        else if (item.MinID && !achievements.has(item.MinID)) cleared = 0;
        else if (!item.ID) cleared = -1;
        item.cleared = cleared;

        let blur = false;
        if (item.Spoilers && spoilersOption != "2") {
          let showIfAllowed = false;
          if (item.SpoilersUntil && achievements.has(item.SpoilersUntil)) showIfAllowed = true;
          if (spoilersOption == "0" || (cleared != 1 && !showIfAllowed)) {
            blur = true;
          }
        }
        item.blur = blur;
      }
      return duties;
    },
  },
};
</script>
