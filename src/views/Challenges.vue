<template>
  <div class="container">
    <h1>
      {{ $t("page.challenges") }}
      <span v-if="this.$store.getters.hasCharacter" class="fs-3 fw-lighter">
        {{
          $t("message.clearedByCharacter", { characterName: this.$store.getters.character.Name })
        }}
        <div v-if="this.$store.getters.activeCharacterOutOfDate" class="text-info fs-6">
          <div class="spinner-border spinner-border-sm" role="status"></div>
          Updating character data, this may take a minute...
        </div>
        <div v-else-if="!this.$store.getters.achievementsPublic" class="text-warning fs-6">
          The achievements for this characters are not set to public in Lodestone.
        </div>
      </span>
    </h1>
    <AlertMsg
      v-if="!this.$store.getters.userData"
      type="normal"
      :msg="
        'No characters found. You can <a href=\'' +
        this.$store.state.env.VUE_APP_DISCORD_AUTH_URI +
        '\' class=\'alert-link\'>sign in with Discord</a> to add them.'
      "
    />
    <AlertMsg
      v-else-if="!this.$store.getters.hasCharacter"
      type="normal"
      msg="No characters found. You can add your characters from the <a href='/settings' class='alert-link'>Settings</a>."
    />
    <hr />
    <div class="row">
      <h2>Deep Dungeons</h2>

      <div class="col-12 col-lg-4">
        <DutyList title="Palace of the Dead" :duties="db.potd" />
      </div>
      <div class="col-12 col-lg-4">
        <DutyList title="Heaven-on-High" :duties="db.hoh" />
      </div>
      <div class="col-12 col-lg-4">
        <DutyList title="Palace of the Dead (Solo)" :duties="db.potdSolo" />
        <DutyList title="Heaven-on-High (Solo)" :duties="db.hohSolo" />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>Exploration</h2>

      <div class="col-12 col-lg-4">
        <DutyList title="A Realm Reborn" :duties="db.arrExploration" />
        <DutyList title="Heavensward" :duties="db.hwExploration" />
      </div>
      <div class="col-12 col-lg-4">
        <DutyList title="Stormblood" :duties="db.sbExploration" />
        <DutyList title="Shadowbringers" :duties="db.shbExploration" />
        <DutyList title="Endwalker" :duties="db.ewExploration" />
      </div>
      <div class="col-12 col-lg-4">
        <DutyList title="Exploratory Missions" :duties="db.explExploration" />
        <DutyList title="Sightseeing Logs" :duties="db.sightseeingLogs" />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>Miscellaneous</h2>

      <div class="col-12 col-lg-4">
        <DutyList title="Shared FATE (ShB)" :duties="db.shbSharedFATE" />
        <DutyList title="Shared FATE (EW)" :duties="db.ewSharedFATE" />
      </div>
      <div class="col-12 col-lg-4">
        <DutyList title="Bozjan Southern Front" :duties="db.bozjanChallenges" />
        <DutyList title="Zadnor" :duties="db.zadnorChallenges" />
      </div>
      <div class="col-12 col-lg-4">
        <DutyList title="Treasure Hunt Clears" :duties="db.treasureHunts" />
        <DutyList title="Trusts" :duties="db.trusts" />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>Achievement FATEs</h2>

      <div class="col-12 col-lg-4">
        <DutyList title="A Realm Reborn" :duties="db.arrFATEs" />
      </div>
      <div class="col-12 col-lg-4">
        <DutyList title="Heavensward" :duties="db.hwFATEs" />
        <DutyList title="Stormblood" :duties="db.sbFATEs" />
      </div>
      <div class="col-12 col-lg-4">
        <DutyList title="Shadowbringer" :duties="db.shbFATEs" />
        <DutyList title="Endwalker" :duties="db.ewFATEs" />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>Blue Mage</h2>

      <div class="col-12 col-lg-4">
        <DutyList title="BLU Encounters (ARR)" :duties="db.arrBlu" />
        <DutyList title="BLU Encounters (HW)" :duties="db.hwBlu" />
      </div>
      <div class="col-12 col-lg-4">
        <DutyList title="BLU Encounters (SB)" :duties="db.sbBlu" />
      </div>
      <div class="col-12 col-lg-4">
        <DutyList title="Masked Carnivale" :duties="db.maskedCarnivale" />
      </div>
    </div>
  </div>
</template>

<script>
import AlertMsg from "@/components/AlertMsg.vue";
import DutyList from "@/components/DutyList.vue";

import dbJson from "@/assets/db.json";

export default {
  name: "ChallengesView",
  data() {
    return {
      db: dbJson,
    };
  },
  components: {
    AlertMsg,
    DutyList,
  },
};
</script>
