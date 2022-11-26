<template>
    <VueApexCharts :type="graphic.type" :options="graphic.chartOptions" :series="series"></VueApexCharts>
</template>
<script>
import { firestore } from '~/plugins/firebase.js'
import { collection, onSnapshot, query, where, orderBy } from '@firebase/firestore'
export default {
  name: 'PublicBlockchain',
  data() {
    return {
      graphic:{
        chartOptions: {
          chart: {
            id: 'public-blockchain',
            width: '100%'
          },
          title:{
            text: 'TIV - Blockchain Pública',
            align: 'center'
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
            title:{
              text: 'Transacciones'
            }
          },
          yaxis: {
            title:{
              text: 'Tiempo (segundos)'
            }
          },
          stroke: {
            curve: 'stepline',
          }
        },
        series: [{
          name: 'Tiempo (segundos)',
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }],
        type: 'area'
      },
      items: []
    }
  },
  computed:{
    series(){
      let _this = this
      this.items.map((x) => {
          x.x = _this.transformDate(x.created_at),
          x.y = Number(x.duration.toFixed(2))
      })
      return [{
          name: 'Duration',
          data: this.items
      }]
    }
  },
  methods:{
    async getTransactions(){
      const transactionsQuery = query(
        collection(firestore, 'transactions'),
        where("blockchain_type", "==", "Public"),
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