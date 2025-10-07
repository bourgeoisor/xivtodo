<template>
  <PageHeader title="page.challenges" subtitle="pageHeader.clearedByCharacter" />

  <div class="row">
    <h2>{{ $t("challenges.exploration") }}</h2>

    <div class="col-12 col-lg-4">
      <DutyList :title="$t('shared.expansion.arr')" :duties="db.arrExploration" type="magnifier" />
      <DutyList :title="$t('shared.expansion.hw')" :duties="db.hwExploration" type="magnifier" />
    </div>
    <div class="col-12 col-lg-4">
      <DutyList :title="$t('shared.expansion.sb')" :duties="db.sbExploration" type="magnifier" />
      <DutyList :title="$t('shared.expansion.shb')" :duties="db.shbExploration" type="magnifier" />
      <DutyList :title="$t('shared.expansion.ew')" :duties="db.ewExploration" type="magnifier" />
    </div>
    <div class="col-12 col-lg-4">
      <DutyList :title="$t('shared.expansion.dt')" :duties="db.dtExploration" type="magnifier" />
      <DutyList :title="$t('challenges.exploratoryMissions')" :duties="db.explExploration" type="magnifier" />
      <DutyList :title="$t('challenges.sightseeingLogs')" :duties="db.sightseeingLogs" type="magnifier" />
    </div>
  </div>
  <hr />
  <div class="row">
    <h2>{{ $t("challenges.deepDungeons") }}</h2>

    <div class="col-12 col-lg-4">
      <DutyList :title="$t('challenges.potd')" :duties="db.potd" type="deepdungeons" />
      <DutyList :title="$t('challenges.hoh')" :duties="db.hoh" type="deepdungeons" />
    </div>
    <div class="col-12 col-lg-4">
      <DutyList :title="$t('challenges.eo')" :duties="db.eo" type="deepdungeons" />
      <DutyList :title="$t('challenges.pt')" :duties="db.pt" type="deepdungeons" />
    </div>
    <div class="col-12 col-lg-4">
      <DutyList :title="$t('challenges.potdSolo')" :duties="db.potdSolo" type="deepdungeons" />
      <DutyList :title="$t('challenges.hohSolo')" :duties="db.hohSolo" type="deepdungeons" />
      <DutyList :title="$t('challenges.eoSolo')" :duties="db.eoSolo" type="deepdungeons" />
      <DutyList :title="$t('challenges.ptSolo')" :duties="db.ptSolo" type="deepdungeons" />
    </div>
  </div>
  <hr />
  <div class="row">
    <h2>{{ $t("challenges.miscellaneous") }}</h2>

    <div class="col-12 col-lg-4">
      <DutyList :title="$t('challenges.sharedFateShB')" :duties="db.shbSharedFATE" type="fate" />
      <DutyList :title="$t('challenges.sharedFateEW')" :duties="db.ewSharedFATE" type="fate" />
      <DutyList :title="$t('challenges.sharedFateDT')" :duties="db.dtSharedFATE" type="fate" />
    </div>
    <div class="col-12 col-lg-4">
      <DutyList :title="$t('challenges.bozjanSouthernFront')" :duties="db.bozjanChallenges" type="field" />
      <DutyList :title="$t('challenges.zadnor')" :duties="db.zadnorChallenges" type="field" />
      <DutyList :title="$t('challenges.occultCrescent')" :duties="db.occultChallenges" type="field" />
      <DutyList :title="$t('challenges.variantDungeons')" :duties="db.variantChallenges" type="vc" />
    </div>
    <div class="col-12 col-lg-4">
      <DutyList :title="$t('challenges.treasureHuntClears')" :duties="db.treasureHunts" type="treasure" />
      <DutyList :title="$t('challenges.trusts')" :duties="db.trusts" type="leveling" />
      <DutyList :title="$t('challenges.islandSanctuary')" :duties="db.islandSanctuary" type="island" />
    </div>
  </div>
  <hr />
  <div class="row">
    <h2>{{ $t("challenges.achievementFates") }}</h2>

    <div class="col-12 col-lg-4">
      <DutyList :title="$t('shared.expansion.arr')" :duties="db.arrFATEs" type="fate" />
    </div>
    <div class="col-12 col-lg-4">
      <DutyList :title="$t('shared.expansion.hw')" :duties="db.hwFATEs" type="fate" />
      <DutyList :title="$t('shared.expansion.sb')" :duties="db.sbFATEs" type="fate" />
    </div>
    <div class="col-12 col-lg-4">
      <DutyList :title="$t('shared.expansion.shb')" :duties="db.shbFATEs" type="fate" />
      <DutyList :title="$t('shared.expansion.ew')" :duties="db.ewFATEs" type="fate" />
      <DutyList :title="$t('shared.expansion.dt')" :duties="db.dtFATEs" type="fate" />
    </div>
  </div>
  <hr />
  <div class="row">
    <h2>{{ $t("challenges.mentorStatus") }}</h2>

    <div class="col-12 col-lg-4">
      <DutyList :title="$t('challenges.mentorBattle')" :duties="db.mentorBattle" type="mentor" />
    </div>
    <div class="col-12 col-lg-4">
      <DutyList :title="$t('challenges.mentorTrade')" :duties="db.mentorTrade" type="mentor" />
    </div>
  </div>
  <hr />
  <div class="row">
    <h2>{{ $t("challenges.blueMage") }}</h2>

    <div class="col-12 col-lg-4">
      <DutyList :title="$t('challenges.blueARR')" :duties="db.arrBlu" type="blu" />
      <DutyList :title="$t('challenges.blueHW')" :duties="db.hwBlu" type="blu" />
    </div>
    <div class="col-12 col-lg-4">
      <DutyList :title="$t('challenges.blueSB')" :duties="db.sbBlu" type="blu" />
      <DutyList :title="$t('challenges.blueShB')" :duties="db.shbBlu" type="blu" />
    </div>
    <div class="col-12 col-lg-4">
      <DutyList :title="$t('challenges.maskedCarnivale')" :duties="db.maskedCarnivale" type="blu" />
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
