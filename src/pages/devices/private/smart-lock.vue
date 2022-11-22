<template>
  <SmartLockComponent :blockchain="blockchain"/>
</template>

<script>
import SmartLockComponent from '@/components/devices/smart-lock.vue';
export default {
  name: 'SmartLockPagePrivate',
  layout: 'auth',
  components: { SmartLockComponent },
  data(){
    return {
      blockchain: 'Private'
    }
  }
}
</script>
