<template>
  <b-container class="profile-container min-100" fluid="md">
    <!-- Loading -->
    <Loading :isLoading="loading"/>

    <div v-if="!loading">
      <!-- Navigate Back -->
      <div @click="$router.go(-1)" class="p-back-button">
        <b-icon icon="arrow-left-circle-fill" />
      </div>
      <!-- Navigate to Search Page -->
      <div @click="$router.push('/')" class="p-search-button">
        <b-icon icon="house-fill" />
      </div>

      <!-- Render photo, id, name, types, and description -->
      <ProfileHeader
        :id="pokeData.id"
        :name="pokeData.name"
        :img="pokeData.img"
        :types="pokeData.types"
        :desc="pokeData.description && pokeData.description.text"
      /><br>

      <!-- DESKTOP VIEW -->
      <div class="p-profile-body desktop-container">
        <b-row>
          <b-col cols="6">
            <ProfileStats
              :type="pokeData.types && pokeData.types[0]"
              :statsArray="pokeData.stats && [
                ['HP', pokeData.stats.hp],
                ['Attack', pokeData.stats.attack],
                ['Defense', pokeData.stats.defense],
                ['Speed', pokeData.stats.speed],
                ['SpATK', pokeData.stats.specialAttack, 'Special Attack'],
                ['SpDEF', pokeData.stats.specialDefense, 'Special Defense'],
              ]"
            />
          </b-col>
          <b-col cols="6">
            <ProfileInfo
              :type="pokeData.types && pokeData.types[0]"
              :height="pokeData.height"
              :weight="pokeData.weight"
              :gender="pokeData.gender"
              :category="pokeData.genera"
              :eggGroups="pokeData.eggGroups"
              :hatchCounter="pokeData.hatchCounter"
            />
          </b-col>
        </b-row>
        <b-row>
          <ProfileTypeRels
            :typeRels="pokeData.type_relations"
          />
        </b-row>
        <b-row class="justify-content-center my-4">
          <ProfileAbilities
            :type="pokeData.types && pokeData.types[0]"
            :abilities="pokeData.abilities"
          />
        </b-row>
        <b-row class="justify-content-center my-4">
          <ProfileEvolutions
            :id="id"
            :type="pokeData.types && pokeData.types[0]"
            :evolutions="pokeData.evolution"
          />
        </b-row>
        <b-row class="justify-content-center my-4">
          <ProfileForms
            :type="pokeData.types && pokeData.types[0]"
            :forms="pokeData.forms"
          />
        </b-row>
      </div>
      <!-- MOBILE VIEW -->
      <div class="p-profile-body-mobile mobile-container mb-5">
        <b-tabs content-class="mt-3"
          v-model="tabIndex"
          fill
        >
          <b-tab title="General" :title-link-class="linkClass(0)" active>
            <ProfileInfo
              :type="pokeData.types && pokeData.types[0]"
              :height="pokeData.height"
              :weight="pokeData.weight"
              :gender="pokeData.gender"
              :category="pokeData.genera"
              :eggGroups="pokeData.eggGroups"
              :hatchCounter="pokeData.hatchCounter"
            />
            <b-row class="justify-content-center">
              <ProfileAbilities
                :type="pokeData.types && pokeData.types[0]"
                :abilities="pokeData.abilities"
              />
            </b-row>
          </b-tab>
          <b-tab title="Stats" :title-link-class="linkClass(1)">
            <ProfileStats
              :type="pokeData.types && pokeData.types[0]"
              :statsArray="pokeData.stats && [
                ['HP', pokeData.stats.hp],
                ['Attack', pokeData.stats.attack],
                ['Defense', pokeData.stats.defense],
                ['Speed', pokeData.stats.speed],
                ['SpATK', pokeData.stats.specialAttack, 'Special Attack'],
                ['SpDEF', pokeData.stats.specialDefense, 'Special Defense'],
              ]"
            />
            <ProfileTypeRels
              :typeRels="pokeData.type_relations"
            />
          </b-tab>
          <b-tab title="Forms" :title-link-class="linkClass(2)">
            <ProfileEvolutions
              :id="id"
              :type="pokeData.types && pokeData.types[0]"
              :evolutions="pokeData.evolution"
            />
            <ProfileForms
              :type="pokeData.types && pokeData.types[0]"
              :forms="pokeData.forms"
            />
          </b-tab>
        </b-tabs>
      </div>
      <Footer />
    </div>
  </b-container>
</template>

<script>
import axios from 'axios';
import { POKEMON_PROFILE_SESSION, PROFILE_API, PROFILE_API_FORMAT } from '../resources/constants';
import ProfileHeader from '../components/profile/ProfileHeader.vue';
import ProfileInfo from '../components/profile/ProfileInfo.vue';
import ProfileStats from '../components/profile/ProfileStats.vue';
import ProfileTypeRels from '../components/profile/ProfileTypeRels.vue';
import ProfileEvolutions from '../components/profile/ProfileEvolutions.vue';
import ProfileAbilities from '../components/profile/ProfileAbilities.vue';
import ProfileForms from '../components/profile/ProfileForms.vue';
import Footer from '../components/general/Footer.vue';
import Loading from '../components/general/Loading.vue';

export default {
  name: 'Profile',
  props: {
    id: String,
  },
  components: {
    ProfileHeader,
    ProfileInfo,
    ProfileStats,
    ProfileTypeRels,
    ProfileEvolutions,
    ProfileAbilities,
    ProfileForms,
    ProfileInfo,
    Footer,
    Loading
  },
  data() {
    return {
      loading: false,
      pokeData: {},
      tabIndex: 0
    };
  },
  methods: {
    fetchMon() {
      const vm = this;
      vm.loading = true;
      // In case of error, navigate to home
      const errorCase = (errorMsg) => {
        console.error(errorMsg);
        this.$router.push('/');
      };
      // Fetch data of Pokemon of id
      // Load from local storage if available, fetch from api otherwise
      const sessionPokeProfile = JSON.parse(sessionStorage.getItem(POKEMON_PROFILE_SESSION + this.id));
      if (sessionPokeProfile) {
        vm.pokeData = sessionPokeProfile;
        vm.loading = false;
      } else {
        axios.get(PROFILE_API + vm.id + PROFILE_API_FORMAT)
          .then((response) => {
            vm.pokeData = response.data;
            vm.loading = false;
          }).catch(errorCase);
      }
    },
    // Mobile tab styles
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return [`bg-${this.pokeData.types && this.pokeData.types[0]}`, 'text-white']
      } else {
        return [`text-${this.pokeData.types && this.pokeData.types[0]}`, 'bold']
      }
    }
  },
  mounted() {
    window.scrollTo(top);
    this.fetchMon();
  },
};
</script>

<style lang="scss">
@import '@/assets/custom.scss';

.profile-container {
  background: var(--bg-color) !important;
}

.desktop-container {
  display: inherit;
}

.mobile-container {
  display: none;
}

.bold {
  font-weight: bold !important;
}

.p-back-button {
  display: none;
}

.p-search-button {
  position: absolute;
  top: 0px;
  font-size: 26px;
  color: rgb(255, 255, 255);
}

.p-back-button:hover {
  cursor: pointer;
}

.p-search-button:hover {
  cursor: pointer;
}

// Mobile View
@media screen and (max-width: $md) {
  .desktop-container {
    display: none;
  }

  .mobile-container {
    display: inherit;
  }

  .p-back-button {
    display: inherit;
    color: white;
    font-size: 28px;
    position: absolute;
    top: 10px;
    left: 15px;
  }

  .p-search-button {
    position: absolute;
    top: 10px;
    right: 15px;
  }

}
</style>
