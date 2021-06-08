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
        'bi-slash-square': duty.cleared == -1,
        'bi-check-square': duty.cleared == 1,
        'bi-square': duty.cleared == 0,
      }"
    >
      &nbsp;
      <span
        :class="{
          'blur-maybe': duty.blur && duty.cleared == -1,
          'blur-cleared': duty.blur && duty.cleared == 1,
          'blur-uncleared': duty.blur && duty.cleared == 0,
          'user-select-none': duty.blur,
          bold: duty.Bold,
        }"
        >{{ duty.Name }}</span
      >
    </span>
  </li>
</template>

<style lang="scss">
.bold {
  font-weight: 700;
}

.blur-maybe {
  color: transparent;
  text-shadow: 0 0 20px rgb(148, 148, 148);
}

.blur-cleared {
  color: transparent;
  text-shadow: 0 0 20px rgb(50, 194, 132);
}

.blur-uncleared {
  color: transparent;
  text-shadow: 0 0 20px rgb(204, 58, 75);
}
</style>

<script>
export default {
  props: {
    duty: Object,
  },
};
</script>
