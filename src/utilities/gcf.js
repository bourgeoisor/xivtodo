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
  let achievementList = characterData.Achievements || [];
  for (let i = 0; i < achievementList.length; i++) {
    if (achievementList[i].ID == 789) {
      characterData.PlayingSince = achievementList[i].Date;
    }
  }

  characterData.Jobs = {};
  for (let classJob of characterData.Character.ClassJobs) {
    // @todo: fix this.
    if (classJob.JobID == 0) {
      if (classJob.Name == "Sage") {
        characterData.Jobs["sge"] = classJob;
      }

      if (classJob.Name == "Reaper") {
        characterData.Jobs["rpr"] = classJob;
      }

      continue;
    }

    characterData.Jobs[jobInitials[classJob.JobID]] = classJob;
  }
}

const fetchCharacterData = (id) =>
  new Promise((resolve, reject) => {
    fetch("https://asia-northeast1-xiv-todo.cloudfunctions.net/lodestone-character?id=" + id, {
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
        } else {
          reject(
            "Could not reach Lodestone. There may be an ongoing maintenance, or an ad-blocker extension may be blocking the request. Please try again later."
          );
        }
      });
  });

export { fetchCharacterData };
