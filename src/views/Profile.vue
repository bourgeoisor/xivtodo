<template>
  <div class="container">
    <h1>
      {{ $t("page.profile") }}
      <span v-if="this.$store.getters.hasCharacter" class="fs-3 fw-lighter">
        of {{ this.$store.getters.character.Name }}
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
        <h2>Character Information</h2>
        <div class="info-block">
          <b>World</b><br />
          <i class="bi bi-arrow-return-right text-muted"></i>
          {{ this.$store.getters.character.Server }} ({{ this.$store.getters.character.DC }})
        </div>

        <div class="info-block">
          <b>Race / Clan</b><br />
          <i class="bi bi-arrow-return-right text-muted"></i>
          {{ this.$store.getters.character.Race?.Name }} /
          {{ this.$store.getters.character.Tribe?.Name }}
          <i v-if="this.$store.getters.character.Gender == 1" class="bi bi-gender-male"></i>
          <i v-else class="bi bi-gender-female"></i>
        </div>

        <div class="info-block">
          <b>Nameday</b><br />
          <i class="bi bi-arrow-return-right text-muted"></i>
          {{ this.$store.getters.character.Nameday }}
        </div>

        <div class="info-block">
          <b>Guardian</b><br />
          <i class="bi bi-arrow-return-right text-muted"></i>
          {{ this.$store.getters.character.GuardianDeity?.Name }}
        </div>

        <br />

        <div v-if="this.$store.getters.character.FreeCompanyName" class="info-block">
          <b>Free Company</b><br />
          <i class="bi bi-arrow-return-right text-muted"></i>
          {{ this.$store.getters.character.FreeCompanyName }}
        </div>

        <div class="info-block">
          <b>City-state</b><br />
          <i class="bi bi-arrow-return-right text-muted"></i>
          <img :src="'/icons/town-' + this.$store.getters.character.Town?.ID + '.png'" />
          {{ this.$store.getters.character.Town?.Name }}
        </div>

        <template v-if="this.$store.getters.character.GrandCompany">
          <div class="info-block">
            <b>Grand Company</b><br />
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
            <b>Playing since</b><br />
            <i class="bi bi-arrow-return-right text-muted"></i>
            {{ new Date(this.$store.getters.characterData.PlayingSince * 1000).toDateString() }}
          </div>
          <div class="info-block">
            <b>Achievements</b><br />
            <i class="bi bi-arrow-return-right text-muted"></i>
            {{ this.$store.getters.achievements.length }}
          </div>
        </template>
        <br />
      </div>
      <div class="col-lg">
        <h2>Job Levels</h2>
        <div class="info-block row">
          <b>Tanks</b><br />
          <div class="text-center pt-1">
            <JobLevel initial="pld" title="Paladin" type="tank" />
            <JobLevel initial="war" title="Warrior" type="tank" />
            <JobLevel initial="drk" title="Dark Knight" type="tank" />
            <JobLevel initial="gnb" title="Gunbreaker" type="tank" />
          </div>
        </div>
        <div class="info-block row">
          <b>Healers</b><br />
          <div class="text-center pt-1">
            <JobLevel initial="whm" title="White Mage" type="healer" />
            <JobLevel initial="sch" title="Scholar" type="healer" />
            <JobLevel initial="ast" title="Astrologian" type="healer" />
          </div>
        </div>
        <div class="info-block row">
          <b>DPS</b><br />
          <div class="text-center pt-1">
            <JobLevel initial="mnk" title="Monk" type="dps" />
            <JobLevel initial="drg" title="Dragoon" type="dps" />
            <JobLevel initial="nin" title="Ninja" type="dps" />
            <JobLevel initial="sam" title="Samurai" type="dps" />
            <JobLevel initial="brd" title="Bard" type="dps" />
            <JobLevel initial="mch" title="Machinist" type="dps" />
            <JobLevel initial="dnc" title="Dancer" type="dps" />
            <JobLevel initial="blm" title="Black Mage" type="dps" />
            <JobLevel initial="smn" title="Summoner" type="dps" />
            <JobLevel initial="rdm" title="Red Mage" type="dps" />
            <JobLevel initial="blu" title="Blue Mage" type="dps" />
          </div>
        </div>
        <div class="info-block row">
          <b>Crafters</b><br />
          <div class="text-center pt-1">
            <JobLevel initial="crp" title="Carpenter" type="crafter" />
            <JobLevel initial="bsm" title="Blacksmith" type="crafter" />
            <JobLevel initial="arm" title="Armorer" type="crafter" />
            <JobLevel initial="gsm" title="Goldsmith" type="crafter" />
            <JobLevel initial="ltw" title="Leatherworker" type="crafter" />
            <JobLevel initial="wvr" title="Weaver" type="crafter" />
            <JobLevel initial="alc" title="Alchemist" type="crafter" />
            <JobLevel initial="cul" title="Culinarian" type="crafter" />
          </div>
        </div>
        <div class="info-block row">
          <b>Gatherers</b><br />
          <div class="text-center pt-1">
            <JobLevel initial="min" title="Miner" type="gatherer" />
            <JobLevel initial="btn" title="Botanist" type="gatherer" />
            <JobLevel initial="fsh" title="Fisher" type="gatherer" />
          </div>
        </div>
        <br />
        <div class="info-block">
          <b>Elemental level</b><br />
          <span
            :class="{
              'fw-bold': this.$store.getters.character.ClassJobsElemental?.Level == 60,
            }"
          >
            <i class="bi bi-arrow-return-right text-muted"></i>
            {{ this.$store.getters.character.ClassJobsElemental?.Level || "0" }}
          </span>
        </div>
        <div class="info-block">
          <b>Resistance rank</b><br />
          <span
            :class="{
              'fw-bold': this.$store.getters.character.ClassJobsBozjan?.Level == 25,
            }"
          >
            <i class="bi bi-arrow-return-right text-muted"></i>
            {{ this.$store.getters.character.ClassJobsBozjan?.Level || "0" }}
          </span>
        </div>
        <br />
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
