<template>
  <footer class="footer mt-auto py-3 bg-light text-center">
    <a class="link-dark" href="https://bourgeois.io/xivtodo/">XIV|ToDo</a> was coded with love by
    <a class="link-dark" href="https://github.com/bourgeoisor/xivtodo">Olivier Bourgeois</a>.
    <div id="footer-copyrights" class="text-muted">
      FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd.<br />
      FINAL FANTASY XIV © SQUARE ENIX CO., LTD.
    </div>
  </footer>
</template>

<style lang="scss">
.night footer {
  background-color: #212529 !important;
  border-top: 1px solid #333333;

  a,
  a:focus {
    color: #ffffff;
  }

  a:hover {
    color: #dddddd;
  }
}

#footer-copyrights {
  font-size: 0.6rem;
}
</style>

<script>
export default {
  Name: "TheFooter",
};
</script>
