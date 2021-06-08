<template>
  <li
    class="list-group-item d-flex justify-content-between align-items-center"
    :class="{
      'text-secondary': duty.clearedMaybe,
      'text-success': duty.clearedYes,
      'text-danger': duty.clearedNo,
    }"
  >
    <span
      :class="{
        'bi-slash-square': duty.clearedMaybe,
        'bi-check-square': duty.clearedYes,
        'bi-square': duty.clearedNo,
      }"
    >
      &nbsp;
      <span
        :class="{
          'blur-maybe': duty.blur && duty.clearedMaybe,
          'blur-cleared': duty.blur && duty.clearedYes,
          'blur-uncleared': duty.blur && duty.clearedNo,
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
