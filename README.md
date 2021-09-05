# Vue Pokedex

## Overview

[Vue.js](https//vuejs.org), a progressive web framework for building user interfaces, has been noticeably growing in popularity as of late. As a software engineer who has experience with React, Angular, and a variety of front-end libraries, I knew that it was only a matter of time before I dove into Vue.js for myself. This project here serves as a way for me to learn Vue... while building something fun.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build
```

## Deployment (note: only owner with surge account can deploy to pokedex.surge.sh)
``` bash
# first time
chmod +x deploy.sh

# ensure that you have the surge cdn and you're logged in

# deploy to production
./deploy.sh
```

## Objectives

- Create a web application that allows users to query and view Pokemon and their data
- Have the app be able to consume data from an API/external source
- Integrate style framework with the application
  - Ensure application is both desktop and mobile optimized
  - Learn and utilize both CSS variables and SCSS
- Utilize Vue Router for discrete views
- Allow for state changes and persistence through the use of session and local storage
  - Applications include stored queries, data, and potentially dark mode

## Prototyping

In order to establish the overall design, color-scheme, and navigation and user-flow, I decided to create a quick wireframe and prototype using Figma. While the design was not final, it provided good first steps and ideas to use and not use (e.g. opting for using the background instead of solid colors for cards, reusing the same header for the mobile/desktop views for ease of implementation and visual consistency).

https://www.figma.com/file/FIMUxyWO0F3NthqhehTlzw/Vuemon?node-id=0%3A1

## Components

```
./src
└── components
    └── general
        ├── Disclaimer.vue
        ├── Footer.vue
        ├── Loading.vue
        ├── SettingsModal.vue
        └── TypeBadge.vue
    └── profile
        ├── ProfileAbilities.vue
        ├── ProfileEvolutionCard.vue
        ├── ProfileEvolutions.vue
        ├── ProfileForms.vue
        ├── ProfileHeader.vue
        ├── ProfileInfo.vue
        ├── ProfileStats.vue
        └── ProfileTypeRels.vue
    └── search
        ├── PokeCard.vue
        └── SearchBar.vue
└── resources
    ├── constants.js
    └── utils.js
└── router
    └── index.js
└── views
    ├── Profile.vue
    └── Search.vue
├── App.vue
└── main.js
```

## Reflection

### Vue
- Really enjoyed its lightweight and more "template-based" design, was very fast to create components and prototype/add functionality. Being able to compartmentalize different functionality (e.g. template, functions, styles) was very nice
- Had to take some time to get used to directives, as its more akin to models used in Angular as opposed to React (myself having more experience with the latter). But I found it very useful in a variety of instances, for example it was much less verbose to iterate an element in Vue to be rendered than in React i.e. `v-for` instead of `this.state.map((x) => ...))`
- The lifecycle system was overall familar (akin to React), however it took time getting used to how components had to be setup in Vue (e.g. methods, data, etc. are represented in Vue as a series of nested objects, whereas in React a component is either a function or class)
- As Vue leans more on the templating side than React, it was harder at first to get used to the fact that certain things (e.g. `computed`, `data`, `methods`) could be accessed in the template while others cannot (e.g. imported functions, references to `document`) without being passed through an intermediary. It would be frustrating at times (not to mention how `this` is often used in the Vue object to refer to the view model, whereas in the template it's not needed), but hey at least we have two-way binding :)

### Making things "Native-like"
- It's more common these days for "mobile-first" applications to maintain "native-like" functionality (e.g. mobile-optimized inputs, persistence, on-screen navigation)
- In order to provide the best experience possible, I sought to utilize the browser session and local storages for data persistence in key moments:
  - Saving user queries was a big one, as while Vue router would preserve scroll positions in important locations (the search page), certain properties would be reset with each visit - sort order, inputted text, sort property, and loaded pages
  - Certain user modes should also persist, for example a light/dark mode (which has become popular as of late)
    - In this instance, unlike query data, dark mode states was decided to be kept in local storage instead of sessions - as dark mode should be a feature that persists beyond page-refreshes (a nice feature made even nicer, as the user doesn't even need an account)
    - `CSS Variables and SCSS`
      - I had a great experience with SCSS, as it helped abstract out styles and style properties into variables when need be (e.g. establishing global colors in `custom.scss`)
      - Moreover, it was particularly useful in overriding a lot of the provided styling variables in `Bootstrap` (e.g. variants/themes, colors) as well as add your own

## Resources

- [Vue.js](https://vuejs.org) of course
- [Vue Router](https://vuejsrouter.org) for routing views
- [Vue Bootstrap](https://bootstrap-vue.org/) style framework of choice
- [PokeAPI](https://pokeapi.co/) where the data for the mock api was sourced from
