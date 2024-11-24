<template>
  <PageHeader title="page.challenges" subtitle="pageHeader.clearedByCharacter" />

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
      <DutyList :title="$t('shared.expansion.dt')" :duties="db.dtExploration" />
      <DutyList :title="$t('challenges.exploratoryMissions')" :duties="db.explExploration" />
      <DutyList :title="$t('challenges.sightseeingLogs')" :duties="db.sightseeingLogs" />
    </div>
  </div>
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
    <h2>{{ $t("challenges.miscellaneous") }}</h2>

    <div class="col-12 col-lg-4">
      <DutyList :title="$t('challenges.sharedFateShB')" :duties="db.shbSharedFATE" />
      <DutyList :title="$t('challenges.sharedFateEW')" :duties="db.ewSharedFATE" />
      <DutyList :title="$t('challenges.sharedFateDT')" :duties="db.dtSharedFATE" />
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
      <DutyList :title="$t('shared.expansion.dt')" :duties="db.dtFATEs" />
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
      <DutyList :title="$t('challenges.blueShB')" :duties="db.shbBlu" />
    </div>
    <div class="col-12 col-lg-4">
      <DutyList :title="$t('challenges.maskedCarnivale')" :duties="db.maskedCarnivale" />
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
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
    PageHeader,
    DutyList,
  },
};
</script>
