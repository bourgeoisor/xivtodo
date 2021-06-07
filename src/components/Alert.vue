<template>
  <div id="error-block" class="alert alert-danger" role="alert">
    <span class="bi-exclamation-triangle-fill"></span>&nbsp;
    <span v-html="msg"></span>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    msg: String,
  },
};
</script>
