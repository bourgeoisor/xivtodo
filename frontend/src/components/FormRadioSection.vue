<template>
  <h3>{{ $t(this.i18nPrefix + "label") }}</h3>

  <div v-for="option in options" :key="option" class="form-check">
    <input      
      @change="$emit('radioChange', option)"
      class="form-check-input"
      type="radio"
      :name="id"
      :id="id+option"
      :value="option"
      :checked="modelValue === option"
    />
    <label class="form-check-label" :for="id+option">
      {{ $t(this.i18nPrefix + "option" + option) }}
    </label>
  </div>

  <div class="form-text mb-3">{{ $t(this.i18nPrefix + "hint") }}</div>
</template>

<script>
export default {
  name: "FormRadioSection",
  props: {
    modelValue: Number,
    i18nPrefix: String,
    id: String,
    options: Array,
  },
  emits: ["radioChange"],
};
</script>
