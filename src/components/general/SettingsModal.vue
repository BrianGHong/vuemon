<template>
  <div class="p-settings-modal">
    <h4>Settings</h4>
    <div>
      <!-- Dark Mode Toggle -->
      <b-button
        :variant="darkModeOn ? 'lightOn' : 'lightOff'"
        @click="toggleDarkMode"
      >
        <b-icon icon="moon"/>
        Turn {{ darkModeOn ? 'OFF' : 'ON' }} Dark Mode
      </b-button><br>
      <!-- Clear Cached Data -->
      <b-button @click="clearCache" class="mt-4" size="sm">
        <span class="align-middle">
          Clear Pokedex Cache &nbsp;<b-spinner v-if="reloading" label="Spinning" type="grow" small />
        </span>
      </b-button>
    </div>
    <hr>
    <h4>Add the Pokedex "App"!</h4>
    <b-row>
      <!-- iOS Instructions -->
      <b-col cols="4">
        <img src="@/assets/ios_inst.png" alt="" width="100%">
      </b-col>
      <b-col>
        <h5>iOS</h5>
        <ol>
          <li>Open the Pokedex in <b>Safari</b></li>
          <li>Tap the <b-icon icon="box-arrow-up" /> <b>Share</b> button</li>
          <li>Scroll down and tap <b>Add to Home Screen</b></li>
        </ol>
      </b-col>
    </b-row>
    <b-row>
      <!-- Android Instructions -->
      <b-col cols="4">
        <img src="@/assets/and_inst.png" alt="" width="100%">
      </b-col>
      <b-col>
        <h5>Android</h5>
        <ol>
          <li>Open the Pokedex in <b>Chrome</b></li>
          <li>Tap the<b-icon icon="three-dots-vertical" /><b>Menu</b> button</li>
          <li>Scroll down and tap <b>Add to Home screen</b></li>
        </ol>
      </b-col>
    </b-row>
    <hr>
    <h4>Disclaimer</h4>
    <Disclaimer />
    <hr>
  </div>
</template>

<script>
import { DARKMODE_LOCAL } from '../../resources/constants';
import Disclaimer from './Disclaimer.vue';

export default {
  name: 'SettingsModal',
  components: {
    Disclaimer
  },
  methods: {
    // Fetch darkmode state from local storage, set to dark if value is 'light'
    // - vice versa. If not in local storage, set to dark.
    // Updates dark mode theme, localStorage, and button state
    toggleDarkMode() {
      const darkModeOn = localStorage.getItem(DARKMODE_LOCAL) ? localStorage.getItem(DARKMODE_LOCAL) : null;
      if (darkModeOn === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem(DARKMODE_LOCAL, 'light');
        this.darkModeOn = false;
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem(DARKMODE_LOCAL, 'dark');
        this.darkModeOn = true;
      }
    },
    // Clears both session and local storage, then reloads page
    clearCache() {
      this.reloading = true;
      sessionStorage.clear();
      localStorage.clear();
      location.reload();
    }
  },
  mounted() {
    // Initialize button state based on darkmode status
    const darkModeState = localStorage.getItem(DARKMODE_LOCAL) ? localStorage.getItem(DARKMODE_LOCAL) : null;
    if (darkModeState === 'dark') {
      this.darkModeOn = true;
    }
  },
  data() {
    return {
      darkModeOn: false,
      reloading: false
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/custom.scss';

.p-settings-modal {
  color: var(--text-color) !important;
  background: var(--bg-color) !important;

  h5 {
    font-style: italic;
  }
  li {
    font-size: 15px;
  }
}
</style>