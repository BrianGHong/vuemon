<template>
  <b-table-simple class="p-pinfo-table" small>
    <tr :style="typeBgColor">
      <td><h5>Height:</h5></td>
      <td><h5>{{height}}m</h5></td>
    </tr>
    <tr>
      <td><h5>Weight:</h5></td>
      <td><h5>{{weight}}kg</h5></td>
    </tr>
    <tr :style="typeBgColor">
      <td><h5>Gender:</h5></td>
      <!-- Genderless -->
      <td
        v-if="gender && Object.keys(gender).length === 0"
      ><h5>N/A</h5></td>
      <!-- Genderless -->
      <td
        v-if="gender && gender.hasOwnProperty('genderless')"
      ><h5>Genderless</h5></td>
      <!-- Male/Female -->
      <td
        v-if="gender && gender.hasOwnProperty('male')"
      ><h5>
        ♀ {{gender.female}}%  <span class="ml-2">♂ {{gender.male}}%</span>
      </h5></td>
    </tr>
    <tr>
      <td><h5>Category:</h5></td>
      <td><h5>{{category}}</h5></td>
    </tr>
    <tr :style="typeBgColor">
      <!-- Render egg group if exists, else N/A -->
      <td><h5>Egg Group:</h5></td>
      <td
        v-if="formattedEggGroups.length === 0"
      ><h5>N/A</h5></td>
      <td><h5>{{formattedEggGroups}}</h5></td>
    </tr>
    <tr>
      <td><h5>Hatch Counter:</h5></td>
      <td><h5>{{hatchCounter}}</h5></td>
    </tr>
  </b-table-simple>


</template>

<script>
import { getTypeColor } from '@/resources/utils.js';

export default {
  name: 'ProfileInfo',
  props: {
    type: String,
    height: Number,
    weight: Number,
    gender: Object,
    category: String,
    eggGroups: Array,
    hatchCounter: Number
  },
  computed: {
    // Return egg groups as formatted, comma-separated string
    formattedEggGroups() {
      let capitalizeEG = [];
      for (let i in this.eggGroups) {
        const old = this.eggGroups[i]
        capitalizeEG[i] = old[0].toUpperCase() + old.substring(1);
      }
      return capitalizeEG.join(', ');
    },
    // Calculate BG color based on type with added opacity hex
    typeBgColor() {
      const opacity = '0A'; // hex
      return `background: ${getTypeColor(this.type) + opacity} !important`;
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/custom.scss';
$p-pinfo-fontSize: 17px;
$p-pinfo-padding: 5px 5px;

// General Table Styling
.p-pinfo-table {
  color: var(--text-color) !important;
  tr {
    background: none !important;
  }
  font-size: $p-pinfo-fontSize;
  .d-flex {
    padding: $p-pinfo-padding;
  }
}
</style>