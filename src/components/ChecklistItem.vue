<template>
  <label
    v-if="!hidden && !showHidden"
    class="list-group-item d-flex justify-content-between align-items-center user-select-none"
  >
    <span :class="{ 'checklist-checked': checked }">
      <input
        v-if="!showHidden"
        v-model="checked"
        class="form-check-input"
        type="checkbox"
        :id="item.Name"
      />
      &nbsp;&nbsp;{{ item.Name }}
    </span>
  </label>
  <span v-if="showHidden" class="list-group-item d-flex justify-content-between align-items-center">
    <span :class="{ 'text-muted': hidden }" class="user-select-none">
      {{ item.Name }}
    </span>
    <a
      v-if="showHidden && hidden"
      class="bi-eye-slash text-secondary cursor-pointer"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="Unhide"
      @click="hid"
    ></a>
    <a
      v-else-if="showHidden && !hidden"
      class="bi-eye text-success cursor-pointer"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="Hide"
      @click="hid"
    ></a>
  </span>
</template>

<style lang="scss">
.checklist-checked {
  color: #198754;
  text-decoration: line-through;
  text-decoration-thickness: 2px;
}
</style>

<script>
export default {
  data() {
    return {
      checked: this.$store.state.todosChecked.indexOf(this.item.ID) >= 0,
      hidden: this.$store.state.todosHidden.indexOf(this.item.ID) >= 0,
    };
  },
  props: {
    item: Object,
    showHidden: Boolean,
  },
  watch: {
    checked() {
      this.$store.commit("todoChecked", { id: this.item.ID, checked: this.checked });
    },
  },
  methods: {
    hid() {
      this.hidden = !this.hidden;
      this.$store.commit("todoHidden", { id: this.item.ID, hidden: this.hidden });
    },
  },
};
</script>
