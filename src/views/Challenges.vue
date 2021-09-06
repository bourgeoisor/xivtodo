<template>
  <div class="container">
    <h1>
      Challenges
      <span
        v-if="this.$store.getters.hasCharacter && this.$store.getters.achievementsPublic"
        class="fs-3 fw-lighter"
      >
        cleared by {{ this.$store.getters.character.Name }}
      </span>
      <span v-else-if="this.$store.getters.hasCharacter" class="fs-3 fw-lighter text-warning">
        <abbr title="The achievements for this characters are not set to public in Lodestone.">
          cleared by {{ this.$store.getters.character.Name }}
        </abbr>
        &nbsp;<span class="bi bi-patch-exclamation"></span>
      </span>
    </h1>
    <Alert
      v-if="!this.$store.getters.hasCharacter"
      type="normal"
      msg="No characters found. You can add your characters from the <a href='/settings' class='alert-link'>Settings</a>."
    />
    <hr />
    <div class="row">
      <h2>Deep Dungeons</h2>

      <div class="col-lg">
        <DutyList title="Palace of the Dead" :duties="db.potd" />
      </div>
      <div class="col-lg">
        <DutyList title="Heaven-on-High" :duties="db.hoh" />
      </div>
      <div class="col-lg">
        <DutyList title="Palace of the Dead (Solo)" :duties="db.potdSolo" />
        <DutyList title="Heaven-on-High (Solo)" :duties="db.hohSolo" />
      </div>
    </div>
    <div class="row">
      <h2>Blue Mage</h2>

      <div class="col-lg">
        <DutyList title="BLU Encounters (A Realm Reborn)" :duties="db.arrBlu" />
        <DutyList title="BLU Encounters (Heavensward)" :duties="db.hwBlu" />
        <DutyList title="BLU Encounters (Stormblood)" :duties="db.sbBlu" />
      </div>
      <div class="col-lg">
        <DutyList title="Masked Carnivale" :duties="db.maskedCarnivale" />
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";
import DutyList from "@/components/DutyList.vue";

import dbJson from "@/assets/db.json";

export default {
  name: "Challenges",
  data() {
    return {
      db: dbJson,
    };
  },
  components: {
    Alert,
    DutyList,
  },
};
</script>
