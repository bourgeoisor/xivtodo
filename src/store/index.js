import { createStore } from "vuex";
import { injectWeeklyChecklist, injectDailyChecklist } from "@/utilities/checklist";

const store = createStore({
  state: {
    env: {},
    upstreamVersion: "",
    userData: null,
    activeCharacterID: 0,
  },
  getters: {
    versionMatches(state) {
      return state.env.VUE_APP_BUILD_NUM == state.upstreamVersion || state.upstreamVersion == null;
    },
    backendOffline(state) {
      return state.upstreamVersion == "OFFLINE";
    },
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
      return getters.lodestoneData.Character || {};
    },
    achievements(state, getters) {
      return getters.lodestoneData.Achievements || [];
    },
    achievementsPublic(state, getters) {
      return getters.lodestoneData.Achievements?.length > 0 || false;
    },
    latestNewsSeen(state, getters) {
      return getters.settings.latestNewsSeen || 0;
    },
    latestCountdownSeen(state, getters) {
      return getters.settings.latestCountdownSeen || 0;
    },
    checklistData(state, getters) {
      return getters.activeCharacter?.checklistData || {};
    },
    checklistWeeklies(state, getters) {
      return injectWeeklyChecklist(getters.checklistData.weeklyChecklist || []);
    },
    checklistDailies(state, getters) {
      return injectDailyChecklist(getters.checklistData.dailyChecklist || []);
    },
    checklistAdhocs(state, getters) {
      return getters.checklistData.adhocChecklist || [];
    },
    checklistLenHiddens(state, getters) {
      let hiddens = 0;
      for (let item of getters.checklistWeeklies) {
        if (item.hidden) {
          hiddens++;
        }
      }
      for (let item of getters.checklistDailies) {
        if (item.hidden) {
          hiddens++;
        }
      }
      return hiddens;
    },
    checklistNextWeeklyReset(state, getters) {
      return getters.checklistData.nextWeeklyReset || 0;
    },
    checklistNextDailyReset(state, getters) {
      return getters.checklistData.nextDailyReset || 0;
    },
    activeCharacterOutOfDate(state, getters) {
      return getters.characterOutOfDate(state.activeCharacterID);
    },
    characterOutOfDate: (state, getters) => (id) => {
      let now = new Date();
      let msBeforeUpdate = 1000 * 60 * 60 * 48; // 48 hours

      return now > getters.characters[id].updated * 1000 + msBeforeUpdate;
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

    setUpstreamVersion(state, payload) {
      state.upstreamVersion = payload;
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
          state.userData.characters[i] = payload;
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
    checklistNextWeeklyReset(state, payload) {
      state.userData.characters[state.activeCharacterID].checklistData.nextWeeklyReset = payload;
    },
    checklistNextDailyReset(state, payload) {
      state.userData.characters[state.activeCharacterID].checklistData.nextDailyReset = payload;
    },
    setChecklistWeeklies(state, payload) {
      state.userData.characters[state.activeCharacterID].checklistData.weeklyChecklist = payload;
    },
    setChecklistDailies(state, payload) {
      state.userData.characters[state.activeCharacterID].checklistData.dailyChecklist = payload;
    },
    setChecklistAdhocs(state, payload) {
      state.userData.characters[state.activeCharacterID].checklistData.adhocChecklist = payload;
    },
  },
  actions: {},
  modules: {},
});

export default store;
