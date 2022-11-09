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
    },
    data() {
      return {
        graphic2:{
          chartOptions: {
            chart: {
              id: 'vuechart-example',
              width: '100%'
            },
            title:{
              text: 'Graphic 2',
              align: 'center'
            },
            xaxis: {
              categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
              title:{
                text: 'Cantidad de cosas'
              }
            },
            yaxis: {
              title:{
                text: 'Cantidad de otras cosas'
              }
            }
          },
          series: [{
            name: 'series-1',
            data: [30, 40, 45, 50, 49, 60, 70, 91]
          }]
        }
      }
    }
}
</script>
  