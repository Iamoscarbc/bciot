<template>
  <SmartLightComponent :blockchain="blockchain"/>
</template>

<script>
import SmartLightComponent from '@/components/devices/smart-light.vue';
export default {
  name: 'SmartLightPage',
  layout: 'auth',
  components: { SmartLightComponent },
  data(){
    return {
      blockchain: 'Private'
    }
  }
}
</script>
