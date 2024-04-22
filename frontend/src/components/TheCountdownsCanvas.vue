<template>
  <div id="offcanvasCountdowns" class="offcanvas offcanvas-start" tabindex="-1" data-bs-theme="night">
    <div class="offcanvas-header">
      <h3 class="offcanvas-title" id="offcanvasCountdownsLabel">{{ $t("page.countdowns") }}</h3>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
      <div v-for="item in news.countdowns" :key="item.title" class="mb-5">
        <h4>{{ item.title }}</h4>
        <small>
          <!-- Event type icon -->
          <i
            class="fa-fw fal me-1"
            :class="{
              'fa-calendar-day': item.type == 'event',
              'fa-tv-retro': item.type == 'keynote',
              'fa-edit': item.type == 'patch',
              'text-success': this.isEventNow(item) || this.isEventNowForever(item),
              'text-danger': this.isEventEnded(item),
              'text-muted': this.isEventInFuture(item),
              }"
          ></i>

          <!-- If event ended... -->
          <span v-if="this.isEventEnded(item)" class="text-danger">
            {{ $t("shared.time.eventEnded") }}
          </span>

          <!-- If event did not start yet... -->
          <span v-else-if="this.isEventInFuture(item)" class="text-muted">
            {{ $t("shared.time.available") }}
            <b class="text-info">
              <abbr :title="dateFormat(item.start)">{{ timeLeft(item.start) }}</abbr>
            </b>
          </span>

          <!-- If event is currently happening... -->
          <span v-else-if="this.isEventNow(item)" class="text-muted">
            {{ $t("shared.time.ending") }}
            <b class="text-success">
              <abbr :title="dateFormat(item.end)">{{ timeLeft(item.end) }}</abbr>
            </b>
          </span>

          <!-- If event is currently happening and has no end... -->
          <span v-else-if="this.isEventNowForever(item)" class="text-success">
            {{ $t("shared.time.currentlyAvailable") }}
          </span>

          <!-- External link, if available -->
          <span v-if="item.url">
            &bull;
            <a class="text-reset me-1" :href="item.url" target="_blank" rel="noopener noreferrer">{{ $t("shared.moreDetails") }}</a>
            <i class="fa-fw fas fa-external-link"></i>
          </span>
        </small>
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
      now: new Date() / 1000,
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.now = new Date() / 1000;
    });
    this.intervalFunction = setInterval(() => {
      this.now = new Date() / 1000;
    }, 60 * 1000);
  },
  unmounted() {
    clearInterval(this.intervalFunction);
  },
  methods: {
    timeLeft(timestamp) {
      const locale = this.$i18n.locale;
      const formatter = new Intl.RelativeTimeFormat(locale, {
        numericUnit: 'auto',
      });

      const diff = (timestamp - this.now) * 1000;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        return formatter.format(days, 'day');
      } else if (hours > 0) {
        return formatter.format(hours, 'hour');
      } else if (minutes > 0) {
        return formatter.format(minutes, 'minute');
      }
    },
    dateFormat(timestamp) {
      const date = new Date(timestamp * 1000);
      const locale = this.$i18n.locale;
      return date.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", timeZoneName: "short" });
    },
    isEventInFuture(event) {
      return event.start && this.now < event.start
    },
    isEventEnded(event) {
      return event.end && this.now > event.end;
    },
    isEventNow(event) {
      return !this.isEventInFuture(event) && !this.isEventEnded(event) && event.end
    },
    isEventNowForever(event) {
      return !this.isEventInFuture(event) && !event.end
    }
  }
};
</script>
