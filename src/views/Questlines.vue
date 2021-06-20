<template>
  <div class="container">
    <h1>
      Questlines
      <span v-if="this.$store.getters.hasCharacter" class="fs-3 fw-lighter">
        cleared by {{ this.$store.getters.character.Name }}
      </span>
    </h1>
    <Alert
      v-if="!this.$store.getters.hasCharacter"
      msg="Character data could not be found. You can load a character from the <a href='/settings' class='alert-link'>Settings</router-link>."
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
