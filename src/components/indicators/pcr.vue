<template>
    <VueApexCharts :type="graphic.type" :options="graphic.chartOptions" :series="series"></VueApexCharts>
</template>
<script>
import { firestore } from '~/plugins/firebase.js'
import { collection, onSnapshot, query, where, orderBy } from '@firebase/firestore'
export default {
  name: 'PCR',
  data() {
    return {
      graphic:{
        chartOptions: {
          chart: {
            id: 'pcr',
            width: '100%'
          },
          title:{
            text: 'PCR en las transacciones',
            align: 'center'
          },
          xaxis: {
            categories: [],
            title:{
              text: 'Transacciones'
            },
            position: 'bottom',
            offsetY: 70,
            labels:{
              show: false,
              format: 'dd/MM/YYYY hh:mm', 
            },
            tooltip: {
              enabled: false,
            }
          },
          yaxis: {
            title:{
              text: '% de recursos de la CPU'
            }
          },
          stroke: {
            curve: 'smooth',
          }
        },
        series: [{
          name: '% de recursos de la CPU',
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }],
        type: 'line'
      },
      items: []
    }
  },
  computed:{
    series(){
      let _this = this
      this.items.map((x) => {
          x.x = _this.transformDate(x.created_at),
          x.y = Number(x.pcr.toFixed(2))
      })
      return [{
          name: 'PCR - Private',
          data: this.items.filter(x => x.blockchain_type == 'Private')
      },
      {
          name: 'PCR - Public',
          data: this.items.filter(x => x.blockchain_type == 'Public')
      }]
    }
  },
  methods: {
    async getTransactions(){
      const transactionsQuery = query(
        collection(firestore, 'transactions'),
        orderBy("created_at")
      )
      onSnapshot(transactionsQuery, (querySnapShot) => {
        this.items = querySnapShot.docs.map((e) => {
          return {
            ...e.data(),
            id: e.id
          }
        })
      })
    },
    transformDate(param){
      let millis = param.toMillis()
      let date = new Date(millis)
      return this.$moment(date).format('DD/MM/YYYY [|] hh:mm:ss')
    }
  },
  async mounted(){
    await this.getTransactions()
  }
}
</script>