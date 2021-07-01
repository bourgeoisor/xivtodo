<template>
  <li
    class="list-group-item d-flex justify-content-between align-items-center"
    :class="{
      'text-secondary': duty.cleared == -1,
      'text-success': duty.cleared == 1,
      'text-danger': duty.cleared == 0,
    }"
  >
    <span
      :class="{
        'bi-question-circle': duty.cleared == -1,
        'bi-check-circle': duty.cleared == 1,
        'bi-circle': duty.cleared == 0,
      }"
    >
      &nbsp;
      <a
        v-if="duty.LodestoneID && !duty.blur"
        class="text-reset lodestone-tooltip eorzeadb_link"
        :href="'https://na.finalfantasyxiv.com/lodestone/playguide/db/duty/' + duty.LodestoneID"
        target="_blank"
        rel="noopener noreferrer"
        :class="{
          'blur-maybe': duty.blur && duty.cleared == -1,
          'blur-cleared': duty.blur && duty.cleared == 1,
          'blur-uncleared': duty.blur && duty.cleared == 0,
          'user-select-none': duty.blur,
        }"
      >
        {{ duty.Name }}
      </a>
      <span
        v-else
        :class="{
          'blur-maybe': duty.blur && duty.cleared == -1,
          'blur-cleared': duty.blur && duty.cleared == 1,
          'blur-uncleared': duty.blur && duty.cleared == 0,
          'user-select-none': duty.blur,
          'text-bold': duty.Bold,
        }"
      >
        {{ duty.Name }}
      </span>
    </span>
    <span
      v-if="duty.IsMSQ"
      class="icon-marker-msq"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="MSQ content"
    ></span>
  </li>
</template>

<style lang="scss">
.blur-maybe {
  color: transparent;
  text-shadow: 0 0 20px rgb(148, 148, 148);
}

.blur-cleared {
  color: transparent;
  text-shadow: 0 0 20px #53b462;
}

.blur-uncleared {
  color: transparent;
  text-shadow: 0 0 20px #b45353;
}
</style>

<script>
export default {
  props: {
    duty: Object,
  },
};
</script>
