<template>
    <v-row>
      <v-col cols="12" :sm="12" :md="6">
        <PrivateBlockchain/>
      </v-col>
      <v-col cols="12" :sm="12" :md="6">
        <PublicBlockchain/>
      </v-col>
      <v-col cols="12" :sm="12" :md="6">
        <Pcr/>
      </v-col>
      <v-col cols="12" :sm="12" :md="6">
        <Efficacy/>
      </v-col>
    </v-row>
</template>
  
<script>
import PrivateBlockchain from '@/components/indicators/private-blockchain'
import PublicBlockchain from '@/components/indicators/public-blockchain'
import Pcr from '@/components/indicators/pcr'
import Efficacy from '@/components/indicators/efficacy'
export default {
    name: 'DashboardPage',
    layout: 'auth',
    components: {
      PrivateBlockchain,
      PublicBlockchain,
      Pcr,
      Efficacy
    }
}
</script>
  