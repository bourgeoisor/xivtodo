# XIV ToDo

![Website](https://img.shields.io/website?url=https%3A%2F%2Fxivtodo.com)
![Discord](https://img.shields.io/discord/946996969354690600?label=discord)
[![ko-fi](https://img.shields.io/badge/buy%20me%20a%20coffee!-donate-success)](https://ko-fi.com/V7V569BFY)
![fr translation](https://img.shields.io/badge/dynamic/json?color=blue&label=fr&style=flat&logo=crowdin&query=%24.progress.1.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15746609-575411.json)
![de translation](https://img.shields.io/badge/dynamic/json?color=blue&label=de&style=flat&logo=crowdin&query=%24.progress.0.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15746609-575411.json)
![ja translation](https://img.shields.io/badge/dynamic/json?color=blue&label=ja&style=flat&logo=crowdin&query=%24.progress.2.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15746609-575411.json)

[XIV ToDo](https://xivtodo.com) provides useful dashboards, tailored checklists and tools for Final Fantasy XIV; whether you are a new player to the game or more experienced. In its current form, XIV ToDo offers customizable daily and weekly checklists as well as automated completion trackers of duties and questlines, with much more to come! 

## Features

- Support for adding multiple characters;
- Profile containing publicly accessible Lodestone information;
- List of all duties up-to-date with automatic character completion status;
- List of important questlines with automatic character completion status;
- Comprehensive list of dailies and weeklies with per-character completion and customization;

## Screenshots

<img src="https://user-images.githubusercontent.com/3271352/231013111-2b3e6dcb-7efa-4628-9998-39d869658d5b.png" width=400 /> <img src="https://user-images.githubusercontent.com/3271352/231013112-eaf34cc8-3b6a-4180-b90e-c6825eec787a.png" width=400 /> <img src="https://user-images.githubusercontent.com/3271352/231013106-2c46d733-ffeb-49b1-b574-e322083ba506.png" width=400 /> <img src="https://user-images.githubusercontent.com/3271352/231013109-e77d2faf-6bdd-4f0b-95d5-0f4c6aab4c16.png" width=400 />

## Development

### Frontend

The frontend requires `node v16` as well as `npm` installed.

To install the required dependencies (including VueJS), run the following from the `xivtodo` directory:
```
npm install
```

The following commands then becomes available:
```
# Compiles and hot-reloads for development
npm run serve

# Compiles and minifies for production
npm run build 

# Lints and fixes files
npm run lint

# Runs Vue.js' UI
vue ui
```

### Backend

The backend requires `go v1.20`.

The following environment variables are required:
```
GOOGLE_APPLICATION_CREDENTIALS=
DISCORD_CLIENT_SECRET=
DISCORD_REDIRECT_URI=
```

## Contributing

Contributions are welcome and appreciated. Simply open up a new issue, or fork the repository to open up a new pull request against the upstream main branch.

---

FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd.<br />
FINAL FANTASY XIV © SQUARE ENIX CO., LTD.
