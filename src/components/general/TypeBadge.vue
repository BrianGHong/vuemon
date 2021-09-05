<template>
  <b-badge
    v-bind:class="{ 'large-override': large }"
    class="type-badge mx-1"
    :style="'color: white; background:' + $utils.getTypeColor(type)"
    pill
  >{{ type.toUpperCase() }}</b-badge>
</template>

<script>
export default {
  name: 'TypeBadge',
  props: {
    type: String,
    large: Boolean
  },
}
</script>

<style lang="scss">
@import '@/assets/custom.scss';

.large-override {
  margin: 10px 5px !important;
  padding: 10px 30px !important;
  font-size: 20px !important;
}

@media screen and (max-width: $sm) {
  .type-badge {
    font-size: 10px !important;
  }
}
</style>