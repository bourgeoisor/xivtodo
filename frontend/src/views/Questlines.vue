<template>
  <PageHeader title="page.questlines" subtitle="pageHeader.clearedByCharacter" />

  <div class="row">
    <h2>{{ $t("questlines.stories") }}</h2>

    <div class="col-12 col-lg-4">
      <DutyList :title="$t('questlines.mainScenarioQuests')" :duties="db.mainStoryQuest" />
    </div>

    <div class="col-12 col-lg-4">
      <DutyList :title="$t('questlines.sideStoryQuests')" :duties="db.sideStoryQuests" />
      <DutyList :title="$t('questlines.encounterQuests')" :duties="db.dutiesQuests" />
    </div>

    <div class="col-12 col-lg-4">
      <DutyList :title="$t('questlines.tribalQuests')" :duties="db.beastTribeQuests" />
      <DutyList :title="$t('questlines.alliedTribalQuests')" :duties="db.alliedBeastTribeQuests" />
      <DutyList :title="$t('questlines.customDeliveryQuests')" :duties="db.customDeliveryQuests" />
    </div>
  </div>
  <hr />
  <div class="row">
    <h2>{{ $t("questlines.jobsRolesRelics") }}</h2>

    <div class="col-12 col-lg-4">
      <DutyList :title="$t('questlines.combatJobQuests')" :duties="db.combatJobQuests" />
      <DutyList :title="$t('questlines.gathererJobQuests')" :duties="db.gathererJobQuests" />
      <DutyList :title="$t('questlines.crafterJobQuests')" :duties="db.crafterJobQuests" />
    </div>
    <div class="col-12 col-lg-4">
      <DutyList :title="$t('questlines.roleQuestsShB')" :duties="db.shbRoleQuests" />
      <DutyList :title="$t('questlines.roleQuestsEW')" :duties="db.ewRoleQuests" />
      <DutyList :title="$t('questlines.roleQuestsDT')" :duties="db.dtRoleQuests" />
      <DutyList :title="$t('questlines.relicQuests')" :duties="db.relicQuests" />
    </div>
    <div class="col-12 col-lg-4">
      <DutyList :title="$t('questlines.crystallineMeanQuests')" :duties="db.crystallineMeanQuests" />
      <DutyList :title="$t('questlines.studiumDeliveryQuests')" :duties="db.studiumDeliveryQuests" />
      <DutyList :title="$t('questlines.wachumeqimeqiDeliveryQuests')" :duties="db.wachumeqimeqiDeliveryQuests" />
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import DutyList from "@/components/DutyList.vue";

import dbJson from "@/assets/db.json";

export default {
  name: "QuestlinesView",
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
