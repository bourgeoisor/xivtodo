<template>
  <div class="duty-progress">
    <div class="duty-progress-title">
      <img
        v-if="type"
        class="duty-progress-icon"
        :src="'/icons/duty-' + this.type + '.png'"
        :alt="'Duty icon for type ' + this.title"
      /><b>{{ this.title }}</b>
    </div>
    <div
      class="progress"
      role="progressbar"
      aria-label="Success example"
      aria-valuenow="25"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div class="progress-bar" :style="{ width: this.progress + '%' }">{{ this.cleared }} / {{ this.total }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.duty-progress {
  margin-bottom: 10px;
}

.duty-progress-title {
  margin-bottom: 3px;
}

.duty-progress-icon {
  height: 1em;
  margin-right: 5px;
  margin-bottom: 2px;
}
</style>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: String,
    duties: Array,
    type: String,
  },
  computed: {
    cleared() {
      const encounterIDs = this.$store.getters.encounterIDs;
      const verifiedEncounters = this.$store.getters.encountersVerified;
      return this.duties.filter((duty) => verifiedEncounters[duty.UUID] === 1 || encounterIDs.has(~~duty.UUID)).length;
    },
    total() {
      return this.duties.length;
    },
    progress() {
      return Math.floor((this.cleared / this.total) * 100);
    },
  },
};
</script>
