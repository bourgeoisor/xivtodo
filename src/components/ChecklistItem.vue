<template>
  <label v-if="!hidden" class="list-group-item user-select-none">
    <input v-model="checked" class="form-check-input" type="checkbox" :id="title" />
    &nbsp;
    <span :class="{ 'text-primary': checked, 'text-decoration-line-through': checked }">
      {{ title }}
    </span>
  </label>
</template>

<script>
export default {
  data() {
    return {
      checked: this.$store.state.todosChecked.indexOf(this.id) >= 0,
      hidden: this.$store.state.todosHidden.indexOf(this.id) >= 0,
    };
  },
  props: {
    id: Number,
    title: String,
  },
  watch: {
    checked() {
      this.$store.commit("todoChecked", { id: this.id, checked: this.checked });
    },
  },
};
</script>
