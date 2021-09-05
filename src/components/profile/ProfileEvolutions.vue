<template>
  <div v-if="formattedEvolutions.length > 0">
    <h2 class="d-flex justify-content-center text-center mb-4">
      Evolutions
    </h2>
    <!-- Each evolution transition (start -> end) occupies one row with two cards -->
    <b-row
      v-for="stage in formattedEvolutions"
      :key="stage[0].id + stage[1].id"
      :name="stage[0].name + stage[1].name"
      class="mb-4"
    >
      <!-- Card 1 -->
      <b-col cols="5">
        <ProfileEvolutionCard
          :id="stage && stage[0].id"
          :currentID="id"
          :name="stage && stage[0].name"
          :img="stage && stage[0].img"
          :types="stage && stage[0].types"
        />
      </b-col>

      <!-- Evolution Arrow -->
      <b-col cols="2">
        <b-row class="h-100 justify-content-center align-self-center">
          <span v-b-tooltip.hover title="Can evolve into" class="my-auto">
            <b-icon icon="arrow-right-circle-fill" class="p-pev-arrow" :style="`color: ${$utils.getTypeColor(type)}`"></b-icon>
          </span>
        </b-row>
      </b-col>

      <!-- Card 2 -->
      <b-col cols="5">
        <ProfileEvolutionCard
          :id="stage && stage[1].id"
          :currentID="id"
          :name="stage && stage[1].name"
          :img="stage && stage[1].img"
          :types="stage && stage[1].types"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ProfileEvolutionCard from './ProfileEvolutionCard.vue';

export default {
  name: 'ProfileEvolutions',
  props: {
    id: String,
    type: String,
    evolutions: Object
  },
  components: {
    ProfileEvolutionCard
  },
  computed: {
    // Given the evolution obj (start, mid, end being arrays of all stages)
    // Parse into tuples of evolution transitions i.e. [stage, next stage]
    // If no evolutions are found, return []
    formattedEvolutions() {
      const evs = this.evolutions;
      if (evs && evs.start && evs.mid && evs.end) {
        let allEvs = [];
        const baseEv = evs.start[0];

        if (evs.mid.length === 0) {
          return []
        } else {
          for (let i in evs.mid) {
            allEvs.push([baseEv, evs.mid[i]]);
            if (evs.end.length > 0) {
              for (let j in evs.end) {
                allEvs.push([evs.mid[i], evs.end[j]])
              }
            }
          }
        }
        return allEvs;
      } else {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/custom.scss';

.p-pev-arrow {
  font-size: 40px;
}

@media screen and (max-width: $md) {
  .p-pev-arrow {
    font-size: 30px;
  }
}
</style>