<template>
  <PageHeader title="page.mounts" subtitle="pageHeader.obtainedByCharacter" />

  <div class="row my-4">
    <table class="table align-middle">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Name</th>
          <th scope="col" class="d-none d-md-block">Sources</th>
          <th scope="col">Patch</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item of db.results"
          :key="item.id"
          :class="{
            'row-obtained': mounts[item.id],
          }"
        >
          <th scope="row"><img :src="item.icon" /></th>
          <td>{{ item.name }}</td>
          <td class="d-none d-md-table-cell">
            <span v-for="source of item.sources" :key="source.text">{{ source.text }}<br /> </span>
          </td>
          <td>{{ item.patch }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
.row-obtained {
  color: var(--bs-secondary-color);
  img {
    filter: brightness(50%);
  }
}
</style>

<script>
import PageHeader from "@/components/PageHeader.vue";
import mountsJson from "@/assets/dbs/en/mounts.json";

export default {
  name: "MountsView",
  data() {
    return {
      db: mountsJson,
      mounts: this.$store.getters.mounts,
    };
  },
  components: {
    PageHeader,
  },
};
</script>
