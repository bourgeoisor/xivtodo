<template>
  <div class="container">
    <h1>Dashboard</h1>
    <hr />
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld
      msg="Hi! I'm currently rewriting this app from scratch; sorry about the mess. It'll get fixed soon!"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Dashboard",
  components: {
    HelloWorld,
  },
};
</script>
