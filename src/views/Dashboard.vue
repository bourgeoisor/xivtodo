<template>
  <div class="container">
    <h1>
      Dashboard
      <small v-if="this.$store.getters.characterData" class="text-muted">
        - {{ this.$store.getters.character.Name }}
      </small>
    </h1>
    <Alert
      v-if="!this.$store.getters.characterData"
      msg="Character data could not be found. You can load a character from the <a href='/settings' class='alert-link'>Settings</router-link>."
    />
    <hr />
    <div class="row">
      <div v-if="this.$store.getters.characterData" class="col-md d-none d-md-block">
        <img
          id="character-portrait"
          class="shadow-sm p-2 mb-2 bg-body rounded"
          :src="this.$store.getters.character.Portrait"
        />
        <br />
        <span v-if="this.$store.getters.character.Bio != '-'">
          <b>Bio:</b> {{ this.$store.getters.character.Bio }}
        </span>
        <span v-else class="text-muted fst-italic">This character doesn't have a bio.</span>
        <br />
      </div>

      <div class="col-md">
        <h2>Character Information</h2>

        <div v-if="this.$store.getters.characterData">
          <b>World:</b>
          {{ this.$store.getters.character.DC }}/{{ this.$store.getters.character.Server }}<br />
          <b>Free Company:</b>
          {{ this.$store.getters.character.FreeCompanyName }}<br /><br />
          <b>Achievements:</b>
          <span v-if="this.$store.getters.achievementsPublic">
            {{ this.$store.getters.achievements.List?.length }}
          </span>
          <span v-else class="text-muted"> Unknown</span>
          <br /><br />
          <b>Elemental level:</b>
          {{ this.$store.getters.character.ClassJobsElemental?.Level || "0" }}<br />
          <b>Resistance rank:</b>
          {{ this.$store.getters.character.ClassJobsBozjan?.Level || "0" }}
        </div>
        <div v-else>
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              No data to display.
            </li>
          </ul>
        </div>
        <br />
      </div>
      <div class="col-md"></div>
    </div>
  </div>
</template>

<style lang="scss">
#character-portrait {
  width: 100%;
}
</style>

<script>
import Alert from "@/components/Alert.vue";

export default {
  name: "Dashboard",
  components: {
    Alert,
  },
};
</script>
