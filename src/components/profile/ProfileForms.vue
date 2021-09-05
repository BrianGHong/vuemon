<template>
  <div v-if="forms && forms.length > 0">
    <h2 class="d-flex justify-content-center">Forms</h2>
    <b-row class="mx-sm-2 justify-content-center">

      <!-- Render one card per form -->
      <b-card
        no-body
        v-for="form in forms"
        :key="Object.entries(form)[0].toString()"
        class="m-2 mb-2 p-1 text-center p-pform-card"
        :style="`border-color: ${$utils.getTypeColor(type)} !important`"
      >
        <!-- Image and Name only -->
        <img class="p-pf-img" :src="Object.entries(form)[0][1]" alt="">
        <p>{{ $utils.formatString(Object.entries(form)[0][0], '_') }}</p>
      </b-card>

    </b-row>
  </div>
</template>

<script>
export default {
  name: 'ProfileForms',
  props: {
    type: String,
    forms: Array
  }
}
</script>

<style lang="scss">
@import '@/assets/custom.scss';

$cardWidth: 120px;
$cardWidthMobile: 100px;

.p-pform-card {
  min-width: $cardWidth;
  max-width: $cardWidth;
  color: var(--text-color) !important;
  background: var(--card-bg-color) !important;
  border: 4px solid !important;
  border-radius: 15px !important;
}

@media screen and (max-width: $md) {
  .p-pform-card {
    min-width: $cardWidthMobile;
    max-width: $cardWidthMobile;
    font-size: 10px;
  }
}
</style>