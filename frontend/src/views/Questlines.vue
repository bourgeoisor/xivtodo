<template>
  <PageHeader title="page.questlines" subtitle="pageHeader.clearedByCharacter" />

  <div class="row">
    <h2>{{ $t("questlines.stories") }}</h2>

    <div class="col-12 col-lg-4">
      <DutyList :title="$t('questlines.mainScenarioQuests')" :duties="db.mainStoryQuest" type="msq" />
    </div>

    <div class="col-12 col-lg-4">
      <DutyList :title="$t('questlines.sideStoryQuests')" :duties="db.sideStoryQuests" type="sidequest" />
      <DutyList :title="$t('questlines.encounterQuests')" :duties="db.dutiesQuests" type="encounterquest" />
    </div>

    <div class="col-12 col-lg-4">
      <DutyList :title="$t('questlines.tribalQuests')" :duties="db.beastTribeQuests" type="tribal" />
      <DutyList :title="$t('questlines.alliedTribalQuests')" :duties="db.alliedBeastTribeQuests" type="tribal" />
      <DutyList :title="$t('questlines.customDeliveryQuests')" :duties="db.customDeliveryQuests" type="deliveries" />
    </div>
  </div>
  <hr />
  <div class="row">
    <h2>{{ $t("questlines.jobsRolesRelics") }}</h2>

    <div class="col-12 col-lg-4">
      <DutyList :title="$t('questlines.combatJobQuests')" :duties="db.combatJobQuests" type="combat" />
      <DutyList :title="$t('questlines.gathererJobQuests')" :duties="db.gathererJobQuests" type="gathering" />
      <DutyList :title="$t('questlines.crafterJobQuests')" :duties="db.crafterJobQuests" type="crafting" />
    </div>
    <div class="col-12 col-lg-4">
      <DutyList :title="$t('questlines.roleQuestsShB')" :duties="db.shbRoleQuests" type="combat" />
      <DutyList :title="$t('questlines.roleQuestsEW')" :duties="db.ewRoleQuests" type="combat" />
      <DutyList :title="$t('questlines.roleQuestsDT')" :duties="db.dtRoleQuests" type="combat" />
      <DutyList :title="$t('questlines.relicQuests')" :duties="db.relicQuests" type="relic" />
    </div>
    <div class="col-12 col-lg-4">
      <DutyList :title="$t('questlines.crystallineMeanQuests')" :duties="db.crystallineMeanQuests" type="leveling" />
      <DutyList :title="$t('questlines.studiumDeliveryQuests')" :duties="db.studiumDeliveryQuests" type="leveling" />
      <DutyList :title="$t('questlines.wachumeqimeqiDeliveryQuests')" :duties="db.wachumeqimeqiDeliveryQuests" type="leveling" />
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
