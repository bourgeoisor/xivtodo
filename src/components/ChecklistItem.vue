<template>
  <label
    v-if="!hidden && !showHidden"
    class="
      list-group-item list-group-item-action
      d-flex
      justify-content-between
      align-items-center
      user-select-none
    "
  >
    <span>
      <input
        v-if="!showHidden && this.$store.getters.hasCharacter"
        v-model="checked"
        :class="{ 'checkbox-checked': checked }"
        class="form-check-input"
        type="checkbox"
        :id="item.Name"
      />
      &nbsp;&nbsp;<span :class="{ 'checklist-checked': checked }">{{ item.Name }}</span>
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

.night {
  .form-check-input.checkbox-checked[type="checkbox"] {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23198754' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
  }

  .form-check-input.checkbox-checked {
    border-color: #198754;
  }

  .list-group-item-action:focus,
  .list-group-item-action:hover {
    background-color: #212529 !important;
  }

  .list-group-item-action:active {
    background-color: #1c2024 !important;
  }
}
</style>

<script>
export default {
  data() {
    return {
      checked: this.$store.getters.todosChecked.indexOf(this.item.ID) >= 0,
      hidden: this.$store.getters.todosHidden.indexOf(this.item.ID) >= 0,
    };
  },
  props: {
    item: Object,
    showHidden: Boolean,
    rerender: Number,
  },
  watch: {
    checked() {
      this.$store.commit("todoChecked", { id: this.item.ID, checked: this.checked });
    },
    rerender() {
      this.checked = this.$store.getters.todosChecked.indexOf(this.item.ID) >= 0;
      this.hidden = this.$store.getters.todosHidden.indexOf(this.item.ID) >= 0;
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
