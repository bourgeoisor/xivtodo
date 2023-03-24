<template>
  <div class="container">
    <h1>
      {{ $t("page.questlines") }}
      <span v-if="this.$store.getters.hasCharacter" class="fs-3 fw-lighter">
        {{
          $t("pageHeader.clearedByCharacter", 2, { characterName: this.$store.getters.character.Name })
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
        <DutyList :title="$t('questlines.relicQuests')" :duties="db.relicQuests" />
      </div>
      <div class="col-12 col-lg-4">
        <DutyList :title="$t('questlines.crystallineMeanQuests')" :duties="db.crystallineMeanQuests" />
        <DutyList :title="$t('questlines.studiumDeliveryQuests')" :duties="db.studiumDeliveryQuests" />
      </div>
    </div>
  </div>
</template>

<script>
import AlertMsg from "@/components/AlertMsg.vue";
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
    AlertMsg,
    DutyList,
  },
};
</script>
