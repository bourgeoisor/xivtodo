<template>
  <div class="container">
    <h1>
      {{ $t("page.challenges") }}
      <span v-if="this.$store.getters.hasCharacter" class="fs-3 fw-lighter">
        {{
          $t("pageHeader.clearedByCharacter", { characterName: this.$store.getters.character.Name })
        }}
        <div v-if="this.$store.getters.activeCharacterOutOfDate" class="text-info fs-6">
          <div class="spinner-border spinner-border-sm" role="status"></div>
          {{ $t("message.updatingCharacter") }}
        </div>
        <div v-else-if="!this.$store.getters.achievementsPublic" class="text-warning fs-6">
          {{ $t("message.achievementsNotPublic") }}
        </div>
      </span>
    </h1>
    <AlertMsg
      v-if="!this.$store.getters.isSignedIn"
      type="normal"
      :msg="$t('message.notSignedIn', { url: this.$store.state.env.VUE_APP_DISCORD_AUTH_URI })"
    />
    <AlertMsg
      v-else-if="!this.$store.getters.hasCharacter"
      type="normal"
      :msg="$t('message.noCharacters')"
    />
    <hr />
    <div class="row">
      <h2>{{ $t("challenges.deepDungeons") }}</h2>

      <div class="col-12 col-lg-4">
        <DutyList :title="$t('challenges.potd')" :duties="db.potd" />
        <DutyList :title="$t('challenges.potdSolo')" :duties="db.potdSolo" />
      </div>
      <div class="col-12 col-lg-4">
        <DutyList :title="$t('challenges.hoh')" :duties="db.hoh" />
        <DutyList :title="$t('challenges.hohSolo')" :duties="db.hohSolo" />
      </div>
      <div class="col-12 col-lg-4">
        <DutyList :title="$t('challenges.eo')" :duties="db.eo" />
        <DutyList :title="$t('challenges.eoSolo')" :duties="db.eoSolo" />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>{{ $t("challenges.exploration") }}</h2>

      <div class="col-12 col-lg-4">
        <DutyList :title="$t('shared.expansion.arr')" :duties="db.arrExploration" />
        <DutyList :title="$t('shared.expansion.hw')" :duties="db.hwExploration" />
      </div>
      <div class="col-12 col-lg-4">
        <DutyList :title="$t('shared.expansion.sb')" :duties="db.sbExploration" />
        <DutyList :title="$t('shared.expansion.shb')" :duties="db.shbExploration" />
        <DutyList :title="$t('shared.expansion.ew')" :duties="db.ewExploration" />
      </div>
      <div class="col-12 col-lg-4">
        <DutyList :title="$t('challenges.exploratoryMissions')" :duties="db.explExploration" />
        <DutyList :title="$t('challenges.sightseeingLogs')" :duties="db.sightseeingLogs" />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>{{ $t("challenges.miscellaneous") }}</h2>

      <div class="col-12 col-lg-4">
        <DutyList :title="$t('challenges.sharedFateShB')" :duties="db.shbSharedFATE" />
        <DutyList :title="$t('challenges.sharedFateEW')" :duties="db.ewSharedFATE" />
      </div>
      <div class="col-12 col-lg-4">
        <DutyList :title="$t('challenges.bozjanSouthernFront')" :duties="db.bozjanChallenges" />
        <DutyList :title="$t('challenges.zadnor')" :duties="db.zadnorChallenges" />
        <DutyList :title="$t('challenges.variantDungeons')" :duties="db.variantChallenges" />
      </div>
      <div class="col-12 col-lg-4">
        <DutyList :title="$t('challenges.treasureHuntClears')" :duties="db.treasureHunts" />
        <DutyList :title="$t('challenges.trusts')" :duties="db.trusts" />
        <DutyList :title="$t('challenges.islandSanctuary')" :duties="db.islandSanctuary" />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>{{ $t("challenges.achievementFates") }}</h2>

      <div class="col-12 col-lg-4">
        <DutyList :title="$t('shared.expansion.arr')" :duties="db.arrFATEs" />
      </div>
      <div class="col-12 col-lg-4">
        <DutyList :title="$t('shared.expansion.hw')" :duties="db.hwFATEs" />
        <DutyList :title="$t('shared.expansion.sb')" :duties="db.sbFATEs" />
      </div>
      <div class="col-12 col-lg-4">
        <DutyList :title="$t('shared.expansion.shb')" :duties="db.shbFATEs" />
        <DutyList :title="$t('shared.expansion.ew')" :duties="db.ewFATEs" />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>{{ $t("challenges.blueMage") }}</h2>

      <div class="col-12 col-lg-4">
        <DutyList :title="$t('challenges.blueARR')" :duties="db.arrBlu" />
        <DutyList :title="$t('challenges.blueHW')" :duties="db.hwBlu" />
      </div>
      <div class="col-12 col-lg-4">
        <DutyList :title="$t('challenges.blueSB')" :duties="db.sbBlu" />
      </div>
      <div class="col-12 col-lg-4">
        <DutyList :title="$t('challenges.maskedCarnivale')" :duties="db.maskedCarnivale" />
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
