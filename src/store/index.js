import { createStore } from "vuex";

const store = createStore({
  state: {
    env: {},
    userData: null,
    activeCharacterID: 0,
  },
  getters: {
    userData(state) {
      return state.userData || null;
    },
    discordUser(state) {
      return state.userData?.discordUser || {};
    },
    settings(state) {
      return state.userData?.settings || {};
    },
    characters(state) {
      return state.userData?.characters || [];
    },
    hasCharacter(state, getters) {
      return getters.characters?.length > 0 || false;
    },
    activeCharacter(state, getters) {
      if (state.activeCharacterID >= getters.characters.length) {
        state.activeCharacterID = 0;
      }

      return getters.characters[state.activeCharacterID];
    },
    lodestoneData(state, getters) {
      return getters.activeCharacter?.lodestoneData || {};
    },
    character(state, getters) {
      return getters.activeCharacter?.lodestoneData?.Character || {};
    },
    achievements(state, getters) {
      return getters.activeCharacter?.lodestoneData?.Achievements || [];
    },
    achievementsPublic(state, getters) {
      return getters.activeCharacter?.lodestoneData?.Achievements?.length > 0 || false;
    },
    latestNewsSeen(state, getters) {
      return getters.settings.latestNewsSeen || 0;
    },
    latestCountdownSeen(state, getters) {
      return getters.settings.latestCountdownSeen || 0;
    },



    characterOutOfDateACT(state, getters) {
      return getters.characterOutOfDate(state.activeCharacterID);
    },
    characterOutOfDate: (state) => (id) => {
      if (state) {
        id;
      }
      return false;
    },
    // characterOutOfDate: (state) => (id) => {
    //   let now = new Date();
    //   let msBeforeUpdate = 1000 * 60 * 60 * 48; // 48 hours

    //   return (
    //     state.characters[id].modelVersion != "v2" ||
    //     now > state.characters[id].lastUpdated + msBeforeUpdate
    //   );
    // },
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

      state.env = process.env;
    },

    signIn(state, payload) {
      // @TODO: deprecate this cleanup step
      delete state.characters;
      delete state.characterData;
      delete state.latestNewsSeen;
      delete state.latestNewsSeenPrevious;
      delete state.latestCountdownSeen;
      delete state.settings;
      delete state.todosChecked;
      delete state.todosHidden;
      delete state.todosNextDailyReset;
      delete state.todosNextWeeklyReset;

      state.signIn = payload;
    },

    setUserData(state, payload) {
      state.userData = { ...payload };
      if (state.userData.characters == null) {
        state.userData.characters = [];
      }

      delete state.signIn;
    },
    deleteUserData(state) {
      state.userData = null;
    },
    setSettings(state, payload) {
      state.userData.settings = { ...payload };
    },
    addCharacter(state, payload) {
      for (let i = 0; i < state.userData.characters.length; i++) {
        if (
          state.userData.characters[i].lodestoneData.Character.ID ==
          payload.lodestoneData.Character.ID
        ) {
          return;
        }
      }

      state.userData.characters.push(payload);
      state.activeCharacterID = state.userData.characters.length - 1;
    },
    removeCharacter(state, payload) {
      state.userData.characters.splice(payload, 1);
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

export default store;