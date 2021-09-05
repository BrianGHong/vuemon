<template>
  <b-container class="poke-container min-100" fluid="md">
    <!-- Loading Component -->
    <Loading :isLoading="loading"/>
    <div class="search" id="top" v-if="!loading">

      <!-- Logo -->
      <h1 class="text-center mt-4 p-logo">Pokedex</h1>

      <!-- Input bar, sorts/filters, options -->
      <SearchBar
        :queryObj="queryObj"
        @updateQueryObject="updateQueryObject"
        @resetPagesLoaded="loadPages(1)"
      />

      <!-- No results -->
      <div
        v-if="filteredMons.length === 0 && !loading"
        class="p-no-results"
      >
        <img :src="sadPikachuImg" alt="T_T" width="200px">
        <p class="my-1">No Results :(</p>
      </div>

      <!-- Render search results -->
      <b-card-group deck>
        <PokeCard
          v-for="mon in filteredMons.slice(0, perPage * pagesLoaded)"
          :key="mon.id"
          :id="mon.id"
          :name="mon.name"
          :types="mon.types"
          :img="mon.img"
        ></PokeCard>
      </b-card-group>

      <!-- Load more button -->
      <div class="row justify-content-center">
        <b-button
          block
          size="lg"
          class="mx-4 mb-5"
          variant="info"
          v-if="(perPage * pagesLoaded) < filteredMons.length"
          @click="loadPages(pagesLoaded + 1)"
        >
          Load more...
        </b-button>
      </div>

      <!-- Scroll to top -->
      <b-button
        v-show="scrollY > 300"
        size="lg"
        variant="toTop"
        class="scroll-to-top"
        title="Scroll to Top"
        @click="toTop"
      >
        <b-icon icon="arrow-up"/>
      </b-button>

      <!-- Footer -->
      <Footer />
    </div>
  </b-container>
</template>

<script>
import axios from 'axios';
import { POKEMON_LOADEDPAGES_SESSION, SAD_COUNT, SAD_FORMAT, SAD_IMG, SEARCH_API } from '../resources/constants';
import PokeCard from '../components/Search/PokeCard.vue';
import Footer from '../components/general/Footer.vue';
import Loading from '../components/general/Loading.vue';
import SearchBar from '../components/Search/SearchBar.vue';

export default {
  name: 'Search',
  components: {
    SearchBar,
    PokeCard,
    Footer,
    Loading
  },
  computed: {
    // From established query settings, sort/filter pokemon accordingly
    filteredMons() {
      const q = this.queryObj.query;
      if (!q) return this.pokemon;
      return this.pokemon.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())
        || p.id.toString().toLowerCase().includes(q.toLowerCase())
        || p.types.toString().toLowerCase().includes(q.toLowerCase()));
    }
  },
  methods: {
    // Fetch Pokemon search data resource
    fetchMons() {
      const vm = this;
      vm.loading = true;
      axios.get(SEARCH_API)
        .then((response) => {
          vm.pokemon = response.data;
          vm.loading = false;
        })
        .catch((error) => {
          alert('Could not get data :(');
          console.error(error);
          vm.loading = false;
        });
    },

    // Update query object (called from SearchBar component)
    updateQueryObject(val) {
      this.queryObj = val;
      this.sortMons();
    },

    // Sort Pokemon based on sortProperty and sortAscending
    sortMons() {
      const qObj = this.queryObj;
      const doSort = this.pokemon.sort((a, b) => (a[qObj.sortProperty] > b[qObj.sortProperty]) - (a[qObj.sortProperty] < b[qObj.sortProperty]));
      qObj.sortAscending ? doSort : doSort.reverse();
    },

    // Mount # of loaded pages from session, else set pages loaded to 1
    mountLoadedPages() {
      if (sessionStorage.getItem(POKEMON_LOADEDPAGES_SESSION)) {
        this.pagesLoaded = parseInt(sessionStorage.getItem(POKEMON_LOADEDPAGES_SESSION));
      } else {
        this.pagesLoaded = 1;
      }
    },

    // Set pagesLoaded to numberOfPages
    // (pagesLoaded++ to load a new page, or 1 to reset pagesLoaded)
    loadPages(numberOfPages) {
      this.pagesLoaded = numberOfPages;
      sessionStorage.setItem(POKEMON_LOADEDPAGES_SESSION, numberOfPages);
    },

    // Set scroll position with a debounce
    handleScroll() {
      if (this.scrollTimer) return;
      this.scrollTimer = setTimeout(() => {
        this.scrollY = window.scrollY;
        clearTimeout(this.scrollTimer);
        this.scrollTimer = 0;
      }, 10);
    },

    // Scroll to top of page
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },

    // Randomly select (1-3) a photo of pikachu being sad :(
    getSadPikachuImg() {
      return SAD_IMG + (Math.floor(Math.random() * SAD_COUNT) + 1).toString() + SAD_FORMAT;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.sadPikachuImg = this.getSadPikachuImg;
    this.mountLoadedPages();
    this.fetchMons();
    this.sortMons();
  },
  data() {
    return {
      queryObj: {},
      pokemon: [],
      loading: false,
      pagesLoaded: 1,
      perPage: 24,
      scrollTimer: 0,
      scrollY: 0,
      sadPikachuImg: ''
    };
  },
};
</script>

<style lang="scss">
@import '@/assets/custom.scss';

.poke-container {
  color: var(--text-color) !important;
  background: var(--bg-color) !important;
}

.p-logo {
  display: inherit;
  font-size: 90px;
  color: $primary;
}

.p-no-results {
  margin: 20vh auto;
  text-align: center;
  img {
    border-radius: 10px;
  }
}

.scroll-to-top {
  position: fixed;
  bottom: 5%;
  right: 5%;
}

// Mobile View
@media screen and (max-width: 789px) {
  .p-logo {
    display: none
  }
}
</style>
