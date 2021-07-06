<template>
  <div class="container">
    <h1>
      Questlines
      <span
        v-if="this.$store.getters.hasCharacter && this.$store.getters.achievementsPublic"
        class="fs-3 fw-lighter"
      >
        cleared by {{ this.$store.getters.character.Name }}
      </span>
      <span v-else-if="this.$store.getters.hasCharacter" class="fs-3 fw-lighter text-warning">
        <abbr title="The achievements for this characters are not set to public in Lodestone.">
          cleared by {{ this.$store.getters.character.Name }}
        </abbr>
        &nbsp;<span class="bi bi-patch-exclamation"></span>
      </span>
    </h1>
    <Alert
      v-if="!this.$store.getters.hasCharacter"
      type="normal"
      msg="No characters found. You can add your characters from the <a href='/settings' class='alert-link'>Settings</a>."
    />
    <hr />
    <div class="row">
      <h2>Stories</h2>

      <div class="col-lg">
        <DutyList title="Main Story Quest" :duties="db.mainStoryQuest" />
      </div>

      <div class="col-lg">
        <DutyList title="Side Story Quests" :duties="db.sideStoryQuests" />
        <DutyList title="Duties Quests" :duties="db.dutiesQuests" />
        <DutyList title="Relic Quests" :duties="db.relicQuests" />
      </div>

      <div class="col-lg">
        <DutyList title="Beast Tribe Quests" :duties="db.beastTribeQuests" />
        <DutyList title="Allied Beast Tribe Quests" :duties="db.alliedBeastTribeQuests" />
        <DutyList title="Custom Delivery Quests" :duties="db.customDeliveryQuests" />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>Job Quests</h2>

      <div class="col-lg">
        <DutyList title="Combat Job Quests" :duties="db.combatJobQuests" />
      </div>
      <div class="col-lg">
        <DutyList title="Gatherer Job Quests" :duties="db.gathererJobQuests" />
        <DutyList title="Crafter Job Quests" :duties="db.crafterJobQuests" />
      </div>
      <div class="col-lg">
        <DutyList title="Role Quests" :duties="db.roleQuests" />
        <DutyList title="Crystalline Mean Quests" :duties="db.crystallineMeanQuests" />
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";
import DutyList from "@/components/DutyList.vue";

import dbJson from "@/assets/db.json";

export default {
  name: "Questlines",
  data() {
    return {
      db: dbJson,
    };
  },
  components: {
    Alert,
    DutyList,
  },
};
</script>
