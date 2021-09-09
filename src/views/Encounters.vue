<template>
  <div class="container">
    <h1>
      Encounters
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
      <h2>A Realm Reborn</h2>

      <div class="col-lg">
        <DutyList title="Dungeons" :duties="db.arrDungeons" type="dngs" :showTotal="true" />
      </div>
      <div class="col-lg">
        <DutyList title="Trials" :duties="db.arrTrials" type="trials" :showTotal="true" />
        <DutyList title="High-end Trials" :duties="db.arrTrialsEx" type="high" :showTotal="true" />
      </div>
      <div class="col-lg">
        <DutyList title="Raids" :duties="db.arrRaids" type="raids" :showTotal="true" />
        <DutyList
          title="High-end Raids"
          :duties="db.arrRaidsSavUlt"
          type="high"
          :showTotal="true"
        />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>Heavensward</h2>

      <div class="col-lg">
        <DutyList title="Dungeons" :duties="db.hwDungeons" type="dngs" :showTotal="true" />
      </div>
      <div class="col-lg">
        <DutyList title="Trials" :duties="db.hwTrials" type="trials" :showTotal="true" />
        <DutyList title="High-end Trials" :duties="db.hwTrialsEx" type="high" :showTotal="true" />
      </div>
      <div class="col-lg">
        <DutyList title="Raids" :duties="db.hwRaids" type="raids" :showTotal="true" />
        <DutyList title="High-end Raids" :duties="db.hwRaidsSavUlt" type="high" :showTotal="true" />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>Stormblood</h2>

      <div class="col-lg">
        <DutyList title="Dungeons" :duties="db.sbDungeons" type="dngs" :showTotal="true" />
      </div>
      <div class="col-lg">
        <DutyList title="Trials" :duties="db.sbTrials" type="trials" :showTotal="true" />
        <DutyList title="High-end Trials" :duties="db.sbTrialsEx" type="high" :showTotal="true" />
      </div>
      <div class="col-lg">
        <DutyList title="Raids" :duties="db.sbRaids" type="raids" :showTotal="true" />
        <DutyList title="High-end Raids" :duties="db.sbRaidsSavUlt" type="high" :showTotal="true" />
        <DutyList
          title="Exploratory Missions"
          :duties="db.sbExploratory"
          type="expl"
          :showTotal="true"
        />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>Shadowbringers</h2>

      <div class="col-lg">
        <DutyList title="Dungeons" :duties="db.shbDungeons" type="dngs" :showTotal="true" />
      </div>
      <div class="col-lg">
        <DutyList title="Trials" :duties="db.shbTrials" type="trials" :showTotal="true" />
        <DutyList title="High-end Trials" :duties="db.shbTrialsEx" type="high" :showTotal="true" />
      </div>
      <div class="col-lg">
        <DutyList title="Raids" :duties="db.shbRaids" type="raids" :showTotal="true" />
        <DutyList
          title="High-end Raids"
          :duties="db.shbRaidsSavUlt"
          type="high"
          :showTotal="true"
        />
        <DutyList
          title="Exploratory Missions"
          :duties="db.shbExploratory"
          type="expl"
          :showTotal="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";
import DutyList from "@/components/DutyList.vue";

import dbJson from "@/assets/db.json";

export default {
  name: "Encounters",
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
