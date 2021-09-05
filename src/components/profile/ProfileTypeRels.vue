<template>
  <div class="mx-auto text-center">

    <!-- Resistant to -->
    <span v-if="typeRels && typeRels.resistantTo.length > 0">
      <h3 class="mb-0">Strong against</h3>
      <TypeBadge
        v-for="type in typeRels && typeRels.resistantTo"
        :key="type.toString()"
        :type="type"
        :large="true"
      /><br><br>
    </span>

    <!-- Weak to -->
    <span v-if="typeRels && typeRels.weakTo.length > 0">
      <h3 class="mb-0">Weak to</h3>
      <TypeBadge
        v-for="type in typeRels && typeRels.weakTo"
        :key="type.toString()"
        :type="type"
        :large="true"
      />
    </span>
  </div>
</template>

<script>
import TypeBadge from '../general/TypeBadge.vue';

export default {
  name: 'ProfileTypeRels',
  props: {
    typeRels: Object
  },
  components: {
    TypeBadge
  }
}
</script>

<style lang="scss">
@import '@/assets/custom.scss';

.strongto {
  font-weight: bold;
  color: rgb(11, 219, 105);
}

.weakto {
  font-weight: bold;
  color: rgb(228, 78, 32);
}

</style>