<template>
  <b-card
    class="poke-card my-3 ml-3 hvr-bounce-to-right"
    :id="id"
    @click="gotoProfile"
  >
    <b-row no-gutters>
      <!-- Profile Photo -->
      <b-col sm="3" cols="4">
        <img
          :style="'border-color: ' + $utils.getTypeColor(types[0])"
          :src="img"
          alt="Image"
          class="p-card-img"
          @error="altImage"
        />
      </b-col>
      <!-- ID, name, and types -->
      <b-col class="ml-2 py-2">
        <h5 class="mb-0">#{{ id.toString().padStart(3, '0') }}</h5>
        <h1 class="mb-0" v-bind:class="{'shrink-font': name.length > fontNameCutoff}">{{ $utils.formatString(name) }}</h1>
        <div>
          <TypeBadge
            v-for="type in types"
            :key="type.toString()"
            :type="type"
            :large="false"
          />
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { NOT_FOUND_IMG } from '../../resources/constants';
import TypeBadge from '../general/TypeBadge.vue';

export default {
  name: 'PokeCard',
  components: {
    TypeBadge
  },
  props: {
    id: Number,
    name: String,
    types: Array,
    img: String,
  },
  data() {
    return {
      fontNameCutoff: 13
    }
  },
  methods: {
    gotoProfile() {
      this.$router.push(`/profile/${this.id}`)
    },
    altImage(event) {
      event.target.src = NOT_FOUND_IMG;
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/custom.scss';
@import '@/assets/card-transition.scss';
$bg-img: "../../assets/pokeball_gray.png";
$cardWidth: 400px;
$cardWidthMobile: 90%;
$imgWidth: 120px;
$imgWidthMobile: 90px;

// Override Bootstrap
.card-body {
  padding: 0 !important;
}

// Card itself
.poke-card {
  width: $cardWidth;
  height: $imgWidth;
  min-width: $cardWidth !important;

  // Pokeball
  background-image: url($bg-img) !important;
  background-repeat: no-repeat;
  background-position: right;

  background-color: var(--card-bg-color) !important;
  border-color: var(--card-border-color) !important;
  h1, h4 {
    color: var(--text-color) !important;
  }
}

.poke-card:hover {
  cursor: pointer;
}

.p-card-img {
  // Frame
  border: 5px solid;
  border-radius: 20px !important;
  box-shadow: 2px 5px 2px rgba(0, 0, 0, 0.493);
  background: var(--bg-color) !important;

  // Size
  height: $imgWidth !important;
  width: $imgWidth !important;

  // Offset
  position: absolute;
  top: -10px;
  left: -10px;
}

.shrink-font {
  font-size: 25px !important;
}

@media screen and (max-width: $sm) {
  .card-body {
    padding: 5px !important;
    h1 {
      font-size: 25px !important;
    }
  }
  .poke-card {
    min-width: $cardWidthMobile !important;
    width: $cardWidthMobile;
    height: 120px;
  }
  .p-card-img {
    // Size
    width: $imgWidthMobile !important;
    height: $imgWidthMobile !important;

    // Offset
    position: absolute;
    top: 10px;
    left: -15px;
  }
}
</style>
