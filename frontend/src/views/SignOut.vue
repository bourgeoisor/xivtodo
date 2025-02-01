<template>
  <div>Signing out...</div>
</template>

<script>
export default {
  name: "SignOut",
  mounted() {
    this.$store.commit("deleteUserData");
    this.$router.push("/");
  },
};
</script>
