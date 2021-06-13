<template>
  <footer class="footer d-flex justify-content-between mt-auto py-2 px-2 bg-light">
    <div class="footer-copyrights text-muted d-none d-lg-block col-4">
      FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd.<br />
      FINAL FANTASY XIV © SQUARE ENIX CO., LTD.
    </div>
    <div class="flex-fill text-center text-muted">
      <a class="link-dark text-reset" href="https://xivtodo.com">XIV·ToDo</a> was coded with love by
      <a class="link-dark text-reset" href="https://github.com/bourgeoisor/xivtodo">
        Olivier Bourgeois
      </a>
    </div>
    <div class="footer-copyrights text-muted text-end my-auto d-none d-lg-block col-4">
      Build {{ build }}
    </div>
  </footer>
</template>

<style lang="scss">
.night footer {
  background-color: #212529 !important;
  border-top: 1px solid #333333;

  a,
  a:focus {
    color: #bbbbbb;
  }

  a:hover {
    color: #bbbbbb;
  }
}

.footer-copyrights {
  font-size: 0.6rem;
}
</style>

<script>
export default {
  Name: "TheFooter",
  data() {
    return {
      build: process.env.VUE_APP_VERSION,
    };
  },
};
</script>
