<template>
  <div class="job-level fw-lighter">
    <i :class="iconClass"></i><br />
    <span
      v-if="!this.$store.getters.characterData.Jobs[this.initial.toUpperCase()]?.Level"
      class="text-secondary"
    >
      -
    </span>
    <span
      v-else-if="this.$store.getters.characterData.Jobs[this.initial.toUpperCase()].Level == 80"
      class="text-success"
    >
      {{ this.$store.getters.characterData.Jobs[this.initial.toUpperCase()].Level }}
    </span>
    <span
      v-else-if="
        this.$store.getters.characterData.Jobs[this.initial.toUpperCase()].Level == 70 &&
        this.initial == 'blu'
      "
      class="text-success"
    >
      {{ this.$store.getters.characterData.Jobs[this.initial.toUpperCase()].Level }}
    </span>
    <span v-else>
      {{ this.$store.getters.characterData.Jobs[this.initial.toUpperCase()].Level }}
    </span>
  </div>
</template>

<style lang="scss">
.job-level {
  float: left;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 22px;
}
</style>

<script>
export default {
  data() {
    return {
      iconClass: "icon-job-" + this.initial,
    };
  },
  props: {
    initial: String,
  },
};
</script>
