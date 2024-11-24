import store from "../store";
import { injectCharacterData } from "./character";

const apiEndpoint = process.env.VUE_APP_BACKEND_API_URI;

const getVersion = () =>
  new Promise((resolve, reject) => {
    fetch(apiEndpoint + "/version", {
      method: "GET",
      cache: "no-cache",
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
      cache: "no-cache",
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
            injectCharacterData(userData.characters[characterID]);
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
        Authorization: store.getters.discordUser.id + ":" + store.getters.settings.authorizationCode,
      },
      method: "GET",
      cache: "no-cache",
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
            injectCharacterData(userData.characters[characterID]);
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
        Authorization: store.getters.discordUser.id + ":" + store.getters.settings.authorizationCode,
      },
      body: JSON.stringify(payload),
      method: "PUT",
      cache: "no-cache",
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
        reject(err);
      });
  });

const addCharacter = (id) =>
  new Promise((resolve, reject) => {
    fetch(apiEndpoint + "/characters?id=" + id, {
      headers: {
        Authorization: store.getters.discordUser.id + ":" + store.getters.settings.authorizationCode,
      },
      method: "GET",
      cache: "no-cache",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((characterData) => {
        injectCharacterData(characterData);
        resolve(characterData);
      })
      .catch((err) => {
        reject(err);
      });
  });

const removeCharacter = (id) =>
  new Promise((resolve, reject) => {
    fetch(apiEndpoint + "/characters?id=" + id, {
      headers: {
        Authorization: store.getters.discordUser.id + ":" + store.getters.settings.authorizationCode,
      },
      method: "DELETE",
      cache: "no-cache",
    })
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          throw response;
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

const updateChecklist = (id, payload) =>
  new Promise((resolve, reject) => {
    fetch(apiEndpoint + "/checklist?id=" + id, {
      headers: {
        Authorization: store.getters.discordUser.id + ":" + store.getters.settings.authorizationCode,
      },
      body: JSON.stringify(payload),
      method: "PUT",
      cache: "no-cache",
    })
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          throw response;
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

const updateEncounterIDs = (id, payload) =>
  new Promise((resolve, reject) => {
    fetch(apiEndpoint + "/encounters?id=" + id, {
      headers: {
        Authorization: store.getters.discordUser.id + ":" + store.getters.settings.authorizationCode,
      },
      body: JSON.stringify(payload),
      method: "PUT",
      cache: "no-cache",
    })
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          throw response;
        }
      })
      .catch((err) => {
        reject(err);
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
  updateEncounterIDs,
};
