<template>
  <div class="col p-search-bar mt-4">

    <!-- Search Input -->
    <div class="row justify-content-center">
      <label class="position-relative d-block">
        <b-icon
          icon="search"
          class="position-absolute h-100 text-muted ml-4"
        ></b-icon>
        <b-form-input
          class="p-search-input m-1"
          style="padding-left: 40px;"
          size="lg"
          type="text"
          v-model="queryValue"
          placeholder="Search Pokemon..."
        ></b-form-input>
      </label>
    </div>
    <div class="row justify-content-center">

      <!-- Sort dropdown -->
      <b-dropdown
        id="sort"
        name="sortby"
        variant="sort"
        class="m-1"
      >
        <template #button-content>
          <b-icon icon='filter' />
          <span class="mobile-hide">
            Sort by:
          </span>
          {{ getSortPropertyLabel }}
        </template>
        <b-dropdown-item
          v-for="sort in this.allSortProperties"
          :key="sort.value"
          :value="sort.value"
          @click="updateSortProperty(sort.value)"
        >{{ sort.label }}</b-dropdown-item>
      </b-dropdown>

      <!-- Sort by order -->
      <b-button
        variant="order"
        class="m-1"
        @click="updateSortOrder"
      >
        <b-icon :icon="queryObj.sortAscending ? 'sort-up' : 'sort-down'" />
        {{ queryObj.sortAscending ? 'ASC' : 'DESC'}}
      </b-button>

      <!-- Reset queries -->
      <b-button
        variant="reset"
        class="m-1"
        @click="resetQuery"
      >
        <b-icon icon="arrow-clockwise" />
        <span class="mobile-hide">Reset to Defaults</span>
      </b-button>

      <!-- Settings -->
      <b-button
        v-b-modal.settings-modal
        variant="settings"
        class="m-1"
      >
        <b-icon icon="gear" />
      </b-button>
    </div><br>

    <!-- Options Modal -->
    <b-modal
      id="settings-modal"
      header-bg-variant="primary"
      hide-footer
    >
      <SettingsModal />
    </b-modal>
  </div>
</template>

<script>
import { POKEMON_QUERY_SESSION } from '../../resources/constants';
import SettingsModal from '../general/SettingsModal.vue';

export default {
  name: 'SearchBar',
  components: {
    SettingsModal
  },
  watch: {
    // Update query object in Search on change
    queryObj: {
      handler(val) {
        sessionStorage.setItem(POKEMON_QUERY_SESSION, JSON.stringify(val));
        this.$emit('updateQueryObject', val);
      },
      deep: true
    }
  },
  computed: {
    // Fetch sort (human readable) property label based on property value
    getSortPropertyLabel() {
      const prop = this.allSortProperties.filter(sort => sort.value === this.queryObj.sortProperty)[0];
      return prop && prop.label;
    },
    // Check for updates to query string
    queryValue: {
      // Set to be "human-readable", first letters capital'd, space separated
      get() {
        return this.queryObj
          && this.queryObj.query
          && this.queryObj.query.split("-").map(word => word[0].toUpperCase() + word.substring(1)).join(" ");
      },
      // Set to be "data-readable", all lowercase '-' separated
      set(newVal){
        this.queryObj.query = newVal.toLowerCase().split(" ").join("-");
      }
    }
  },
  methods: {
    // On mount, if query session object exists, use those values. Else, use defaults
    mountQueryObject() {
      if (sessionStorage.getItem(POKEMON_QUERY_SESSION)) {
        this.queryObj = JSON.parse(sessionStorage.getItem(POKEMON_QUERY_SESSION));
      } else {
        this.queryObj = {...this.qObjDefaults};
      }
    },
    // Updates sort property and reset pages loaded
    updateSortProperty(newSortProperty) {
      this.queryObj.sortProperty = newSortProperty;
      this.$emit('resetPagesLoaded');
    },
    // Updates sort order and reset pages loaded
    updateSortOrder() {
      this.queryObj.sortAscending = !this.queryObj.sortAscending;
      this.$emit('resetPagesLoaded');
    },
    // Reset query object and pages loaded
    resetQuery() {
      this.queryObj = {...this.qObjDefaults};
      sessionStorage.setItem(POKEMON_QUERY_SESSION, {...this.qObjDefaults});
      this.$emit('resetPagesLoaded');
    },
    // Clears EVERYTHING in session (query, data, and loaded pages) for fresh start
    clearCache() {
      sessionStorage.clear();
      location.reload();
    }
  },
  mounted() {
    this.mountQueryObject();
  },
  data() {
    return {
      queryObj: {},
      qObjDefaults: {
        query: '',
        sortAscending: true,
        sortProperty: 'id',
      },
      allSortProperties: [
        { label: 'Number', value: 'id' },
        { label: 'Name', value: 'name' },
        { label: 'Type', value: 'types' },
      ]
    };
  }
}
</script>

<style lang="scss">
@import '@/assets/custom.scss';

.p-search-input {
  width: 600px !important;
  border: 5px solid $primary !important;
  border-radius: 30px !important;
  color: var(--text-color) !important;
  background: var(--bg-color) !important;
}

.modal-body {
  background: var(--bg-color) !important;
}

// Mobile View
@media screen and (max-width: $sm) {
  .p-search-input {
    width: 100% !important;
  }
  .mobile-hide {
    display: none;
  }
}
</style>