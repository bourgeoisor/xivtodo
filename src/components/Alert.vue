<template>
  <div id="error-block" class="alert alert-dark" role="alert">
    <span class="bi-exclamation-triangle-fill"></span>&nbsp;
    <span v-html="msg"></span>
  </div>
</template>

<style lang="scss">
.alert {
  margin-top: 10px;
}

.night {
  .alert-danger {
    color: #dddddd;
    background-color: #631414;
    border-color: #631414;
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
}
</style>

<script>
export default {
  props: {
    msg: String,
  },
};
</script>
