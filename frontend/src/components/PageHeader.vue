<template>
  <h1 class="d-flex align-items-end">
    <span class="me-auto">
      <!-- Title -->
      {{ $t(this.title) }}

      <span v-if="this.subtitle && this.$store.getters.hasCharacter" class="fs-3 fw-lighter d-block d-lg-inline">
        <!-- Subtitle -->
        {{ $t(this.subtitle, { characterName: this.$store.getters.character.Name }) }}

        <!-- Subtitle info: Updating character data... -->
        <div v-if="this.$store.getters.activeCharacterOutOfDate" class="text-info fs-6">
          <div class="spinner-border spinner-border-sm" role="status"></div>
          {{ $t("message.updatingCharacter") }}
        </div>

        <!-- Subtitle info: Achievements not public -->
        <div v-else-if="!this.$store.getters.achievementsPublic" class="text-warning fs-6">
          {{ $t("message.achievementsNotPublic") }}
        </div>
      </span>
    </span>

    <slot></slot>
  </h1>

  <!-- Alert: Not signed in -->
  <AlertMsg
    v-if="!this.hideNotSignedInAlert && !this.$store.getters.isSignedIn"
    type="normal"
    :msg="$t('message.notSignedIn', { url: this.$store.getters.discordAuthURI })"
  />

  <!-- Alert: No characters -->
  <AlertMsg
    v-else-if="!this.hideNoCharactersAlert && !this.$store.getters.hasCharacter"
    type="normal"
    :msg="$t('message.noCharacters')"
  />

  <!-- Alert: Error -->
  <AlertMsg v-if="error && error.msg" :type="error.type" :msg="error.msg" />

  <!-- Divider line -->
  <hr />
</template>

<script>
import AlertMsg from "@/components/AlertMsg.vue";

export default {
  props: {
    title: String,
    subtitle: String,
    error: Object,
    hideNotSignedInAlert: Boolean,
    hideNoCharactersAlert: Boolean,
  },
  components: {
    AlertMsg,
  },
};
</script>
