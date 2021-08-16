<template>
  <div class="search">
    <!-- SEARCH BAR -->
    <input type="text" v-model="query" />
    <!-- SORT BY PROPERTY -->
    <label>Sort by:</label>
    <select name="sortby" id="sort" v-model="sortProperty" @change="sortMons">
      <option v-for="prop in allSortProperties" :key="prop.value" :value="prop.value">{{prop.label}}</option>
    </select>
    <!-- ASC OR DESC -->
    <button @click="toggleAscDesc">{{ sortAscending ? 'ASC' : 'DESC'}}</button>

    <!-- SEARCH RESULTS -->
    <i v-if="loading">Loading...</i>
    <ul>
      <li
        v-for="mon in filteredMons.slice(0,perPage * pagesLoaded)"
        @click="viewMon(mon.id)"
        :key="mon.id"
      >#{{ mon.id }} - {{ mon.name }} - {{ mon.types }}</li>
    </ul>
    <button
      v-if="(perPage * pagesLoaded) < filteredMons.length"
      @click="pagesLoaded++"
    >Load more...</button>
  </div>
</template>

<script>
import axios from 'axios';
import { SEARCH_API } from '../resources/constants';

export default {
  name: 'Search',
  components: {

  },
  computed: {
    // Filter Pokemon based on passed in query
    filteredMons() {
      const q = this.query;
      if (!q) return this.pokemon;
      return this.pokemon.filter(p =>
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.id.toString().toLowerCase().includes(q.toLowerCase()) ||
        p.types.toString().toLowerCase().includes(q.toLowerCase())
      );
    }
  },
  methods: {
    // Fetch Pokemon search data as of 8/16/2021
    fetchMons() {
      let vm = this;
      vm.loading = true;
      axios.get(SEARCH_API)
        .then(response => {
          vm.pokemon = response.data;
          vm.loading = false;
        })
        .catch(error => {
          alert('Could not get data :(');
          console.error(error);
          vm.loading = false;
        });
    },
    // Sort Pokemon based on sortProperty and sortAscending
    sortMons() {
      const doSort = this.filteredMons.sort((a, b) => (a[this.sortProperty] > b[this.sortProperty]) - (a[this.sortProperty] < b[this.sortProperty]));
      if (this.sortAscending)
        doSort;
      else
        doSort.reverse();
    },
    // Toggle Ascending/Descending for sorts
    toggleAscDesc() {
      const previous = this.sortAscending;
      this.sortAscending = !previous;
      this.sortMons();
    },
    // View Pokemon
    viewMon(id) {
      this.$router.push(`/view/${id}`);
    }
  },
  mounted() {
    this.fetchMons();
  },
  data() {
    return {
      query: '',
      pokemon: [],
      sortAscending: true,
      sortProperty: 'id',
      allSortProperties: [
        { label: 'Number', value: 'id' },
        { label: 'Name', value: 'name' },
        { label: 'Type', value: 'types' }
      ],
      loading: false,
      perPage: 25,
      pagesLoaded: 1
    }
  }
}
</script>

<style lang="scss">
label {
  margin: 0 2px 0 10px;
}
li:hover {
  color: red;
  cursor: pointer;
}
</style>