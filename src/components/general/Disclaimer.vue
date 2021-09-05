<template>
  <div class="p-disclaimer">
    <p class="p-important">All data on this application was last updated on {{lastUpdated}}.</p>
    <p><b>Please note!</b> The latter IDs (10001 and onwards) refer to variants of some of the original Pokemon (1-898). They were given these IDs as that is how <a href="https://pokeapi.co" target="_blank">PokeAPI</a> (where the data was sourced from) indexes them.</p>
    <p><i>The Pokedex</i> is a not-for-profit, free project for educational and entertainment purposes only. This is in no way affiliated with the Pokemon© franchise, nor with The Pokemon Company™, Game Freak™, Nintendo™ or any related entities.</p>
    <p>Made with ❤️ &nbsp;by Brian H.</p>
  </div>
</template>

<script>
export default {
  name: 'Disclaimer',
  data() {
    return {
      lastUpdated: '9/6/2021'
    }
  }
}
</script>

<style lang="scss">

.p-disclaimer {
  p {
    font-size: 10px;
    margin-bottom: 0;
  }
}

.p-important {
  font-weight: bold;
  font-style: italic;
}

</style>