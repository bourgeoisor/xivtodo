![Website](https://img.shields.io/website?url=https%3A%2F%2Fxivtodo.com)
![GitHub last commit](https://img.shields.io/github/last-commit/bourgeoisor/xivtodo)
[![Crowdin](https://badges.crowdin.net/xiv-todo/localized.svg)](https://crowdin.com/project/xiv-todo)

![fr translation](https://img.shields.io/badge/dynamic/json?color=blue&label=fr&style=flat&logo=crowdin&query=%24.progress.1.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15746609-575411.json)
![de translation](https://img.shields.io/badge/dynamic/json?color=blue&label=de&style=flat&logo=crowdin&query=%24.progress.0.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15746609-575411.json)
![ja translation](https://img.shields.io/badge/dynamic/json?color=blue&label=ja&style=flat&logo=crowdin&query=%24.progress.2.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15746609-575411.json)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/V7V569BFY)

# XIV ToDo

[XIV ToDo](https://xivtodo.com) provides useful dashboards, tailored checklists and tools for Final Fantasy XIV; whether you are a new player to the game or more experienced. In its current form, XIV ToDo offers customizable daily and weekly checklists as well as automated completion trackers of duties and questlines, with much more to come! 

## Features

- Support for adding multiple characters;
- Profile containing publicly accessible Lodestone information;
- List of all duties up-to-date with automatic character completion status;
- List of important questlines with automatic character completion status;
- Comprehensive list of dailies and weeklies with per-character completion and customization;

## Screenshots

<img src="https://user-images.githubusercontent.com/3271352/123179273-6cf66200-d45f-11eb-8090-4817af88b9d2.png" width=400 /> <img src="https://user-images.githubusercontent.com/3271352/123179295-74b60680-d45f-11eb-93a8-0f7271d7c6af.png" width=400 /> <img src="https://user-images.githubusercontent.com/3271352/123179310-7aabe780-d45f-11eb-8fd2-606aaa03b8a2.png" width=400 /> <img src="https://user-images.githubusercontent.com/3271352/123179315-7da6d800-d45f-11eb-907d-0254f08455b2.png" width=400 />

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
