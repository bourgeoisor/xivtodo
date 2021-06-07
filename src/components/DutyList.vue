<template>
  <h3>{{ title }}</h3>
  <ul class="list-group list-group-flush">
    <DutyListItem
      v-for="item of duties"
      :key="item.Name"
      :duty="item"
      :clearedMaybe="true"
      :blur="false"
    />
  </ul>
  <br />
</template>

<script>
import DutyListItem from "@/components/DutyListItem.vue";

export default {
  props: {
    title: String,
    duties: Object,
  },
  components: {
    DutyListItem,
  },
};
</script>
