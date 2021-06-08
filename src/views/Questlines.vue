<template>
  <div class="container">
    <h1>Questlines</h1>
    <Alert
      v-if="!this.$store.getters.characterData"
      msg="Character data could not be found. You can load a character from the <a href='/settings' class='alert-link'>Settings</router-link>."
    />
    <Alert
      v-else-if="!this.$store.getters.achievementsPublic"
      msg="The achievements for this character are not public. You can set Achievements to Public in your <a class='alert-link' href='https://na.finalfantasyxiv.com/lodestone/my/setting/account/' target='_blank' rel='noopener noreferrer'>character settings</a>."
    />
    <hr />
    <div class="row">
      <h2>Stories</h2>

      <div class="col-md">
        <DutyList title="Main Story Quest" :duties="questlines.mainStoryQuest" />
      </div>

      <div class="col-md">
        <DutyList title="Side Story Quests" :duties="questlines.sideStoryQuests" />
        <DutyList title="Duties Quests" :duties="questlines.dutiesQuests" />
        <DutyList title="Relic Quests" :duties="questlines.relicQuests" />
      </div>

      <div class="col-md">
        <DutyList title="Beast Tribe Quests" :duties="questlines.beastTribeQuests" />
        <DutyList title="Allied Beast Tribe Quests" :duties="questlines.alliedBeastTribeQuests" />
        <DutyList title="Custom Delivery Quests" :duties="questlines.customDeliveryQuests" />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>Job Quests</h2>

      <div class="col-md">
        <DutyList title="Combat Job Quests" :duties="questlines.combatJobQuests" />
      </div>
      <div class="col-md">
        <DutyList title="Gatherer Job Quests" :duties="questlines.gathererJobQuests" />
        <DutyList title="Crafter Job Quests" :duties="questlines.crafterJobQuests" />
      </div>
      <div class="col-md">
        <DutyList title="Role Quests" :duties="questlines.roleQuests" />
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";
import DutyList from "@/components/DutyList.vue";

import questlinesJson from "@/assets/questlines.json";

export default {
  name: "Questlines",
  data() {
    return {
      questlines: questlinesJson,
    };
  },
  components: {
    Alert,
    DutyList,
  },
};
</script>
