<template>
  <div class="p-pstats-table">
    <b-table-simple small borderless>
      <!-- Iterate one row per stat -->
      <b-tr
        v-for="stat in statsArray"
        :key="stat && stat.toString()"
      >
        <!-- Title -->
        <b-td class="w-25 text-right">
          <h4 v-b-tooltip.hover.right :title="stat[2] ? stat[2] : stat[0]">{{stat[0]}}</h4>
        </b-td>

        <!-- Bar -->
        <b-td>
          <b-progress :max="max" height="2rem" class="w-100">
            <b-progress-bar
              :value="stat[1]"
              :style="'background-color: ' + $utils.getTypeColor(type) + ' !important'"
            >
              <h6 class="mb-0">{{ stat[1] }}</h6>
            </b-progress-bar>
          </b-progress>
        </b-td>
      </b-tr>
    </b-table-simple>
  </div>
</template>

<script>
export default {
  name: 'ProfileStats',
  props: {
    type: String,
    statsArray: Array
  },
  data() {
    return {
      max: 255
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/custom.scss';

.p-pstats-table {
  h4 {
    color: var(--text-color) !important;
  }
  .progress {
    background: var(--progress-bg-color) !important;
  }

  tr {
    background: none !important;
  }
}

</style>