<template>
  <div class="container">
    <h1>Duties</h1>
    <Alert
      v-if="!this.$store.getters.characterData"
      msg="Character data could not be found. You can load a character from the <a href='/settings' class='alert-link'>Settings</router-link>."
    />
    <Alert
      v-else-if="!this.$store.getters.achievementsPublic"
      msg="The achievements for this character are not public. You can set Achievements to Public in your <a class='alert-link' href='https://na.finalfantasyxiv.com/lodestone/my/setting/account/' target='_blank' rel='noopener noreferrer'>character settings</a>."
    />
    <hr />
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";

export default {
  name: "Duties",
  components: {
    Alert,
  },
};
</script>
