<template>
  <div
    id="error-block"
    class="alert"
    :class="{
      'alert-dark': type == 'normal',
      'alert-muted': type == 'muted',
      'alert-danger': type == 'error',
      'alert-warning': type == 'warning',
      'alert-success': type == 'success',
    }"
    role="alert"
  >
    <span
      class="bi"
      :class="{
        'bi-info-circle-fill': type == 'normal' || type == 'muted',
        'bi-exclamation-triangle-fill': type == 'error' || type == 'warning',
        'bi-check-circle-fill': type == 'success',
      }"
    >
    </span
    >&nbsp;
    <span v-html="msg"></span>
  </div>
</template>

<style lang="scss">
.alert {
  margin-top: 10px;
}

.night {
  .alert-muted {
    color: #dddddd;
    background-color: #30363d;
  }

  .alert-danger {
    color: #dddddd;
    background-color: #631414;
    border-color: #dddddd;
  }

  .alert-danger .alert-link {
    color: #dddddd;
  }

  .alert-primary {
    color: #04376a;
    background-color: #a4c2e1;
    border-color: #a4c2e1;
  }

  .alert-primary .alert-link {
    color: #04376a;
  }

  .alert-warning {
    color: #524b35;
    background-color: #f6e275;
    border-color: #fff5bc;
  }

  .alert-warning .alert-link {
    color: #524b35;
  }

  .alert-success {
    color: #1e342a;
    background-color: #41b883;
    border-color: #4ea57e;
  }

  .alert-success .alert-link {
    color: #1e342a;
  }
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
