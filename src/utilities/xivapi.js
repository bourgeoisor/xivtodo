function injectData(characterData) {
  let achievementList = characterData.Achievements?.List || [];
  for (let i = 0; i < achievementList.length; i++) {
    if (achievementList[i].ID == 789) {
      characterData.PlayingSince = achievementList[i].Date;
    }
  }

  characterData.Jobs = {};
  for (let classJob of characterData.Character.ClassJobs) {
    characterData.Jobs[classJob.Job.Abbreviation] = classJob;
  }
}

const fetchCharacterData = (id) =>
  new Promise((resolve, reject) => {
    fetch("https://xivapi.com/character/" + id + "?extended=1&data=AC,MIMO", {
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
          reject("An unknown error has ocurred while fetching character data.");
        }
      });
  });

export { fetchCharacterData };
