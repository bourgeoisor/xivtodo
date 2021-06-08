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
      let achievementList = this.$store.getters.achievements.List;
      let achievements = new Map();
      for (let i = 0; i < achievementList.length; i++) {
        achievements.set(achievementList[i].ID, achievementList[i].Date);
      }

      let spoilersOption = this.$store.state.settings.spoilersOption;

      for (let item of duties) {
        item.blur = false;
        item.clearedMaybe = false;
        item.clearedYes = false;
        item.clearedNo = false;

        let cleared = 0; // Not cleared
        if (item.ID && achievements.has(parseInt(item.ID))) cleared = 1; // Cleared
        else if (item.MaxID && achievements.has(parseInt(item.MaxID))) cleared = 1; // Cleared
        else if (item.MaxAltID && achievements.has(parseInt(item.MaxAltID))) cleared = 1; // Cleared
        else if (item.MinID && achievements.has(parseInt(item.MinID))) cleared = -1; // Maybe
        else if (item.MindID && !achievements.has(parseInt(item.MinID))) cleared = 0; // Not cleared
        else if (!item.ID) cleared = -1; // Maybe

        if (cleared == -1) item.clearedMaybe = true;
        else if (cleared == 0) item.clearedNo = true;
        else if (cleared == 1) item.clearedYes = true;

        if (item.Spoilers && spoilersOption != "2") {
          let showIfAllowed = false;
          if ("SpoilersUntil" in item && achievements.has(parseInt(item.SpoilersUntil))) showIfAllowed = true;
          if (spoilersOption == "0" || (cleared != 1 && !showIfAllowed)) {
            item.blur = true;
          }
        }
      }
      return duties;
    },
  },
};
</script>
