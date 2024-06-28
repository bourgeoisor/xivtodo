import db from "@/assets/db.json";
import store from "../store";

function injectWeeklyChecklist(payload) {
  let weeklyChecklist = [...payload];

  // Add missing items in payload from DB
  for (let dbItem of db.weeklyChecklist) {
    let name = dbItem.NameEN;
    let found = false;
    for (let i = 0; i < payload.length; i++) {
      let item = payload[i];
      if (item.name == name && found) {
        weeklyChecklist.splice(i, 1);
        break;
      }
      if (item.name == name && !item.custom) {
        found = true;
      }
    }
    if (!found) {
      let newItem = {
        name: name,
        custom: false,
        checked: false,
        hidden: false,
      };
      weeklyChecklist.push(newItem);
    }
  }

  // Remove non-custom items not in DB off from payload
  for (let i = 0; i < payload.length; i++) {
    let item = payload[i];
    let found = false;
    for (let dbItem of db.weeklyChecklist) {
      if (dbItem.NameEN == item.name) {
        found = true;
      }
    }
    if (!found && !item.custom) {
      weeklyChecklist.splice(i, 1);
    }
  }

  return weeklyChecklist;
}

function injectDailyChecklist(payload) {
  let dailyChecklist = [...payload];

  // Add missing items in payload from DB
  for (let dbItem of db.dailyChecklist) {
    let name = dbItem.NameEN;
    let found = false;
    for (let i = 0; i < payload.length; i++) {
      let item = payload[i];
      if (item.name == name && found) {
        dailyChecklist.splice(i, 1);
        break;
      }
      if (item.name == name && !item.custom) {
        found = true;
      }
    }
    if (!found) {
      let newItem = {
        name: name,
        custom: false,
        checked: false,
        hidden: false,
      };
      dailyChecklist.push(newItem);
    }
  }

  // Remove non-custom items not in DB off from payload
  for (let i = 0; i < payload.length; i++) {
    let item = payload[i];
    let found = false;
    for (let dbItem of db.dailyChecklist) {
      if (dbItem.NameEN == item.name) {
        found = true;
      }
    }
    if (!found && !item.custom) {
      dailyChecklist.splice(i, 1);
    }
  }

  return dailyChecklist;
}

function swapChecklistItems(fromName, toName) {
  let adhocChecklist = [...store.getters.checklistAdhocs];
  let weeklyChecklist = [...store.getters.checklistWeeklies];
  let dailyChecklist = [...store.getters.checklistDailies];

  let fromObj = null;

  for (let i = 0; i < adhocChecklist.length; i++) {
    if (adhocChecklist[i].name == fromName) {
      fromObj = adhocChecklist[i];
      adhocChecklist.splice(i, 1);
      store.commit("setChecklistAdhocs", adhocChecklist);
      break;
    }
  }
  for (let i = 0; i < weeklyChecklist.length; i++) {
    if (weeklyChecklist[i].name == fromName) {
      fromObj = weeklyChecklist[i];
      weeklyChecklist.splice(i, 1);
      store.commit("setChecklistWeeklies", weeklyChecklist);
      break;
    }
  }
  for (let i = 0; i < dailyChecklist.length; i++) {
    if (dailyChecklist[i].name == fromName) {
      fromObj = dailyChecklist[i];
      dailyChecklist.splice(i, 1);
      store.commit("setChecklistDailies", dailyChecklist);
      break;
    }
  }

  if (fromObj == null) return;

  for (let i = 0; i < adhocChecklist.length; i++) {
    if (adhocChecklist[i].name == toName) {
      adhocChecklist.splice(i, 0, fromObj);
      store.commit("setChecklistAdhocs", adhocChecklist);
      break;
    }
  }
  for (let i = 0; i < weeklyChecklist.length; i++) {
    if (weeklyChecklist[i].name == toName) {
      weeklyChecklist.splice(i, 0, fromObj);
      store.commit("setChecklistWeeklies", weeklyChecklist);
      break;
    }
  }
  for (let i = 0; i < dailyChecklist.length; i++) {
    if (dailyChecklist[i].name == toName) {
      dailyChecklist.splice(i, 0, fromObj);
      store.commit("setChecklistDailies", dailyChecklist);
      break;
    }
  }
}

export { injectWeeklyChecklist, injectDailyChecklist, swapChecklistItems };
