<template>
  <div class="container">
    <h1>Profile</h1>
    <Alert
      v-if="!this.$store.getters.character"
      msg="Character data could not be found. You can load a character from the <a href='/settings' class='alert-link'>Settings</router-link>."
    />
    <hr />
    <div class="row">
      <div v-if="this.$store.getters.character" class="col-lg d-none d-lg-block">
        <img
          id="character-portrait"
          :src="this.$store.getters.character.Portrait"
          alt="Portrait of your character"
        />
        <br />
        <span v-if="this.$store.getters.character.Bio != '-'" class="fst-italic text-break">
          “{{ this.$store.getters.character.Bio }}”
        </span>
        <br />
      </div>

      <div class="col-lg">
        <div v-if="this.$store.getters.character">
          <h2>{{ this.$store.getters.character.Name }}</h2>
          <div class="info-block">
            <b>World</b><br />
            <i class="bi bi-arrow-return-right"></i>
            {{ this.$store.getters.character.Server }} ({{ this.$store.getters.character.DC }})
          </div>

          <div class="info-block">
            <b>Free Company</b><br />
            <i class="bi bi-arrow-return-right"></i>
            {{ this.$store.getters.character.FreeCompanyName }}
          </div>

          <div class="info-block">
            <b>Race / Clan</b><br />
            <i class="bi bi-arrow-return-right"></i>
            {{ races[this.$store.getters.character.Race - 1] }} /
            {{ tribes[this.$store.getters.character.Tribe - 1] }}
            <i v-if="this.$store.getters.character.Gender == 1" class="bi bi-gender-male"></i>
            <i v-else class="bi bi-gender-female"></i>
          </div>

          <div class="info-block">
            <b>Nameday</b><br />
            <i class="bi bi-arrow-return-right"></i>
            {{ this.$store.getters.character.Nameday }}
          </div>

          <div class="info-block">
            <b>Guardian</b><br />
            <i class="bi bi-arrow-return-right"></i>
            {{ guardians[this.$store.getters.character.GuardianDeity - 1] }}
          </div>

          <div class="info-block">
            <b>City-state</b><br />
            <i class="bi bi-arrow-return-right"></i>
            {{ cities[this.$store.getters.character.Town - 1] }}
          </div>

          <template v-if="this.$store.getters.character.GrandCompany">
            <div class="info-block">
              <b>Grand Company</b><br />
              <i class="bi bi-arrow-return-right"></i>
              {{ gcNames[this.$store.getters.character.GrandCompany.NameID - 1] }} /
              {{
                gcRanks[this.$store.getters.character.GrandCompany.NameID - 1][
                  this.$store.getters.character.GrandCompany.RankID - 1
                ]
              }}
            </div>
          </template>
          <template v-if="this.$store.getters.characterData.PlayingSince">
            <div class="info-block">
              <b>Playing since</b><br />
              <i class="bi bi-arrow-return-right"></i>
              {{ new Date(this.$store.getters.characterData.PlayingSince * 1000).toDateString() }}
            </div>
          </template>
          <template v-if="this.$store.getters.achievementsPublic">
            <div class="info-block">
              <b>Achievements</b><br />
              <i class="bi bi-arrow-return-right"></i>
              {{ this.$store.getters.achievements.length }}
            </div>
          </template>
        </div>
        <div v-else>
          <h2>Character Information</h2>
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              No data to display.
            </li>
          </ul>
        </div>
        <br />
      </div>
      <div class="col-lg">
        <!-- <h2>Jobs</h2>
        WAR (1)<br /><br />
        <b>Elemental level:</b>
        {{ this.$store.getters.character.ClassJobsElemental?.Level || "0" }}<br />
        <b>Resistance rank:</b>
        {{ this.$store.getters.character.ClassJobsBozjan?.Level || "0" }} -->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.info-block {
  line-height: 1.2;
  margin-bottom: 10px;
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
import Alert from "@/components/Alert.vue";

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
    Alert,
  },
};
</script>
