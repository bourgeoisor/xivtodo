import { createStore } from "vuex";

export default createStore({
  state: {
    settings: {
      lastUpdated: "",
      characterId: "",
      spoilersOption: "1",
    },
    characterData: {},
  },
  getters: {
    character(state) {
      return state.characterData?.Character || {};
    },
    characterData(state) {
      return state.characterData?.Character?.Name;
    },
    achievements(state) {
      return state.characterData?.Achievements || {};
    },
    achievementsPublic(state) {
      return state.characterData?.AchievementsPublic || false;
    },
  },
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem("store"))));
      }
    },
    updateSettings(state, payload) {
      state.settings = { ...payload };
    },
    updateCharacterData(state, payload) {
      state.characterData = payload;
    },
  },
  actions: {},
  modules: {},
});
