<template>
  <SmartLockComponent :blockchain="blockchain"/>
</template>

<script>
import SmartLockComponent from '@/components/devices/smart-lock.vue';
export default {
  name: 'SmartLockPage',
  layout: 'auth',
  components: { SmartLockComponent },
  data(){
    return {
      blockchain: 'Public'
    }
  }
}
</script>
