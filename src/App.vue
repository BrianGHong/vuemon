<template>
  <router-view :key="$route.path" />
</template>

<script>
import { DARKMODE_LOCAL } from './resources/constants'

export default {
  mounted() {
    // Initialize dark mode (app-wide) and update local storage
    const darkModeState = localStorage.getItem(DARKMODE_LOCAL) ? localStorage.getItem(DARKMODE_LOCAL) : null;
    if (darkModeState === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem(DARKMODE_LOCAL, 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem(DARKMODE_LOCAL, 'light');
    }
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
