<template>
  <div class="container">
    <h1>Dashboard</h1>
    <Alert
      v-if="!this.$store.getters.characterData"
      msg="Character data could not be found. You can load a character from the <a href='/settings' class='alert-link'>Settings</router-link>."
    />
    <hr />
    <div class="row">
      <div v-if="this.$store.getters.characterData" class="col-lg d-none d-lg-block">
        <img id="character-portrait" :src="this.$store.getters.character.Portrait" />
        <br />
        <span v-if="this.$store.getters.character.Bio != '-'" class="fst-italic text-break">
          “{{ this.$store.getters.character.Bio }}”
        </span>
        <br />
      </div>

      <div class="col-lg">
        <div v-if="this.$store.getters.characterData">
          <h2>{{ this.$store.getters.character.Name }}</h2>
          <b>World:</b>
          &nbsp;
          {{ this.$store.getters.character.Server }} ({{ this.$store.getters.character.DC }})<br />
          <b>Free Company:</b>
          &nbsp;
          {{ this.$store.getters.character.FreeCompanyName }}<br /><br />
          <b>Race/Clan:</b>
          &nbsp;
          {{ races[this.$store.getters.character.Race - 1] }} /
          {{ tribes[this.$store.getters.character.Tribe - 1] }}
          {{ genders[this.$store.getters.character.Gender - 1] }}<br />
          <b>Nameday:</b>
          &nbsp;
          {{ this.$store.getters.character.Nameday }}<br />
          <b>Guardian:</b>
          &nbsp;
          {{ guardians[this.$store.getters.character.GuardianDeity - 1] }}<br /><br />
          <b>City-state:</b>
          &nbsp;
          {{ cities[this.$store.getters.character.Town - 1] }}<br />
          <template v-if="this.$store.getters.character.GrandCompany">
            <b>Grand Company:</b>
            &nbsp;
            {{ gcNames[this.$store.getters.character.GrandCompany.NameID - 1] }}<br />
            <b>Rank:</b>
            &nbsp;
            {{
              gcRanks[this.$store.getters.character.GrandCompany.NameID - 1][
                this.$store.getters.character.GrandCompany.RankID - 1
              ]
            }}<br /><br />
          </template>
          <template v-if="this.$store.getters.achievementsPublic">
            <b>Achievements:</b>
            &nbsp;
            {{ this.$store.getters.achievements.List?.length }}
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
  name: "Dashboard",
  data() {
    return {
      genders: ["♂", "♀"],
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
