import store from "../store";

const apiEndpoint = process.env.VUE_APP_BACKEND_API_URI;

const jobInitials = {
  1: "gla",
  2: "pgl",
  3: "mrd",
  4: "lnc",
  5: "arc",
  6: "cnj",
  7: "thm",
  8: "crp",
  9: "bsm",
  10: "arm",
  11: "gsm",
  12: "ltw",
  13: "wvr",
  14: "alc",
  15: "cul",
  16: "min",
  17: "btn",
  18: "fsh",
  19: "pld",
  20: "mnk",
  21: "war",
  22: "drg",
  23: "brd",
  24: "whm",
  25: "blm",
  26: "acn",
  27: "smn",
  28: "sch",
  29: "rog",
  30: "nin",
  31: "mch",
  32: "drk",
  33: "ast",
  34: "sam",
  35: "rdm",
  36: "blu",
  37: "gnb",
  38: "dnc",
  39: "rpr",
  40: "sge",
};

function injectData(characterData) {
  let achievementList = characterData.lodestoneData.Achievements || [];
  for (let i = 0; i < achievementList.length; i++) {
    if (achievementList[i].ID == 789) {
      characterData.lodestoneData.PlayingSince = achievementList[i].Date;
    }
  }

  characterData.lodestoneData.Jobs = {};
  for (let classJob of characterData.lodestoneData.Character.ClassJobs) {
    characterData.lodestoneData.Jobs[jobInitials[classJob.UnlockedState.ID]] = classJob;
  }
}

const getVersion = () =>
  new Promise((resolve, reject) => {
    fetch(apiEndpoint + "/version", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          reject();
        }
      })
      .then((version) => {
        resolve(version.version);
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  });

const authenticate = (code) =>
  new Promise((resolve, reject) => {
    fetch(apiEndpoint + "/auth?code=" + code, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((userData) => {
        let characters = [];
        if (userData.characters != null) {
          for (let characterID in userData.characters) {
            injectData(userData.characters[characterID]);
            characters.push(userData.characters[characterID]);
          }
        }
        userData.characters = characters;
        resolve(userData);
      })
      .catch((err) => {
        reject(err);
      });
  });

const getUserData = () =>
  new Promise((resolve, reject) => {
    fetch(apiEndpoint + "/users", {
      headers: {
        Authorization:
          store.getters.discordUser.id + ":" + store.getters.settings.authorizationCode,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((userData) => {
        let characters = [];
        if (userData.characters != null) {
          for (let characterID in userData.characters) {
            injectData(userData.characters[characterID]);
            characters.push(userData.characters[characterID]);
          }
        }
        userData.characters = characters;
        resolve(userData);
      })
      .catch((err) => {
        reject(err);
      });
  });

const updateSettings = (payload) =>
  new Promise((resolve, reject) => {
    fetch(apiEndpoint + "/settings", {
      headers: {
        Authorization:
          store.getters.discordUser.id + ":" + store.getters.settings.authorizationCode,
      },
      body: JSON.stringify(payload),
      method: "PUT",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((settings) => {
        resolve(settings);
      })
      .catch((err) => {
        reject("Could not update settings: " + err);
      });
  });

const addCharacter = (id) =>
  new Promise((resolve, reject) => {
    fetch(apiEndpoint + "/characters?id=" + id, {
      headers: {
        Authorization:
          store.getters.discordUser.id + ":" + store.getters.settings.authorizationCode,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((characterData) => {
        injectData(characterData);
        resolve(characterData);
      })
      .catch((err) => {
        if (err.status == 404) {
          reject("The character profile you have entered does not exist.");
        } else if (err.status == 400) {
          reject(
            "Could not add character. You may have already added this character, or have reached the limit of characters. "
          );
        } else {
          reject(
            "Could not reach Lodestone; There may be an ongoing maintenance. Please try again later."
          );
        }
      });
  });

const removeCharacter = (id) =>
  new Promise((resolve, reject) => {
    fetch(apiEndpoint + "/characters?id=" + id, {
      headers: {
        Authorization:
          store.getters.discordUser.id + ":" + store.getters.settings.authorizationCode,
      },
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          throw response;
        }
      })
      .catch((err) => {
        reject("Could not delete character. Please try again later." + err);
      });
  });

const updateChecklist = (id, payload) =>
  new Promise((resolve, reject) => {
    fetch(apiEndpoint + "/checklist?id=" + id, {
      headers: {
        Authorization:
          store.getters.discordUser.id + ":" + store.getters.settings.authorizationCode,
      },
      body: JSON.stringify(payload),
      method: "PUT",
    })
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          throw response;
        }
      })
      .catch((err) => {
        reject("Could not update checklist. Please try again later." + err);
      });
  });

export {
  getVersion,
  authenticate,
  getUserData,
  updateSettings,
  addCharacter,
  removeCharacter,
  updateChecklist,
};
