<template>
  <div class="px-4 py-4 my-4 text-center">
    <img
      v-if="this.$store.state.settings.nightMode"
      class="d-block mx-auto mb-4"
      src="../assets/brand.png"
      alt="XIV ToDo branding"
      width="300"
    />
    <img
      v-else
      class="d-block mx-auto mb-4"
      src="../assets/brand_black.png"
      alt="XIV ToDo branding"
      width="300"
    />
    <h1 class="visually-hidden">XIV ToDo</h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">
        XIV ToDo provides useful dashboards, tailored checklists, and tools for Final Fantasy XIV;
        whether you are a new player to the game or more experienced. In its current form, XIV ToDo
        offers customizable daily and weekly checklists as well as automated completion trackers of
        duties and questlines, with much more to come!
      </p>
      <div class="d-grid gap-2 d-sm-flex mb-5 justify-content-center">
        <template v-if="!this.$store.getters.hasCharacter">
          <router-link to="/settings">
            <button type="button" class="btn btn-success btn-lg px-4 gap-3">Add a character</button>
          </router-link>
          <button
            type="button"
            class="btn btn-outline-secondary btn-lg px-4"
            @click="goto('features')"
          >
            Learn more
          </button>
        </template>
        <template v-else>
          <router-link to="/profile">
            <button type="button" class="btn btn-outline-success btn-lg px-4 gap-3">
              View your profile
            </button>
          </router-link>
          <router-link to="/settings">
            <button type="button" class="btn btn-outline-secondary btn-lg px-4 gap-3">
              Settings
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
          src="../assets/screen_checklist.png"
          class="border rounded-3 mb-4"
          alt="Screenshot of checklist page"
          style="width: 400%"
        />
      </div>
      <div class="col-11 col-md-7 col-lg-5 px-0">
        <img
          src="../assets/screen_duties.png"
          class="border rounded-3 mb-4"
          alt="Screenshot of duties page"
          style="z-index: +1000; position: relative; width: 100%"
        />
      </div>
      <div class="d-none d-md-block col-2 col-lg-1 px-0 pt-5">
        <img
          src="../assets/screen_questlines.png"
          class="border rounded-3 mb-4 float-end"
          alt="Screenshot of questlines page"
          style="width: 400%"
        />
      </div>
    </div>
  </div>

  <div id="features-grid" class="container px-4 py-2 mb-5 border-bottom border-grey">
    <h1 ref="features" class="pb-2 border-bottom">Features</h1>

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4 py-5">
      <div class="col d-flex align-items-start">
        <i class="bi bi-list-ul flex-shrink-0 me-3"></i>
        <div>
          <h4 class="fw-bold mb-0">Duties &amp; questlines</h4>
          <p>
            Complete listing of all duties, main and side story questlines available in the game.
          </p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <i class="bi bi-card-checklist flex-shrink-0 me-3"></i>
        <div>
          <h4 class="fw-bold mb-0">Content completion</h4>
          <p>
            Add your character to quickly visualize which content you've cleared and which ones are
            still pending.
          </p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <i class="bi bi-list-check flex-shrink-0 me-3"></i>
        <div>
          <h4 class="fw-bold mb-0">Dailies &amp; weeklies</h4>
          <p>
            Comprehensive list of daily and weekly objectives which can be ticked off and get
            automatically cleared on reset.
          </p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <i class="bi bi-moon-stars flex-shrink-0 me-3"></i>
        <div>
          <h4 class="fw-bold mb-0">Day &amp; and night themes</h4>
          <p>
            In addition to a lighter day color theme, there is also a darker night color theme
            available.
          </p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <i class="bi bi-eye-slash flex-shrink-0 me-3"></i>
        <div>
          <h4 class="fw-bold mb-0">Spoiler-free</h4>
          <p>
            Main story content is blurred by default until a clear to avoid accidental spoilers.
          </p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <i class="bi bi-palette flex-shrink-0 me-3"></i>
        <div>
          <h4 class="fw-bold mb-0">Customizable</h4>
          <p>
            Personalization is available like hiding select objectives from the checklists, with
            more to come soon.
          </p>
        </div>
      </div>
      <!-- <div class="col d-flex align-items-start">
        <i class="bi bi-bookmark-star flex-shrink-0 me-3"></i>
        <div>
          <h4 class="fw-bold mb-0">Feature title</h4>
          <p>Paragraph of text beneath the heading to explain the heading.</p>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <i class="bi bi-bookmark-star flex-shrink-0 me-3"></i>
        <div>
          <h4 class="fw-bold mb-0">Feature title</h4>
          <p>Paragraph of text beneath the heading to explain the heading.</p>
        </div>
      </div> -->
    </div>
  </div>

  <div class="container col-xxl-8 px-4 pb-5">
    <div class="row align-items-center g-5 pb-5">
      <div class="d-none d-md-block col-md-3 col-lg-3">
        <img
          src="../assets/hamster_avatar.png"
          style="border-radius: 50%; width: 100%"
          class="d-block mx-lg-auto"
          alt="Bootstrap Themes"
        />
      </div>
      <div class="col-11 col-md-9 col-lg-8">
        <h1 class="pb-2 border-bottom mb-3">About XIV ToDo</h1>
        <p class="lead text-justify">
          XIV ToDo is a project started in mid-2021 by
          <a
            class="text-reset"
            href="https://bourgeois.io"
            target="_blank"
            rel="noopener noreferrer"
            >Olivier Bourgeois</a
          >, a software developer from Canada. After realizing that there were no methods for
          quickly visualizing which of the numerous duties and questlines that had been cleared by
          my characters, the idea had sparked. XIV ToDo currently is and remains free and open
          source under the xivtodo GitHub repository. You can
          <a
            class="text-reset"
            href="https://forms.gle/2t5nLB28xDyi3Tn6A"
            target="_blank"
            rel="noopener noreferrer"
            >contact me</a
          >
          with any questions or feedback. Thank you for using and supporting this project!
        </p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <a
            href="https://github.com/bourgeoisor/xivtodo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button type="button" class="btn btn-outline-secondary btn-lg px-4 me-md-2">
              View project on GitHub
            </button>
          </a>
          <!-- <button type="button" class="btn btn-outline-secondary btn-lg px-4">Default</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#features-grid h4 {
  text-decoration: underline;
  text-decoration-color: #41b883;
}

#features-grid .bi {
  color: #41b883;
  font-size: 1.75em;
}
</style>

<script>
export default {
  name: "Home",
  methods: {
    goto(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;

      window.scrollTo(0, top - 70);
    },
  },
};
</script>
