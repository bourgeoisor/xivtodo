<template>
  <div class="container">
    <h1>
      Profile
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
          {{ races[this.$store.getters.character.Race - 1] }} /
          {{ tribes[this.$store.getters.character.Tribe - 1] }}
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
          {{ guardians[this.$store.getters.character.GuardianDeity - 1] }}
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
          {{ cities[this.$store.getters.character.Town - 1] }}
        </div>

        <template v-if="this.$store.getters.character.GrandCompany">
          <div class="info-block">
            <b>Grand Company</b><br />
            <i class="bi bi-arrow-return-right text-muted"></i>
            {{ gcNames[this.$store.getters.character.GrandCompany.NameID - 1] }} /
            {{
              gcRanks[this.$store.getters.character.GrandCompany.NameID - 1][
                this.$store.getters.character.GrandCompany.RankID - 1
              ]
            }}
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
            <JobLevel initial="pld" type="tank" />
            <JobLevel initial="war" type="tank" />
            <JobLevel initial="drk" type="tank" />
            <JobLevel initial="gnb" type="tank" />
          </div>
        </div>
        <div class="info-block row">
          <b>Healers</b><br />
          <div class="text-center pt-1">
            <JobLevel initial="whm" type="healer" />
            <JobLevel initial="sch" type="healer" />
            <JobLevel initial="ast" type="healer" />
          </div>
        </div>
        <div class="info-block row">
          <b>DPS</b><br />
          <div class="text-center pt-1">
            <JobLevel initial="mnk" type="dps" />
            <JobLevel initial="drg" type="dps" />
            <JobLevel initial="nin" type="dps" />
            <JobLevel initial="sam" type="dps" />
            <JobLevel initial="brd" type="dps" />
            <JobLevel initial="mch" type="dps" />
            <JobLevel initial="dnc" type="dps" />
            <JobLevel initial="blm" type="dps" />
            <JobLevel initial="smn" type="dps" />
            <JobLevel initial="rdm" type="dps" />
            <JobLevel initial="blu" type="dps" />
          </div>
        </div>
        <div class="info-block row">
          <b>Crafters</b><br />
          <div class="text-center pt-1">
            <JobLevel initial="crp" type="crafter" />
            <JobLevel initial="bsm" type="crafter" />
            <JobLevel initial="arm" type="crafter" />
            <JobLevel initial="gsm" type="crafter" />
            <JobLevel initial="ltw" type="crafter" />
            <JobLevel initial="wvr" type="crafter" />
            <JobLevel initial="alc" type="crafter" />
            <JobLevel initial="cul" type="crafter" />
          </div>
        </div>
        <div class="info-block row">
          <b>Gatherers</b><br />
          <div class="text-center pt-1">
            <JobLevel initial="min" type="gatherer" />
            <JobLevel initial="btn" type="gatherer" />
            <JobLevel initial="fsh" type="gatherer" />
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
  data() {
    return {
      races: ["Hyur", "Elezen", "Lalafell", "Miqo'te", "Roegadyn", "Au Ra", "Hrothgar", "Viera"],
      tribes: [
        "Midlander",
        "Highlander",
        "Wildwood",
        "Duskwight",
        "Plainsfolk",
        "Dunesfolk",
        "Seeker of the Sun",
        "Keeper of the Moon",
        "Sea Wolf",
        "Hellsguard",
        "Raen",
        "Xaela",
        "Helions",
        "The Lost",
        "Rava",
        "Veena",
      ],
      cities: ["Limsa Lominsa", "Gridania", "Ul'dah"],
      guardians: [
        "Halone, the Fury",
        "Menphina, the Lover",
        "Thaliak, the Scholar",
        "Nymeia, the Spinner",
        "Llymlaen, the Navigator",
        "Oschon, the Wanderer",
        "Byregot, the Builder",
        "Rhalgr, the Destroyer",
        "Azeyma, the Warden",
        "Nald'thal, the Traders",
        "Nophica, the Matron",
        "Althyk, the Keeper",
      ],
      gcNames: ["Maelstrom", "Order of the Twin Adder", "Immortal Flames"],
      gcRanks: [
        [
          "Storm Private Third Class",
          "Storm Private Second Class",
          "Storm Private First Class",
          "Storm Corporal",
          "Storm Sergeant Third Class",
          "Storm Sergeant Second Class",
          "Storm Sergeant First Class",
          "Chief Storm Sergeant",
          "Second Storm Lieutenant",
          "First Storm Lieutenant",
          "Storm Captain",
        ],
        [
          "Serpent Private Third Class",
          "Serpent Private Second Class",
          "Serpent Private First Class",
          "Serpent Corporal",
          "Serpent Sergeant Third Class",
          "Serpent Sergeant Second Class",
          "Serpent Sergeant First Class",
          "Chief Serpent Sergeant",
          "Second Serpent Lieutenant",
          "First Serpent Lieutenant",
          "Serpent Captain",
        ],
        [
          "Flame Private Third Class",
          "Flame Private Second Class",
          "Flame Private First Class",
          "Flame Corporal",
          "Flame Sergeant Third Class",
          "Flame Sergeant Second Class",
          "Flame Sergeant First Class",
          "Chief Flame Sergeant",
          "Second Flame Lieutenant",
          "First Flame Lieutenant",
          "Flame Captain",
        ],
      ],
    };
  },
  components: {
    JobLevel,
  },
};
</script>
