<template>
  <div class="text-center py-1" id="nav-warning">
    You are currently viewing a shared profile. To go back to XIV ToDo,
    <router-link to="/" class="text-reset">click here</router-link>.
  </div>
  <div class="tab-content" id="nav-tabContent">
    <div class="tab-pane fade show active" id="nav-profile" role="tabpanel">
      <Profile />
    </div>
    <div class="tab-pane fade" id="nav-duties" role="tabpanel">
      <Duties />
    </div>
    <div class="tab-pane fade" id="nav-questlines" role="tabpanel">
      <Questlines />
    </div>
  </div>
</template>

<style lang="scss">
#nav-warning {
  color: #b5b5b5;
  background-color: #252a2e;
  margin-top: -15px;
  margin-bottom: 15px;
}
</style>

<script>
import Profile from "@/views/Profile.vue";
import Duties from "@/views/Duties.vue";
import Questlines from "@/views/Questlines.vue";

// this.$route.params.id

export default {
  name: "Character",
  components: {
    Profile,
    Duties,
    Questlines,
  },
};
</script>
