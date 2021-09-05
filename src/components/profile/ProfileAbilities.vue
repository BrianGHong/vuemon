<template>
  <div v-if="abilities && Object.entries(abilities).length > 0" class="w-75 p-pab-card">

    <b-row class="justify-content-center">
      <h2>Abilities</h2>
    </b-row>

    <!-- One card per ability -->
    <b-card
      v-for="ability in abilities && Object.entries(abilities)"
      :key="ability[0].toString()"
      no-body
      :style="`background: ${$utils.getTypeColor(type)}; border-color: ${$utils.getTypeColor(type)}`"
      class="mb-1 "
    >
      <b-card-header header-tag="header" class="p-1" role="tab">
        <!-- Toggle Button -->
        <b-button block v-b-toggle="`${ability[0]}-1`" class="w-100 title"
          :style="`background: ${$utils.getTypeColor(type)}; border-color: ${$utils.getTypeColor(type)}`"
        >
          {{ $utils.formatString(ability[0]) }}
          <b-icon icon="caret-down-fill" class="float-right"/>
        </b-button>
      </b-card-header>

      <!-- Collapsible Description -->
      <b-collapse :id="`${ability[0]}-1`" :accordion="`${ability[0]}-1`" role="tabpanel">
        <b-card-body class="p-4">
          <b-card-text class="desc">{{ ability[1] }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'ProfileAbilities',
  props: {
    type: String,
    abilities: Object
  }
}
</script>

<style lang="scss">
@import '@/assets/custom.scss';


.p-pab-card {
  .card {
    border-radius: 30px !important;
    background: var(--bg-color) !important;
    color: var(--text-color) !important;
  }

  .card-header {
    border-radius: 30px !important;
  }

  .title {
    font-weight: bold;
    font-size: 20px;
  }

  .desc {
    font-size: 17px;
  }
}
</style>