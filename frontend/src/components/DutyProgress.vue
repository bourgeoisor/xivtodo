<template>
  <div class="mb-4">
    <div class="mb-2">
      <img
        v-if="type"
        class="duty-progress-icon"
        :src="'/icons/duty-' + this.type + '.png'"
        :alt="'Duty icon for type ' + this.title"
      />
      <b>{{ this.title }}</b>
      <div v-if="this.progress === 100" class="float-end fw-bold">{{ this.total }}</div>
      <div v-else class="float-end">{{ this.cleared }} / {{ this.total }}</div>
    </div>
    <div class="progress" role="progressbar" style="height: 3px">
      <div class="progress-bar" :style="{ width: this.progress + '%' }"></div>
    </div>
  </div>
</template>

<style lang="scss">
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
