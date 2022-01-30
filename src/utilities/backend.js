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

// @TODO: make this prettier
function injectData(characterData) {
  let achievementList = characterData.lodestoneData.Achievements || [];
  for (let i = 0; i < achievementList.length; i++) {
    if (achievementList[i].ID == 789) {
      characterData.lodestoneData.PlayingSince = achievementList[i].Date;
    }
  }

  characterData.lodestoneData.Jobs = {};
  for (let classJob of characterData.lodestoneData.Character.ClassJobs) {
    // @TODO: fix this
    if (classJob.JobID == 0) {
      if (classJob.Name == "Sage") {
        characterData.lodestoneData.Jobs["sge"] = classJob;
      }

      if (classJob.Name == "Reaper") {
        characterData.lodestoneData.Jobs["rpr"] = classJob;
      }

      continue;
    }

    characterData.lodestoneData.Jobs[jobInitials[classJob.JobID]] = classJob;
  }
}

const authenticate = (code) =>
  new Promise((resolve, reject) => {
    console.log(apiEndpoint + "/auth?code=" + code);
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
        for (let character of userData.characters) {
          injectData(character);
        }
        resolve(userData);
      })
      .catch((err) => {
        reject(err);
      });
  });

const addCharacter = (id) =>
  new Promise((resolve, reject) => {
    fetch(apiEndpoint + "/characters/add?id=" + id, {
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
            "Invalid request. You may have already added this character, or have reached the limit of characters. "
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
    fetch(apiEndpoint + "/characters/remove?id=" + id, {
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

export { authenticate, addCharacter, removeCharacter };
