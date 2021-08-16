<template>
  <div class="view">
    <div>Viewing Pokemon # {{ pID }}</div>
  </div>
</template>

<script>

export default {
  name: 'View',
  props: {
    id: String
  },
  setup(props) {
    return {
      pID: props.id
    }
  }
}
</script>

<style lang="scss">
</style>