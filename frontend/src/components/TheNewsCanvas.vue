<template>
  <div id="offcanvasUpdates" class="offcanvas offcanvas-start" tabindex="-1" data-bs-theme="night">
    <div class="offcanvas-header">
      <h3 class="offcanvas-title" id="offcanvasUpdatesLabel">{{ $t("page.newsUpdates") }}</h3>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
      <div v-for="item in news.news" :key="item.ID" class="mb-5">
        <h4>{{ item.title }}</h4>
        <small class="text-muted">
          Posted on <b class="text-success">{{ item.published }}</b>
        </small>
        <br />
        <p v-html="item.content"></p>
      </div>
    </div>
  </div>
</template>

<script>
import news from "@/assets/news.json";

export default {
  name: "TheNewsCanvas",
  data() {
    return {
      news: news,
    };
  },
};
</script>
