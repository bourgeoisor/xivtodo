<template>
  <div>
    <div class="px-4 py-4 my-4 text-center">
      <img
        class="d-block mx-auto mb-4"
        src="../assets/brand.png"
        alt="XIV ToDo branding"
        width="300"
      />
      <h1 class="visually-hidden">XIV ToDo</h1>
      <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">
          {{ $t("home.intro") }}
        </p>
        <div class="d-grid gap-2 d-sm-flex mb-5 justify-content-center">
          <template v-if="!this.$store.getters.hasCharacter">
            <router-link v-if="this.$store.getters.userData" to="/settings">
              <button type="button" class="btn btn-success btn-lg px-4 gap-3">
                {{ $t("home.addCharacter") }}
              </button>
            </router-link>
            <a v-else :href="this.$store.state.env.VUE_APP_DISCORD_AUTH_URI">
              <button type="button" class="btn btn-success btn-lg px-4 gap-3">
                Sign in with Discord
              </button>
            </a>
            <button
              type="button"
              class="btn btn-outline-secondary btn-lg px-4"
              @click="goto('features')"
            >
              {{ $t("home.learnMore") }}
            </button>
          </template>
          <template v-else>
            <router-link to="/profile">
              <button type="button" class="btn btn-outline-success btn-lg px-4 gap-3">
                {{ $t("home.viewProfile") }}
              </button>
            </router-link>
            <router-link to="/settings">
              <button type="button" class="btn btn-outline-secondary btn-lg px-4 gap-3">
                {{ $t("page.settings") }}
              </button>
            </router-link>
          </template>
        </div>
      </div>
      <div
        class="overflow-hidden border-bottom border-grey row justify-content-center"
        style="max-height: 25vh"
      >
        <div class="d-none d-md-block col-2 col-lg-1 px-0 pt-5">
          <img
            src="../assets/screen_checklist_mockup.png"
            class="border rounded-3 mb-4"
            alt="Screenshot of checklist page"
            style="width: 400%"
          />
        </div>
        <div class="col-11 col-md-7 col-lg-5 px-0">
          <img
            src="../assets/screen_duties_mockup.png"
            class="border rounded-3 mb-4"
            alt="Screenshot of encounters page"
            style="z-index: +1000; position: relative; width: 100%"
          />
        </div>
        <div class="d-none d-md-block col-2 col-lg-1 px-0 pt-5">
          <img
            src="../assets/screen_questlines_mockup.png"
            class="border rounded-3 mb-4 float-end"
            alt="Screenshot of questlines page"
            style="width: 400%"
          />
        </div>
      </div>
    </div>

    <div id="features-grid" class="container px-4 py-2 mb-5 border-bottom border-grey">
      <h1 ref="features" class="pb-2 border-bottom">{{ $t("home.features") }}</h1>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4 py-5">
        <div class="col d-flex align-items-start">
          <i class="fa-fw fad fa-list flex-shrink-0 me-3"></i>
          <div>
            <h4 class="fw-bold mb-0">{{ $t("home.feature.encountersQuestlines.title") }}</h4>
            <p>{{ $t("home.feature.encountersQuestlines.description") }}</p>
          </div>
        </div>
        <div class="col d-flex align-items-start">
          <i class="fa-fw fad fa-chart-pie flex-shrink-0 me-3"></i>
          <div>
            <h4 class="fw-bold mb-0">{{ $t("home.feature.contentCompletion.title") }}</h4>
            <p>{{ $t("home.feature.contentCompletion.description") }}</p>
          </div>
        </div>
        <div class="col d-flex align-items-start">
          <i class="fa-fw fad fa-clipboard-list flex-shrink-0 me-3"></i>
          <div>
            <h4 class="fw-bold mb-0">{{ $t("home.feature.dailiesWeeklies.title") }}</h4>
            <p>{{ $t("home.feature.dailiesWeeklies.description") }}</p>
          </div>
        </div>
        <div class="col d-flex align-items-start">
          <i class="fa-fw fad fa-user-friends flex-shrink-0 me-3"></i>
          <div>
            <h4 class="fw-bold mb-0">{{ $t("home.feature.altFriendly.title") }}</h4>
            <p>{{ $t("home.feature.altFriendly.description") }}</p>
          </div>
        </div>
        <div class="col d-flex align-items-start">
          <i class="fa-fw fad fa-eye-slash flex-shrink-0 me-3"></i>
          <div>
            <h4 class="fw-bold mb-0">{{ $t("home.feature.spoilerFree.title") }}</h4>
            <p>{{ $t("home.feature.spoilerFree.description") }}</p>
          </div>
        </div>
        <div class="col d-flex align-items-start">
          <i class="fa-fw fad fa-palette flex-shrink-0 me-3"></i>
          <div>
            <h4 class="fw-bold mb-0">{{ $t("home.feature.customizable.title") }}</h4>
            <p>{{ $t("home.feature.customizable.description") }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container col-xxl-8 px-4 pb-5">
      <div class="row align-items-center g-5 pb-5">
        <div class="d-none d-md-block col-md-3 col-lg-3">
          <img
            src="../assets/hamster_avatar.png"
            style="border-radius: 50%; width: 100%"
            class="d-block mx-lg-auto"
            alt="Drawing of a hamster"
          />
        </div>
        <div class="col-11 col-md-9 col-lg-8">
          <h1 class="pb-2 border-bottom mb-3">{{ $t("home.about.header") }}</h1>
          <p class="lead text-justify">
            <i18n-t keypath="home.about.text">
              <a href="https://bourgeois.io" target="_blank" rel="noopener noreferrer">
                {{ $t("home.about.name") }}
              </a>
              <a
                href="https://forms.gle/2t5nLB28xDyi3Tn6A"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ $t("home.about.contact") }}
              </a>
            </i18n-t>
          </p>
          <div class="d-grid gap-2 d-md-flex justify-content-md-start">
            <a href="https://ko-fi.com/olivi_eh" target="_blank" rel="noopener noreferrer">
              <button type="button" class="btn btn-success btn-lg px-4 me-md-2">
                <i class="fa-fw fal fa-heart"></i> {{ $t("page.donate") }}
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#features-grid .fad {
  color: #41b883;
  font-size: 1.75em;
}
</style>

<script>
export default {
  name: "HomeView",
  methods: {
    goto(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;

      window.scrollTo(0, top - 70);
    },
    changeActiveCharacter(i) {
      this.$store.commit("changeActiveCharacter", i);
    },
  },
};
</script>
