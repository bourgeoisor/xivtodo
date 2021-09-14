<template>
  <div class="container">
    <h1>
      {{ $t("page.encounters") }}
      <span
        v-if="this.$store.getters.hasCharacter && this.$store.getters.achievementsPublic"
        class="fs-3 fw-lighter"
      >
        {{
          $t("message.clearedByCharacter", { characterName: this.$store.getters.character.Name })
        }}
      </span>
      <span v-else-if="this.$store.getters.hasCharacter" class="fs-3 fw-lighter text-warning">
        <abbr title="The achievements for this characters are not set to public in Lodestone.">
          {{
            $t("message.clearedByCharacter", { characterName: this.$store.getters.character.Name })
          }}
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
      <h2>{{ $t("misc.expansion.arr") }}</h2>

      <div class="col-lg">
        <DutyList
          :title="$t('encounters.dungeons')"
          :duties="db.arrDungeons"
          type="dngs"
          :showTotal="true"
        />
      </div>
      <div class="col-lg">
        <DutyList
          :title="$t('encounters.trials')"
          :duties="db.arrTrials"
          type="trials"
          :showTotal="true"
        />
        <DutyList
          :title="$t('encounters.heTrials')"
          :duties="db.arrTrialsEx"
          type="high"
          :showTotal="true"
        />
      </div>
      <div class="col-lg">
        <DutyList
          :title="$t('encounters.raids')"
          :duties="db.arrRaids"
          type="raids"
          :showTotal="true"
        />
        <DutyList
          :title="$t('encounters.heRaids')"
          :duties="db.arrRaidsSavUlt"
          type="high"
          :showTotal="true"
        />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>{{ $t("misc.expansion.hw") }}</h2>

      <div class="col-lg">
        <DutyList
          :title="$t('encounters.dungeons')"
          :duties="db.hwDungeons"
          type="dngs"
          :showTotal="true"
        />
      </div>
      <div class="col-lg">
        <DutyList
          :title="$t('encounters.trials')"
          :duties="db.hwTrials"
          type="trials"
          :showTotal="true"
        />
        <DutyList
          :title="$t('encounters.heTrials')"
          :duties="db.hwTrialsEx"
          type="high"
          :showTotal="true"
        />
      </div>
      <div class="col-lg">
        <DutyList
          :title="$t('encounters.raids')"
          :duties="db.hwRaids"
          type="raids"
          :showTotal="true"
        />
        <DutyList
          :title="$t('encounters.heRaids')"
          :duties="db.hwRaidsSavUlt"
          type="high"
          :showTotal="true"
        />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>{{ $t("misc.expansion.sb") }}</h2>

      <div class="col-lg">
        <DutyList
          :title="$t('encounters.dungeons')"
          :duties="db.sbDungeons"
          type="dngs"
          :showTotal="true"
        />
      </div>
      <div class="col-lg">
        <DutyList
          :title="$t('encounters.trials')"
          :duties="db.sbTrials"
          type="trials"
          :showTotal="true"
        />
        <DutyList
          :title="$t('encounters.heTrials')"
          :duties="db.sbTrialsEx"
          type="high"
          :showTotal="true"
        />
      </div>
      <div class="col-lg">
        <DutyList
          :title="$t('encounters.raids')"
          :duties="db.sbRaids"
          type="raids"
          :showTotal="true"
        />
        <DutyList
          :title="$t('encounters.heRaids')"
          :duties="db.sbRaidsSavUlt"
          type="high"
          :showTotal="true"
        />
        <DutyList
          :title="$t('encounters.exploratory')"
          :duties="db.sbExploratory"
          type="expl"
          :showTotal="true"
        />
      </div>
    </div>
    <hr />
    <div class="row">
      <h2>{{ $t("misc.expansion.shb") }}</h2>

      <div class="col-lg">
        <DutyList
          :title="$t('encounters.dungeons')"
          :duties="db.shbDungeons"
          type="dngs"
          :showTotal="true"
        />
      </div>
      <div class="col-lg">
        <DutyList
          :title="$t('encounters.trials')"
          :duties="db.shbTrials"
          type="trials"
          :showTotal="true"
        />
        <DutyList
          :title="$t('encounters.heTrials')"
          :duties="db.shbTrialsEx"
          type="high"
          :showTotal="true"
        />
      </div>
      <div class="col-lg">
        <DutyList
          :title="$t('encounters.raids')"
          :duties="db.shbRaids"
          type="raids"
          :showTotal="true"
        />
        <DutyList
          :title="$t('encounters.heRaids')"
          :duties="db.shbRaidsSavUlt"
          type="high"
          :showTotal="true"
        />
        <DutyList
          :title="$t('encounters.exploratory')"
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
