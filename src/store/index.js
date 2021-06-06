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
