<template>
  <b-card no-body class="overflow-hidden p-pev-card hvr-bounce-to-right" @click="gotoProfile">
    <b-row no-gutters>

      <!-- Profile Photo -->
      <b-col sm="6">
        <b-card-img :src="img" alt="img" class="p-pev-card-img p-pev-card-center-img"></b-card-img>
      </b-col>

      <!-- Information Sidebar/Bottombar Overlay -->
      <b-col sm="6" class="p-2 p-pev-card-info" :style="`background: ${$utils.getTypeColor(types[0])}C1`">
        <b-card-text class="mb-0 p-pev-card-id">#{{id.toString().padStart(3, '0')}}</b-card-text>
        <b-card-body :title="$utils.formatString(name)">
          <TypeBadge
            v-for="type in types"
            :key="type.toString()"
            :name="type.toString()"
            :type="type"
            :large="false"
          />
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import TypeBadge from '../general/TypeBadge.vue';

export default {
  name: 'ProfileEvolutionCard',
  props: {
    id: String,
    currentID: String,
    name: String,
    img: String,
    types: Array
  },
  components: {
    TypeBadge
  },
  methods: {
    // Have card redirect user to provided pokemon's profile on click
    gotoProfile() {
      if (this.id !== this.currentID) {
        this.$router.push('/profile/' + this.id)
      } else {
        console.log('ALREADY ON PAGE');
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/custom.scss';
$imgWidth: 150px;
$imgWidthMobile: 80px;

.p-pev-card {
  background: var(--card-bg-color) !important;
  border-color: var(--card-border-color) !important;

  .p-pev-card-img {
    height: $imgWidth;
    width: $imgWidth;
  }
  h4 {
    font-size: 18px !important;
    margin-bottom: 0;
  }
  .p-pev-card-info {
    color: white;
  }
}
.p-pev-card:hover {
  cursor: pointer;
}

@media screen and (max-width: $md) {
  .p-pev-card {
    .p-pev-card-img {
      height: $imgWidthMobile;
      width: $imgWidthMobile;
    }
    .p-pev-card-center-img {
      display: block;
      margin: 0 auto;
    }
    .p-pev-card-id {
      font-size: 8px;
    }
    h4 {
      font-size: 15px !important;
    }
    .p-pev-card-info {
      color: white;
    }
  }
}
</style>
