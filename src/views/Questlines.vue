<template>
  <div class="container">
    <h1>Questlines</h1>
    <Alert
      v-if="!this.$store.getters.character"
      msg="Character data could not be found. You can load a character from the <a href='/settings' class='alert-link'>Settings</router-link>."
    />
    <Alert
      v-else-if="!this.$store.getters.achievementsPublic"
      msg="The achievements for this character are not public. You can set Achievements to Public in your <a class='alert-link' href='https://na.finalfantasyxiv.com/lodestone/my/setting/account/' target='_blank' rel='noopener noreferrer'>character settings</a>."
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
