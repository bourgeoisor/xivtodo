<template>
  <div class="container">
    <h1>Duties</h1>
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
      <h2>A Realm Reborn</h2>

      <div class="col-lg">
        <DutyList title="Dungeons" :duties="db.arrDungeons" />
      </div>
      <div class="col-lg">
        <DutyList title="Trials" :duties="db.arrTrials" />
        <DutyList title="High-end Trials" :duties="db.arrTrialsEx" />
      </div>
      <div class="col-lg">
        <DutyList title="Raids" :duties="db.arrRaids" />
        <DutyList title="High-end Raids" :duties="db.arrRaidsSavUlt" />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>Heavensward</h2>

      <div class="col-lg">
        <DutyList title="Dungeons" :duties="db.hwDungeons" />
      </div>
      <div class="col-lg">
        <DutyList title="Trials" :duties="db.hwTrials" />
        <DutyList title="High-end Trials" :duties="db.hwTrialsEx" />
      </div>
      <div class="col-lg">
        <DutyList title="Raids" :duties="db.hwRaids" />
        <DutyList title="High-end Raids" :duties="db.hwRaidsSavUlt" />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>Stormblood</h2>

      <div class="col-lg">
        <DutyList title="Dungeons" :duties="db.sbDungeons" />
      </div>
      <div class="col-lg">
        <DutyList title="Trials" :duties="db.sbTrials" />
        <DutyList title="High-end Trials" :duties="db.sbTrialsEx" />
      </div>
      <div class="col-lg">
        <DutyList title="Raids" :duties="db.sbRaids" />
        <DutyList title="High-end Raids" :duties="db.sbRaidsSavUlt" />
        <DutyList title="Exploratory Missions" :duties="db.sbExploratory" />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>Shadowbringers</h2>

      <div class="col-lg">
        <DutyList title="Dungeons" :duties="db.shbDungeons" />
      </div>
      <div class="col-lg">
        <DutyList title="Trials" :duties="db.shbTrials" />
        <DutyList title="High-end Trials" :duties="db.shbTrialsEx" />
      </div>
      <div class="col-lg">
        <DutyList title="Raids" :duties="db.shbRaids" />
        <DutyList title="High-end Raids" :duties="db.shbRaidsSavUlt" />
        <DutyList title="Exploratory Missions" :duties="db.shbExploratory" />
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";
import DutyList from "@/components/DutyList.vue";

import dbJson from "@/assets/db.json";

export default {
  name: "Duties",
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
