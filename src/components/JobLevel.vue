<template>
  <div class="job-level fw-lighter user-select-none tt">
    <span class="tt-text">{{ title }}</span>
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
  color: #9dd1ff;
}

.job-type-healer {
  color: #a6ff93;
}

.job-type-dps {
  color: #ff8f8f;
}

.job-type-gatherer {
  color: #ffd99d;
}

.job-type-crafter {
  color: #bdaaff;
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
