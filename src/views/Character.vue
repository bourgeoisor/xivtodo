<template>
  <div class="text-center py-1" id="nav-warning">
    You are currently viewing a shared profile. To get back to your characters,
    <router-link to="/" class="text-reset">click here</router-link>.
  </div>
  <div class="tab-content" id="nav-tabContent">
    <div class="tab-pane fade show active" id="nav-profile" role="tabpanel">
      <Profile v-if="this.$store.getters.activeCharacter" />
      <div v-else class="d-flex align-content-center justify-content-center mt-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div class="tab-pane fade" id="nav-duties" role="tabpanel">
      <Duties v-if="this.$store.getters.activeCharacter" />
      <div v-else class="d-flex align-content-center justify-content-center mt-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div class="tab-pane fade" id="nav-questlines" role="tabpanel">
      <Questlines v-if="this.$store.getters.activeCharacter" />
      <div v-else class="d-flex align-content-center justify-content-center mt-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
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
