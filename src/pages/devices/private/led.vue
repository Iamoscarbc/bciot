<template>
  <LEDComponent :blockchain="blockchain"/>
</template>

<script>
import LEDComponent from '@/components/devices/led.vue';
export default {
  name: 'LEDPage',
  layout: 'auth',
  components: { LEDComponent },
  data(){
    return {
      blockchain: 'Private'
    }
  }
}
</script>
