<template>
  <div :class="{ loader: true, fadeout: !isLoading }">
    <b-spinner label="Spinning" class="spinner" />
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    isLoading: Boolean,
    variant: String
  }
}
</script>

<style lang="scss">
@import '@/assets/custom.scss';
$spinnerWidth: 3rem;
$bg-z-index: 999999;

.spinner {
  z-index: $bg-z-index + 1;
  margin: auto;
  color: $primary !important;
  width: $spinnerWidth !important;
  height: $spinnerWidth !important;
}

.loader {
  z-index: $bg-z-index;
  background: var(--bg-color) !important;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  overflow: hidden;
  position: fixed;
  text-align: center;
}

.fadeout {
  animation: fadeout 1s forwards;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}

</style>