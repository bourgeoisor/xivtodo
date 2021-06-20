import { createStore } from "vuex";

export default createStore({
  state: {
    settings: {
      spoilersOption: "1",
      nightMode: true,
    },
    activeCharacterID: 0,
    characters: [],
  },
  getters: {
    hasCharacter(state) {
      return state.characters.length > 0;
    },
    characterData(state) {
      return state.characters[state.activeCharacterID]?.characterData || {};
    },
    character(state) {
      return state.characters[state.activeCharacterID]?.characterData.Character || {};
    },
    achievements(state) {
      return state.characters[state.activeCharacterID]?.characterData.Achievements?.List || [];
    },
    achievementsPublic(state) {
      return state.characters[state.activeCharacterID]?.characterData.AchievementsPublic || false;
    },
    todosChecked(state) {
      return state.characters[state.activeCharacterID]?.todosChecked || [];
    },
    todosHidden(state) {
      return state.characters[state.activeCharacterID]?.todosHidden || [];
    },
    todosNextDailyReset(state) {
      return state.characters[state.activeCharacterID]?.todosNextDailyReset || 0;
    },
    todosNextWeeklyReset(state) {
      return state.characters[state.activeCharacterID]?.todosNextWeeklyReset || 0;
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
    addCharacter(state, payload) {
      // If character already loaded, update it.
      for (let i = 0; i < state.characters.length; i++) {
        if (state.characters[i].characterData.Character.ID == payload.Character.ID) {
          state.characters[i].characterData = payload;
          state.characters[i].lastUpdated = parseInt(Date.now());
          return;
        }
      }

      // Else, create a new character entry.
      let character = {
        characterData: payload,
        lastUpdated: parseInt(Date.now()),
      };

      state.characters.push(character);
      state.activeCharacterID = state.characters.length - 1;
    },
    removeCharacter(state, payload) {
      state.characters.splice(payload, 1);
      if (state.activeCharacterID == payload) {
        state.activeCharacterID = 0;
      }
    },
    changeActiveCharacter(state, payload) {
      state.activeCharacterID = payload;
    },
    todoChecked(state, payload) {
      if (state.characters[state.activeCharacterID].todosChecked == null) {
        state.characters[state.activeCharacterID].todosChecked = [];
      }

      let present = state.characters[state.activeCharacterID].todosChecked.indexOf(payload.id) >= 0;
      if (present && !payload.checked) {
        state.characters[state.activeCharacterID].todosChecked = state.characters[
          state.activeCharacterID
        ].todosChecked.filter((item) => item != payload.id);
      } else if (!present && payload.checked) {
        state.characters[state.activeCharacterID].todosChecked.push(payload.id);
      }
    },
    todoHidden(state, payload) {
      if (state.characters[state.activeCharacterID].todosHidden == null) {
        state.characters[state.activeCharacterID].todosHidden = [];
      }

      let present = state.characters[state.activeCharacterID].todosHidden.indexOf(payload.id) >= 0;
      if (present && !payload.hidden) {
        state.characters[state.activeCharacterID].todosHidden = state.characters[
          state.activeCharacterID
        ].todosHidden.filter((item) => item != payload.id);
      } else if (!present && payload.hidden) {
        state.characters[state.activeCharacterID].todosHidden.push(payload.id);
      }
    },
    todosNextDailyReset(state, payload) {
      state.characters[state.activeCharacterID].todosNextDailyReset = payload;
    },
    todosNextWeeklyReset(state, payload) {
      state.characters[state.activeCharacterID].todosNextWeeklyReset = payload;
    },
  },
  actions: {},
  modules: {},
});
