import db from "@/assets/db.json";

function injectWeeklyChecklist(payload) {
  let weeklyChecklist = [...payload];

  // Add missing items in payload from DB
  for (let dbItem of db.weeklyChecklist) {
    let found = false;
    for (let item of weeklyChecklist) {
      if (item.name == dbItem.Name && !item.custom) {
        found = true;
      }
    }
    if (!found) {
      let newItem = {
        name: dbItem.Name,
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
      if (dbItem.Name == item.name) {
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
    let found = false;
    for (let item of dailyChecklist) {
      if (item.name == dbItem.Name && !item.custom) {
        found = true;
      }
    }
    if (!found) {
      let newItem = {
        name: dbItem.Name,
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
      if (dbItem.Name == item.name) {
        found = true;
      }
    }
    if (!found && !item.custom) {
      dailyChecklist.splice(i, 1);
    }
  }

  return dailyChecklist;
}

export { injectWeeklyChecklist, injectDailyChecklist };
