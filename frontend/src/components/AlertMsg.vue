<template>
  <div
    id="error-block"
    class="alert"
    :class="{
      'alert-dark': type == 'normal',
      'alert-muted': type == 'muted',
      'alert-danger': type == 'danger',
      'alert-warning': type == 'warning',
      'alert-success': type == 'success',
      'alert-info': type == 'info',
    }"
    role="alert"
  >
    <i
      class="mx-1 fa-fw fas"
      :class="{
        'fa-info-circle': type == 'normal' || type == 'muted',
        'fa-exclamation-triangle': type == 'warning',
        'fa-exclamation-circle': type == 'danger' || type == 'info',
        'fa-check-circle': type == 'success',
      }"
    >
    </i>
    <span v-html="msg"></span>
  </div>
</template>

<style lang="scss">
.alert {
  margin-top: 10px;
}

.alert-link:hover {
  filter: brightness(50%);
}
</style>

<script>
export default {
  props: {
    type: String,
    msg: String,
  },
};
</script>
