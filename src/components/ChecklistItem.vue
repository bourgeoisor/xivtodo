<template>
  <span
    v-if="!hidden || showHidden"
    class="list-group-item d-flex justify-content-between align-items-center"
  >
    <label class="user-select-none">
      <input v-model="checked" class="form-check-input" type="checkbox" :id="title" />
      &nbsp;
      <span :class="{ 'text-primary': checked, 'text-decoration-line-through': checked }">
        {{ title }}
      </span>
    </label>
    <a v-if="hidden" class="bi-eye-slash text-secondary cursor-pointer" @click="hid"></a>
    <a v-else class="bi-eye text-success cursor-pointer" @click="hid"></a>
  </span>
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
    showHidden: Boolean,
  },
  watch: {
    checked() {
      this.$store.commit("todoChecked", { id: this.id, checked: this.checked });
    },
  },
  methods: {
    hid() {
      this.hidden = !this.hidden;
      this.$store.commit("todoHidden", { id: this.id, hidden: this.hidden });
    },
  },
};
</script>
