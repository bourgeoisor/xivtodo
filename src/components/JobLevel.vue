<template>
  <div class="job-level fw-lighter" :title="title">
    <span
      :class="{
        'job-type-tank': type == 'tank',
        'job-type-healer': type == 'healer',
        'job-type-dps': type == 'dps',
        'job-type-gatherer': type == 'gatherer',
        'job-type-crafter': type == 'crafter',
      }"
      ><i :class="iconClass"></i>
    </span>
    <br />
    <span
      v-if="!this.$store.getters.characterData.Jobs[this.initial.toUpperCase()]?.Level"
      class="text-secondary"
    >
      -
    </span>
    <span
      v-else-if="this.$store.getters.characterData.Jobs[this.initial.toUpperCase()].Level == 80"
      class="fw-bold"
    >
      {{ this.$store.getters.characterData.Jobs[this.initial.toUpperCase()].Level }}
    </span>
    <span
      v-else-if="
        this.$store.getters.characterData.Jobs[this.initial.toUpperCase()].Level == 70 &&
        this.initial == 'blu'
      "
      class="fw-bold"
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

.job-type-tank {
  color: #81b8ff;
}

.job-type-healer {
  color: #a7ff7f;
}

.job-type-dps {
  color: #ffa37f;
}

.job-type-gatherer {
  color: #ffdf7e;
}

.job-type-crafter {
  color: #cb7eff;
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
    title: String,
    type: String,
  },
};
</script>
