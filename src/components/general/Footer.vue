<template>
  <div>
    <hr/>
    <div class="p-footer-disc px-4 text-center">
      <Disclaimer />
    </div>
    <br>
  </div>
</template>

<script>
import Disclaimer from '../general/Disclaimer.vue';

export default {
  name: 'Footer',
  components: {
    Disclaimer
  }
}
</script>
