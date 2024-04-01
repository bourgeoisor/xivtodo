<template>
  <div
    v-if="this.$store.getters.lodestoneData.Jobs[this.initial]"
    class="job-level text-center fw-lighter user-select-none tt"
  >
    <!-- Tooltip -->
    <span class="tt-text">{{ title }}</span>

    <!-- Icon -->
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

    <!-- Level -->
    <span v-if="!this.jobUnlocked" class="text-secondary">-</span>
    <span v-else :class="{'fw-bold': this.isMaxLevel}">
      {{ this.currentLevel }}
    </span>

    <!-- Progress -->
    <div v-if="this.jobUnlocked && !this.isMaxLevel" class="job-level-progress">
      <div
        class="job-level-progress-bar"
        :style="'width: ' + this.levelProgressPercentage + '%'"
      ></div>
    </div>

  </div>
</template>

<style lang="scss">
.job-level {
  float: left;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 22px;
}

.job-level-progress {
  height: 1px;
  border-bottom: 1px solid #5c5c5c;
}

.job-level-progress-bar {
  height: 1px;
  width: 100%;
  border-bottom: 1px solid #dddddd;
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
      maxLevel: 90,
      maxLevelBlue: 80,
      iconClass: "icon-job-" + this.initial,
    };
  },
  props: {
    initial: String,
    title: String,
    type: String,
  },
  computed: {
    currentLevel() {
      return this.$store.getters.lodestoneData.Jobs[this.initial].Level;
    },
    jobUnlocked() {
      return this.currentLevel != 0;
    },
    isMaxLevel() {
      if (this.initial == "blu") {
        return this.currentLevel == this.maxLevelBlue;
      } else {
        return this.currentLevel == this.maxLevel;
      }
    },
    levelProgressPercentage() {
      const level = this.currentLevel;
      const maxLevel = this.initial == "blu" ? this.maxLevelBlue : this.maxLevel;

      // Using a logarithmic scale to make the progress bar look more natural
      return (Math.pow(1.03, level + 1) / Math.pow(1.03, maxLevel + 1)) * 100;
    },
  }
};
</script>
