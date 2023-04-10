function getLodestoneURL() {
  let url = "https://";
  switch (this.$store.getters.language) {
    case "ja":
      url += "jp";
      break;
    case "de":
      url += "de";
      break;
    case "fr":
      url += "fr";
      break;
    default:
      url += "na";
      break;
  }
  return url + ".finalfantasyxiv.com/lodestone/";
}

export { getLodestoneURL };
