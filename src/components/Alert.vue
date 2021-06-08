<template>
  <div id="error-block" class="alert alert-danger" role="alert">
    <span class="bi-exclamation-triangle-fill"></span>&nbsp;
    <span v-html="msg"></span>
  </div>
</template>

<style lang="scss">
.night .alert-danger {
  color: #dddddd;
  background-color: #631414;
}

.night .alert-danger .alert-link {
  color: #dddddd;
}
</style>

<script>
export default {
  props: {
    msg: String,
  },
};
</script>
