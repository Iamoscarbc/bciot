<template>
  <SmartLockComponent :blockchain="blockchain"/>
</template>

<script>
import SmartLockComponent from '@/components/devices/smart-lock.vue';
export default {
  name: 'SmartLockPagePublic',
  layout: 'auth',
  components: { SmartLockComponent },
  data(){
    return {
      blockchain: 'Public'
    }
  }
}
</script>
