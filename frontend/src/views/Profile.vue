<template>
  <PageHeader title="page.profile" subtitle="pageHeader.ofCharacter" />

  <div class="row">
    <!-- Character portrait & bio -->
    <div class="col-lg d-none d-lg-block">
      <!-- Portrait -->
      <img id="character-portrait" :src="this.$store.getters.character.Portrait" :alt="$t('shared.portraitAlt')" />
      <br />

      <!-- Bio -->
      <blockquote v-if="this.hasBio" class="blockquote fs-6 text-break p-2">
        <p>“{{ this.$store.getters.character.Bio }}”</p>
      </blockquote>
    </div>

    <!-- Character info -->
    <div class="col-md-6 col-lg">
      <h2>{{ $t("profile.characterInfo") }}</h2>

      <!-- Info: World -->
      <div class="info-block">
        <b>{{ $t("profile.world") }}</b>
        <br />
        {{ this.$store.getters.character.World }} ({{ this.$store.getters.character.DC }})
      </div>

      <!-- Info: Race & clan -->
      <div class="info-block">
        <b>{{ $t("profile.raceClan") }}</b>
        <br />
        <!-- <span> -->
        {{ this.race }} / {{ this.clan }}
        <i class="fa-fw fal" :class="{ 'fa-mars': this.isMasculine, 'fa-venus': !this.isMasculine }"></i>
        <!-- </span> -->
      </div>

      <!-- Info: Nameday -->
      <div class="info-block">
        <b>{{ $t("profile.nameday") }}</b>
        <br />
        {{ this.$store.getters.character.Nameday }}
      </div>

      <!-- Info: Guardian -->
      <div class="info-block">
        <b>{{ $t("profile.guardian") }}</b>
        <br />
        <img :src="this.guardianImageURI" />
        {{ this.localeName(this.$store.getters.character.GuardianDeity) }}
      </div>

      <!-- Info: Free Company -->
      <div v-if="this.$store.getters.character.FreeCompanyName" class="info-block">
        <b>{{ $t("profile.freeCompany") }}</b>
        <br />
        {{ this.$store.getters.character.FreeCompanyName }}
      </div>

      <!-- Info: City-state -->
      <div class="info-block">
        <b>{{ $t("profile.cityState") }}</b>
        <br />
        <img :src="this.cityStateImageURI" />
        {{ this.localeName(this.$store.getters.character.Town) }}
      </div>

      <!-- Info: Grand Company -->
      <div v-if="this.$store.getters.character.GrandCompanyInfo?.GrandCompany" class="info-block">
        <b>{{ $t("profile.grandCompany") }}</b>
        <br />
        <img :src="this.grandCompanyImageURI" />
        {{ this.localeName(this.$store.getters.character.GrandCompanyInfo.GrandCompany) }}
      </div>

      <!-- Info: Playing since -->
      <div v-if="this.$store.getters.achievementsPublic" class="info-block">
        <b>{{ $t("profile.playingSince") }}</b>
        <br />
        {{ this.playingSince }}
      </div>

      <!-- Info: Exploratory missions -->
      <div class="info-block">
        <b>{{ $t("profile.exploratoryMissions") }}</b>
        <br />

        <!-- Eureka -->
        {{ $t("profile.elementalLevel") }}:
        <span :class="{ 'fw-bolder': this.isMaxLevelEureka }">
          {{ this.levelEureka }}
        </span>
        <br />

        <!-- Bozja -->
        {{ $t("profile.resistanceRank") }}:
        <span :class="{ 'fw-bolder': this.isMaxLevelBozja }">
          {{ this.levelBozja }}
        </span>
      </div>
    </div>

    <!-- Job levels -->
    <div class="col-md-6 col-lg">
      <h2>{{ $t("profile.jobLevels") }}</h2>

      <!-- Tanks -->
      <div class="info-block row">
        <b>{{ $t("profile.tanks") }}</b>
        <br />
        <div class="pt-1">
          <JobLevel initial="gla" :title="$t('profile.job.gla')" type="tank" />
          <JobLevel initial="pld" :title="$t('profile.job.pld')" type="tank" />
          <JobLevel initial="mrd" :title="$t('profile.job.mrd')" type="tank" />
          <JobLevel initial="war" :title="$t('profile.job.war')" type="tank" />
          <JobLevel initial="drk" :title="$t('profile.job.drk')" type="tank" />
          <JobLevel initial="gnb" :title="$t('profile.job.gnb')" type="tank" />
        </div>
      </div>

      <!-- Healers -->
      <div class="info-block row">
        <b>{{ $t("profile.healers") }}</b>
        <br />
        <div class="pt-1">
          <JobLevel initial="cnj" :title="$t('profile.job.cnj')" type="healer" />
          <JobLevel initial="whm" :title="$t('profile.job.whm')" type="healer" />
          <JobLevel initial="sch" :title="$t('profile.job.sch')" type="healer" />
          <JobLevel initial="ast" :title="$t('profile.job.ast')" type="healer" />
          <JobLevel initial="sge" :title="$t('profile.job.sge')" type="healer" />
        </div>
      </div>

      <!-- DPS -->
      <div class="info-block row">
        <b>{{ $t("profile.dps") }}</b>
        <br />
        <div class="pt-1">
          <div style="display: inline-block">
            <JobLevel initial="pgl" :title="$t('profile.job.pgl')" type="dps" />
            <JobLevel initial="mnk" :title="$t('profile.job.mnk')" type="dps" />
            <JobLevel initial="lnc" :title="$t('profile.job.lnc')" type="dps" />
            <JobLevel initial="drg" :title="$t('profile.job.drg')" type="dps" />
            <JobLevel initial="rog" :title="$t('profile.job.rog')" type="dps" />
            <JobLevel initial="nin" :title="$t('profile.job.nin')" type="dps" />
            <JobLevel initial="sam" :title="$t('profile.job.sam')" type="dps" />
            <JobLevel initial="rpr" :title="$t('profile.job.rpr')" type="dps" />
            <JobLevel initial="vpr" :title="$t('profile.job.vpr')" type="dps" />
            <JobLevel initial="arc" :title="$t('profile.job.arc')" type="dps" />
            <JobLevel initial="brd" :title="$t('profile.job.brd')" type="dps" />
          </div>
          <div style="display: inline-block">
            <JobLevel initial="mch" :title="$t('profile.job.mch')" type="dps" />
            <JobLevel initial="dnc" :title="$t('profile.job.dnc')" type="dps" />
            <JobLevel initial="thm" :title="$t('profile.job.thm')" type="dps" />
            <JobLevel initial="blm" :title="$t('profile.job.blm')" type="dps" />
            <JobLevel initial="acn" :title="$t('profile.job.acn')" type="dps" />
            <JobLevel initial="smn" :title="$t('profile.job.smn')" type="dps" />
            <JobLevel initial="rdm" :title="$t('profile.job.rdm')" type="dps" />
            <JobLevel initial="pct" :title="$t('profile.job.pct')" type="dps" />
            <JobLevel initial="blu" :title="$t('profile.job.blu')" type="dps" />
          </div>
        </div>
      </div>

      <!-- Crafters -->
      <div class="info-block row">
        <b>{{ $t("profile.crafters") }}</b>
        <br />
        <div class="pt-1">
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

      <!-- Gatherers -->
      <div class="info-block row">
        <b>{{ $t("profile.gatherers") }}</b>
        <br />
        <div class="pt-1">
          <JobLevel initial="min" :title="$t('profile.job.min')" type="gatherer" />
          <JobLevel initial="btn" :title="$t('profile.job.btn')" type="gatherer" />
          <JobLevel initial="fsh" :title="$t('profile.job.fsh')" type="gatherer" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.info-block {
  line-height: 1.3;
  margin-bottom: 15px;

  b {
    color: var(--bs-primary-color);
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
  background-color: var(--bs-body-color);
}
</style>

<script>
import PageHeader from "@/components/PageHeader.vue";
import JobLevel from "@/components/JobLevel.vue";

export default {
  name: "ProfileView",
  data() {
    return {
      maxLevelEureka: 60,
      maxLevelBozja: 25,
    };
  },
  components: {
    PageHeader,
    JobLevel,
  },
  computed: {
    hasBio() {
      return this.$store.getters.character.Bio != "-";
    },
    isMasculine() {
      return this.$store.getters.character.Gender == 1;
    },
    gender() {
      return this.isMasculine ? "Masculine" : "Feminine";
    },
    race() {
      return this.genderedLocaleName(this.$store.getters.character.Race, this.gender);
    },
    clan() {
      return this.genderedLocaleName(this.$store.getters.character.Tribe, this.gender);
    },
    guardianImageURI() {
      return "/icons/guardian-" + this.$store.getters.character.GuardianDeity.ID + ".png";
    },
    cityStateImageURI() {
      return "/icons/town-" + this.$store.getters.character.Town.ID + ".png";
    },
    grandCompanyImageURI() {
      const grandCompanyID = this.$store.getters.character.GrandCompanyInfo.GrandCompany.ID;
      const grandCompanyRankID = this.$store.getters.character.GrandCompanyInfo.RankID;
      return "/icons/gc-" + grandCompanyID + "-" + grandCompanyRankID + ".png";
    },
    playingSince() {
      const date = new Date(this.$store.getters.lodestoneData.PlayingSince);
      const locale = this.$i18n.locale;
      return date.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
    },
    levelEureka() {
      return this.$store.getters.character.ClassJobElemental?.Level || 0;
    },
    levelBozja() {
      return this.$store.getters.character.ClassJobBozjan?.Level || 0;
    },
    isMaxLevelEureka() {
      return this.levelEureka == this.maxLevelEureka;
    },
    isMaxLevelBozja() {
      return this.levelBozja == this.maxLevelBozja;
    },
  },
  methods: {
    localeName(payload) {
      const locale = this.$i18n.locale;
      return payload["Name" + locale.toUpperCase()];
    },
    genderedLocaleName(payload, gender) {
      const locale = this.$i18n.locale;
      return payload["Name" + gender + locale.toUpperCase()];
    },
  },
};
</script>
