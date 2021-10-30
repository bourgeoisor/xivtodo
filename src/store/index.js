import { createStore } from "vuex";
import router from "../router";

export default createStore({
  state: {
    settings: {
      spoilersOption: "1",
      nightMode: true,
    },
    activeCharacterID: 0,
    characters: [],
    latestNewsSeen: 0,
    latestNewsSeenPrevious: 0,
    latestCountdownSeen: 0,
  },
  getters: {
    latestNewsSeen(state) {
      return state.latestNewsSeen || 0;
    },
    latestNewsSeenPrevious(state) {
      return state.latestNewsSeenPrevious || 0;
    },
    latestCountdownSeen(state) {
      return state.latestCountdownSeen || 0;
    },
    hasCharacter(state) {
      return state.characters.length > 0;
    },
    activeCharacter(state) {
      if (state.activeCharacterID >= state.characters.length) {
        state.activeCharacterID = 0;
      }

      // console.log(router.currentRoute._value.name);
      // console.log(router.currentRoute._value.params.id);
      if (router.currentRoute._value.name == "Character") {
        return null;
      } else {
        return state.characters[state.activeCharacterID];
      }
    },
    characterOutOfDateACT(state, getters) {
      return getters.characterOutOfDate(state.activeCharacterID);
    },
    characterOutOfDate: (state) => (id) => {
      let now = new Date();
      let msBeforeUpdate = 1000 * 60 * 60 * 48; // 48 hours

      return (
        state.characters[id].modelVersion != "v2" ||
        now > state.characters[id].lastUpdated + msBeforeUpdate
      );
    },
    characterData(state, getters) {
      return getters.activeCharacter?.characterData || {};
    },
    character(state, getters) {
      return getters.activeCharacter?.characterData.Character || {};
    },
    achievements(state, getters) {
      return getters.activeCharacter?.characterData.Achievements || [];
    },
    achievementsPublic(state, getters) {
      return getters.activeCharacter?.characterData.Achievements.length > 0 || false;
    },
    todosChecked(state, getters) {
      return getters.activeCharacter?.todosChecked || [];
    },
    todosHidden(state, getters) {
      return getters.activeCharacter?.todosHidden || [];
    },
    todosNextDailyReset(state, getters) {
      return getters.activeCharacter?.todosNextDailyReset || 0;
    },
    todosNextWeeklyReset(state, getters) {
      return getters.activeCharacter?.todosNextWeeklyReset || 0;
    },
    todosCustomDailies(state, getters) {
      return getters.activeCharacter?.todosCustomDailies || [];
    },
    todosCustomWeeklies(state, getters) {
      return getters.activeCharacter?.todosCustomWeeklies || [];
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
    seenLatestNews(state, payload) {
      state.latestNewsSeenPrevious = state.latestNewsSeen;
      state.latestNewsSeen = payload;
    },
    seenLatestCountdown(state, payload) {
      state.latestCountdownSeen = payload;
    },
    addCharacter(state, payload) {
      // If character already loaded, update it.
      for (let i = 0; i < state.characters.length; i++) {
        if (state.characters[i].characterData.Character.ID == payload.Character.ID) {
          state.characters[i].characterData = payload;
          state.characters[i].lastUpdated = parseInt(Date.now());
          state.characters[i].modelVersion = "v2";
          return;
        }
      }

      // Else, create a new character entry.
      let character = {
        characterData: payload,
        lastUpdated: parseInt(Date.now()),
        modelVersion: "v2",
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
    todosAddCustomDaily(state, payload) {
      let id = 2900;
      if (state.characters[state.activeCharacterID].todosCustomDailies == null) {
        state.characters[state.activeCharacterID].todosCustomDailies = [];
      } else {
        let lengthTasks = state.characters[state.activeCharacterID].todosCustomDailies.length;
        if (lengthTasks > 0) {
          id = state.characters[state.activeCharacterID].todosCustomDailies[lengthTasks - 1].ID + 1;
        }
      }

      let task = {
        Name: payload,
        ID: id,
        Custom: true,
      };

      state.characters[state.activeCharacterID].todosCustomDailies.push(task);
    },
    todosAddCustomWeekly(state, payload) {
      let id = 1900;
      if (state.characters[state.activeCharacterID].todosCustomWeeklies == null) {
        state.characters[state.activeCharacterID].todosCustomWeeklies = [];
      } else {
        let lengthTasks = state.characters[state.activeCharacterID].todosCustomWeeklies.length;
        if (lengthTasks > 0) {
          id =
            state.characters[state.activeCharacterID].todosCustomWeeklies[lengthTasks - 1].ID + 1;
        }
      }

      let task = {
        Name: payload,
        ID: id,
        Custom: true,
      };

      state.characters[state.activeCharacterID].todosCustomWeeklies.push(task);
    },
    todosRemoveCustom(state, payload) {
      if (state.characters[state.activeCharacterID].todosCustomDailies) {
        state.characters[state.activeCharacterID].todosCustomDailies = state.characters[
          state.activeCharacterID
        ].todosCustomDailies.filter((item) => item.ID != payload);
      }

      if (state.characters[state.activeCharacterID].todosCustomWeeklies) {
        state.characters[state.activeCharacterID].todosCustomWeeklies = state.characters[
          state.activeCharacterID
        ].todosCustomWeeklies.filter((item) => item.ID != payload);
      }
    },
  },
  actions: {},
  modules: {},
});
