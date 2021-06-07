<template>
  <div class="container">
    <h1>Duties</h1>
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
      <h2>A Realm Reborn</h2>

      <div class="col-md">
        <DutyList title="Dungeons" :duties="duties.arrDungeons" />
      </div>
      <div class="col-md">
        <DutyList title="Trials" :duties="duties.arrTrials" />
        <DutyList title="High-end Trials" :duties="duties.arrTrialsEx" />
      </div>
      <div class="col-md">
        <DutyList title="Raids" :duties="duties.arrRaids" />
        <DutyList title="High-end Raids" :duties="duties.arrRaidsSavUlt" />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>Heavensward</h2>

      <div class="col-md">
        <DutyList title="Dungeons" :duties="duties.hwDungeons" />
      </div>
      <div class="col-md">
        <DutyList title="Trials" :duties="duties.hwTrials" />
        <DutyList title="High-end Trials" :duties="duties.hwTrialsEx" />
      </div>
      <div class="col-md">
        <DutyList title="Raids" :duties="duties.hwRaids" />
        <DutyList title="High-end Raids" :duties="duties.hwRaidsSavUlt" />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>Stormblood</h2>

      <div class="col-md">
        <DutyList title="Dungeons" :duties="duties.sbDungeons" />
      </div>
      <div class="col-md">
        <DutyList title="Trials" :duties="duties.sbTrials" />
        <DutyList title="High-end Trials" :duties="duties.sbTrialsEx" />
      </div>
      <div class="col-md">
        <DutyList title="Raids" :duties="duties.sbRaids" />
        <DutyList title="High-end Raids" :duties="duties.sbRaidsSavUlt" />
        <DutyList title="Exploratory Missions" :duties="duties.sbExploratory" />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>Shadowbringers</h2>

      <div class="col-md">
        <DutyList title="Dungeons" :duties="duties.shbDungeons" />
      </div>
      <div class="col-md">
        <DutyList title="Trials" :duties="duties.shbTrials" />
        <DutyList title="High-end Trials" :duties="duties.shbTrialsEx" />
      </div>
      <div class="col-md">
        <DutyList title="Raids" :duties="duties.shbRaids" />
        <DutyList title="High-end Raids" :duties="duties.shbRaidsSavUlt" />
        <DutyList title="Exploratory Missions" :duties="duties.shbExploratory" />
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";
import DutyList from "@/components/DutyList.vue";

import dutiesJson from "@/assets/duties.json";

export default {
  name: "Duties",
  data() {
    return {
      duties: dutiesJson,
    };
  },
  components: {
    Alert,
    DutyList,
  },
};
</script>
