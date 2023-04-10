<template>
  <div class="container">
    <h1>
      {{ $t("page.titles") }}
      <span v-if="this.$store.getters.hasCharacter" class="fs-3 fw-lighter">
        {{
          $t("pageHeader.obtainedByCharacter", { characterName: this.$store.getters.character.Name })
        }}
        <div v-if="this.$store.getters.activeCharacterOutOfDate" class="text-info fs-6">
          <div class="spinner-border spinner-border-sm" role="status"></div>
          {{ $t("message.updatingCharacter") }}
        </div>
        <div v-else-if="!this.$store.getters.achievementsPublic" class="text-warning fs-6">
          {{ $t("message.achievementsNotPublic") }}
        </div>
      </span>
    </h1>
    <AlertMsg
      v-if="!this.$store.getters.isSignedIn"
      type="normal"
      :msg="$t('message.notSignedIn', { url: this.$store.state.env.VUE_APP_DISCORD_AUTH_URI })"
    />
    <AlertMsg
      v-else-if="!this.$store.getters.hasCharacter"
      type="normal"
      :msg="$t('message.noCharacters')"
    />
    <hr />
    <br />
    <div class="row">
      <table class="table align-middle">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col" class="d-none d-md-block">Description</th>
            <th scope="col">Patch</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item of db"
            :key="item.id"
            :class="{
              'row-obtained': achievements.has(item.id),
            }"
          >
            <th scope="row"><img :src="item.icon" /></th>
            <td>{{ item.name }}</td>
            <td class="d-none d-md-table-cell">
              {{ item.description }}
            </td>
            <td>{{ item.patch }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss">
.row-obtained {
  color: #666;
  img {
    filter: brightness(50%);
  }
}
</style>

<script>
import AlertMsg from "@/components/AlertMsg.vue";

import achievementsJson from "@/assets/dbs/achievements.json";

export default {
  name: "TitlesView",
  data() {
    return {
      db: achievementsJson.results.filter((e) => e.type.id == 1).sort((a, b) => a.id - b.id),
      achievements: this.$store.getters.achievements,
    };
  },
  components: {
    AlertMsg,
  },
};
</script>
