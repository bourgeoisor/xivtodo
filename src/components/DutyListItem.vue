<template>
  <li
    class="list-group-item d-flex justify-content-between align-items-center"
    :class="{
      'text-secondary': clearedMaybe,
      'text-success': clearedYes,
      'text-danger': clearedNo,
    }"
  >
    <span
      :class="{
        'bi-slash-square': clearedMaybe,
        'bi-check-square': clearedYes,
        'bi-square': clearedNo,
      }"
    >
      &nbsp;
      <span
        :class="{
          'blur-maybe': blur && clearedMaybe,
          'blur-cleared': blur && clearedYes,
          'blur-uncleared': blur && clearedNo,
          'user-select-none': blur,
          bold: duty.Bold,
        }"
        >{{ duty.Name }}</span
      >
    </span>
  </li>
</template>

<style lang="scss">
.bold {
  font-weight: 700;
}

.blur-maybe {
  color: transparent;
  text-shadow: 0 0 20px rgba(80, 80, 80, 0.5);
}

.blur-cleared {
  color: transparent;
  text-shadow: 0 0 20px rgba(0, 80, 0, 0.4);
}

.blur-uncleared {
  color: transparent;
  text-shadow: 0 0 20px rgba(80, 0, 0, 0.4);
}
</style>

<script>
export default {
  props: {
    duty: Object,
    // let achievements = new Map()
    // for (let i = 0; i < achievementData["List"].length; i++) {
    //     achievements.set(achievementData["List"][i]["ID"], achievementData["List"][i]["Date"])
    // }
    clearedMaybe: Boolean,
    clearedYes: Boolean,
    clearedNo: Boolean,
    // let cleared = 0 // Not cleared
    // if ("ID" in list[i] && achievements.has(list[i]["ID"])) cleared = 1 // Cleared
    // else if ("MaxID" in list[i] && achievements.has(list[i]["MaxID"])) cleared = 1 // Cleared
    // else if ("MaxAltID" in list[i] && achievements.has(list[i]["MaxAltID"])) cleared = 1 // Cleared
    // else if ("MinID" in list[i] && achievements.has(list[i]["MinID"])) cleared = -1 // Maybe
    // else if ("MinID" in list[i] && !achievements.has(list[i]["MinID"])) cleared = 0 // Not cleared
    // else if (!("ID" in list[i])) cleared = -1 // Maybe
    blur: Boolean,
    // if (list[i]["Spoilers"] && spoilersOption != 2)
    //    let showIfAllowed = false
    //    if ("SpoilersUntil" in list[i] && achievements.has(list[i]["SpoilersUntil"])) showIfAllowed = true
    //    if (spoilersOption == 0 || (cleared != 1 && !showIfAllowed)) {
  },
};
</script>
