<template>
  <div class="container">
    <h1>
      {{ $t("page.profile") }}
      <span v-if="this.$store.getters.hasCharacter" class="fs-3 fw-lighter">
        {{ $t("message.ofCharacter", { characterName: this.$store.getters.character.Name }) }}
        <div v-if="this.$store.getters.characterOutOfDateACT" class="text-info fs-6">
          <div class="spinner-border spinner-border-sm" role="status"></div>
          Updating character data, this may take a minute...
        </div>
      </span>
    </h1>
    <hr />
    <div class="row">
      <div class="col-lg d-none d-lg-block">
        <img
          id="character-portrait"
          :src="this.$store.getters.character.Portrait"
          alt="Portrait of your character"
        />
        <br />
        <div v-if="this.$store.getters.character.Bio != '-'" class="fst-italic text-break pt-2">
          “{{ this.$store.getters.character.Bio }}”
        </div>
        <br />
      </div>

      <div class="col-lg">
        <h2>{{ $t("profile.characterInfo") }}</h2>
        <div class="info-block">
          <b>{{ $t("profile.world") }}</b><br />
          <i class="bi bi-arrow-return-right text-muted"></i>
          {{ this.$store.getters.character.World }} ({{ this.$store.getters.character.DC }})
        </div>

        <div class="info-block">
          <b>{{ $t("profile.raceClan") }}</b><br />
          <i class="bi bi-arrow-return-right text-muted"></i>
          {{ this.$store.getters.character.Race?.Name }} /
          {{ this.$store.getters.character.Tribe?.Name }}
          <i v-if="this.$store.getters.character.Gender == 1" class="bi bi-gender-male"></i>
          <i v-else class="bi bi-gender-female"></i>
        </div>

        <div class="info-block">
          <b>{{ $t("profile.nameday") }}</b><br />
          <i class="bi bi-arrow-return-right text-muted"></i>
          {{ this.$store.getters.character.Nameday }}
        </div>

        <div class="info-block">
          <b>{{ $t("profile.guardian") }}</b><br />
          <i class="bi bi-arrow-return-right text-muted"></i>
          {{ this.$store.getters.character.GuardianDeity?.Name }}
        </div>

        <br />

        <div v-if="this.$store.getters.character.FreeCompanyName" class="info-block">
          <b>{{ $t("profile.freeCompany") }}</b><br />
          <i class="bi bi-arrow-return-right text-muted"></i>
          {{ this.$store.getters.character.FreeCompanyName }}
        </div>

        <div class="info-block">
          <b>{{ $t("profile.cityState") }}</b><br />
          <i class="bi bi-arrow-return-right text-muted"></i>
          <img :src="'/icons/town-' + this.$store.getters.character.Town?.ID + '.png'" />
          {{ this.$store.getters.character.Town?.Name }}
        </div>

        <template v-if="this.$store.getters.character.GrandCompany">
          <div class="info-block">
            <b>{{ $t("profile.grandCompany") }}</b><br />
            <i class="bi bi-arrow-return-right text-muted"></i>
            <img
              :src="
                '/icons/gc-' +
                this.$store.getters.character.GrandCompany.Company?.ID +
                '-' +
                this.$store.getters.character.GrandCompany.Rank?.ID +
                '.png'
              "
            />
            {{ this.$store.getters.character.GrandCompany.Company?.Name }} /
            {{ this.$store.getters.character.GrandCompany.Rank?.Name }}
          </div>
        </template>
        <template v-if="this.$store.getters.achievementsPublic">
          <br />
          <div class="info-block">
            <b>{{ $t("profile.playingSince") }}</b><br />
            <i class="bi bi-arrow-return-right text-muted"></i>
            {{ new Date(this.$store.getters.characterData.PlayingSince).toDateString() }}
          </div>
          <div class="info-block">
            <b>{{ $t("profile.achievements") }}</b><br />
            <i class="bi bi-arrow-return-right text-muted"></i>
            {{ this.$store.getters.achievements.length }}
          </div>
        </template>
        <br />
      </div>
      <div class="col-lg">
        <h2>{{ $t("profile.jobLevels") }}</h2>
        <div class="info-block row">
          <b>{{ $t("profile.tanks") }}</b><br />
          <div class="text-center pt-1">
            <JobLevel initial="gla" :title="$t('profile.job.gla')" type="tank" />
            <JobLevel initial="pld" :title="$t('profile.job.pld')" type="tank" />
            <JobLevel initial="mrd" :title="$t('profile.job.mrd')" type="tank" />
            <JobLevel initial="war" :title="$t('profile.job.war')" type="tank" />
            <JobLevel initial="drk" :title="$t('profile.job.drk')" type="tank" />
            <JobLevel initial="gnb" :title="$t('profile.job.gnb')" type="tank" />
          </div>
        </div>
        <div class="info-block row">
          <b>{{ $t("profile.healers") }}</b><br />
          <div class="text-center pt-1">
            <JobLevel initial="cnj" :title="$t('profile.job.cnj')" type="healer" />
            <JobLevel initial="whm" :title="$t('profile.job.whm')" type="healer" />
            <JobLevel initial="sch" :title="$t('profile.job.sch')" type="healer" />
            <JobLevel initial="ast" :title="$t('profile.job.ast')" type="healer" />
          </div>
        </div>
        <div class="info-block row">
          <b>{{ $t("profile.dps") }}</b><br />
          <div class="text-center pt-1">
            <JobLevel initial="pgl" :title="$t('profile.job.pgl')" type="dps" />
            <JobLevel initial="mnk" :title="$t('profile.job.mnk')" type="dps" />
            <JobLevel initial="lnc" :title="$t('profile.job.lnc')" type="dps" />
            <JobLevel initial="drg" :title="$t('profile.job.drg')" type="dps" />
            <JobLevel initial="rog" :title="$t('profile.job.rog')" type="dps" />
            <JobLevel initial="nin" :title="$t('profile.job.nin')" type="dps" />
            <JobLevel initial="sam" :title="$t('profile.job.sam')" type="dps" />
            <JobLevel initial="arc" :title="$t('profile.job.arc')" type="dps" />
            <JobLevel initial="brd" :title="$t('profile.job.brd')" type="dps" />
            <JobLevel initial="mch" :title="$t('profile.job.mch')" type="dps" />
            <JobLevel initial="dnc" :title="$t('profile.job.dnc')" type="dps" />
            <JobLevel initial="thm" :title="$t('profile.job.thm')" type="dps" />
            <JobLevel initial="blm" :title="$t('profile.job.blm')" type="dps" />
            <JobLevel initial="acn" :title="$t('profile.job.acn')" type="dps" />
            <JobLevel initial="smn" :title="$t('profile.job.smn')" type="dps" />
            <JobLevel initial="rdm" :title="$t('profile.job.rdm')" type="dps" />
            <JobLevel initial="blu" :title="$t('profile.job.blu')" type="dps" />
          </div>
        </div>
        <div class="info-block row">
          <b>{{ $t("profile.crafters") }}</b><br />
          <div class="text-center pt-1">
            <JobLevel initial="crp" :title="$t('profile.job.crp')" type="crafter" />
            <JobLevel initial="bsm" :title="$t('profile.job.bsm')" type="crafter" />
            <JobLevel initial="arm" :title="$t('profile.job.arm')" type="crafter" />
            <JobLevel initial="gsm" :title="$t('profile.job.gsm')" type="crafter" />
            <JobLevel initial="ltw" :title="$t('profile.job.ltw')" type="crafter" />
            <JobLevel initial="wvr" :title="$t('profile.job.wvr')" type="crafter" />
            <JobLevel initial="alc" :title="$t('profile.job.alc')" type="crafter" />
            <JobLevel initial="cul" :title="$t('profile.job.cul')" type="crafter" />
          </div>
        </div>
        <div class="info-block row">
          <b>{{ $t("profile.gatherers") }}</b><br />
          <div class="text-center pt-1">
            <JobLevel initial="min" :title="$t('profile.job.min')" type="gatherer" />
            <JobLevel initial="btn" :title="$t('profile.job.btn')" type="gatherer" />
            <JobLevel initial="fsh" :title="$t('profile.job.fsh')" type="gatherer" />
          </div>
        </div>
        <br />
        <!-- @TODO: https://github.com/bourgeoisor/xivtodo/issues/14
        <div class="info-block">
          <b>{{ $t("profile.elementalLevel") }}</b><br />
          <span
            :class="{
              'fw-bold': this.$store.getters.character.ClassJobElemental?.Level == 60,
            }"
          >
            <i class="bi bi-arrow-return-right text-muted"></i>
            {{ this.$store.getters.character.ClassJobElemental?.Level || "0" }}
          </span>
        </div>
        <div class="info-block">
          <b>{{ $t("profile.resistanceRank") }}</b><br />
          <span
            :class="{
              'fw-bold': this.$store.getters.character.ClassJobBozjan?.Level == 25,
            }"
          >
            <i class="bi bi-arrow-return-right text-muted"></i>
            {{ this.$store.getters.character.ClassJobBozjan?.Level || "0" }}
          </span>
        </div>
        <br /> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.info-block {
  line-height: 1.3;
  margin-bottom: 5px;
  margin-top: 5px;
  font-weight: 300;

  b {
    color: #41b883;
    font-weight: 800;
  }

  img {
    height: 1.3em;
    margin-left: 5px;
  }
}

#character-portrait {
  width: 100%;
  border-radius: 20px;
  padding: 0.1rem;
  background-color: #444444;
}

.night #character-portrait {
  background-color: #dddddd;
}
</style>

<script>
import JobLevel from "@/components/JobLevel.vue";

export default {
  name: "Profile",
  components: {
    JobLevel,
  },
};
</script>
