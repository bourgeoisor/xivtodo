<template>
  <div class="container">
    <h1>
      Duties
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
        &nbsp;<span class="bi bi-cloud-slash"></span>
      </span>
    </h1>
    <Alert
      v-if="!this.$store.getters.hasCharacter"
      msg="Character data could not be found. You can load a character from the <a href='/settings' class='alert-link'>Settings</a>."
    />
    <hr />
    <div class="row">
      <h2>A Realm Reborn</h2>

      <div class="col-lg">
        <DutyList title="Dungeons" :duties="db.arrDungeons" type="dngs" />
      </div>
      <div class="col-lg">
        <DutyList title="Trials" :duties="db.arrTrials" type="trials" />
        <DutyList title="High-end Trials" :duties="db.arrTrialsEx" type="high" />
      </div>
      <div class="col-lg">
        <DutyList title="Raids" :duties="db.arrRaids" type="raids" />
        <DutyList title="High-end Raids" :duties="db.arrRaidsSavUlt" type="high" />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>Heavensward</h2>

      <div class="col-lg">
        <DutyList title="Dungeons" :duties="db.hwDungeons" type="dngs" />
      </div>
      <div class="col-lg">
        <DutyList title="Trials" :duties="db.hwTrials" type="trials" />
        <DutyList title="High-end Trials" :duties="db.hwTrialsEx" type="high" />
      </div>
      <div class="col-lg">
        <DutyList title="Raids" :duties="db.hwRaids" type="raids" />
        <DutyList title="High-end Raids" :duties="db.hwRaidsSavUlt" type="high" />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>Stormblood</h2>

      <div class="col-lg">
        <DutyList title="Dungeons" :duties="db.sbDungeons" type="dngs" />
      </div>
      <div class="col-lg">
        <DutyList title="Trials" :duties="db.sbTrials" type="trials" />
        <DutyList title="High-end Trials" :duties="db.sbTrialsEx" type="high" />
      </div>
      <div class="col-lg">
        <DutyList title="Raids" :duties="db.sbRaids" type="raids" />
        <DutyList title="High-end Raids" :duties="db.sbRaidsSavUlt" type="high" />
        <DutyList title="Exploratory Missions" :duties="db.sbExploratory" type="expl" />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>Shadowbringers</h2>

      <div class="col-lg">
        <DutyList title="Dungeons" :duties="db.shbDungeons" type="dngs" />
      </div>
      <div class="col-lg">
        <DutyList title="Trials" :duties="db.shbTrials" type="trials" />
        <DutyList title="High-end Trials" :duties="db.shbTrialsEx" type="high" />
      </div>
      <div class="col-lg">
        <DutyList title="Raids" :duties="db.shbRaids" type="raids" />
        <DutyList title="High-end Raids" :duties="db.shbRaidsSavUlt" type="high" />
        <DutyList title="Exploratory Missions" :duties="db.shbExploratory" type="expl" />
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
