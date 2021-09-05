<template>
  <div>
    <!-- Color Background -->
    <b-row
      class="p-pheader-id justify-content-center pt-4"
      :style="'background: ' + $utils.getTypeColor(types && types[0])"
    >
      <!-- ID -->
      <h5>#{{id && id.toString().padStart(3,'0')}}</h5>
    </b-row>

    <!-- Profile Photo (offset, in relation to color bg) -->
    <b-row class="p-pheader-bg justify-content-center">
      <img
        :src="img"
        class="p-pheader-img"
        :style="'border-color: ' + $utils.getTypeColor(types && types[0])"
        @error="altImage"
      />
    </b-row>

    <!-- Below Color Background -->
    <div>

      <!-- Name -->
      <b-row class="p-pheader-info justify-content-center">
        <h1>{{$utils.formatString(name)}}</h1>
      </b-row>

      <!-- Badges -->
      <b-row class="justify-content-center">
        <TypeBadge
          v-for="type in types"
          :key="type.toString()"
          :type="type"
          :large="false"
        />
      </b-row><br>

      <!-- Description -->
      <b-row class="px-4 justify-content-center">
        <h5>{{$utils.replaceNewLineChars(desc)}}</h5>
      </b-row>
    </div>
  </div>
</template>

<script>
import { NOT_FOUND_IMG } from '../../resources/constants';
import TypeBadge from '@/components/general/TypeBadge.vue';

export default {
  name: 'ProfileHeader',
  props: {
    id: Number,
    name: String,
    img: String,
    types: Array,
    desc: String
  },
  components: {
    TypeBadge
  },
  methods: {
    // In case of img 404, replace with a "not-found" placeholder
    altImage(event) {
      event.target.src = NOT_FOUND_IMG;
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/custom.scss';
$bg-img: "../../assets/pokeball.png";
$pfpWidth: 200px;
$pfpOffset: 50px;

.dropdown-menu {
  background: var(--bg-color) !important;
}

.dropdown-item {
  color: var(--text-color) !important;
}

// ID Banner and Background
.p-pheader-id {
  color: white;
  height: $pfpWidth;
  border-radius: 0 0 20px 20px;
}

// Profile Image
.p-pheader-img {
  height: $pfpWidth;
  width: $pfpWidth;

  border: 5px solid;
  border-radius: 30px;
  background: var(--bg-color) !important;

  position: absolute;
  top: $pfpOffset;
}

// Name, Types, and Description
.p-pheader-info {
  margin-top: $pfpOffset + 10px;
  h1 {
    font-size: 50px;
  }
}

</style>