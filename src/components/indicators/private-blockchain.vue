<template>
    <VueApexCharts ref="graphicPrivateBlockchain" :type="graphic.type" :options="graphic.chartOptions" :series="series"></VueApexCharts>
</template>
<script>
import { firestore } from '~/plugins/firebase.js'
import { collection, onSnapshot, query, where, orderBy } from '@firebase/firestore'
export default {
  name: 'PrivateBlockchain',
  data() {
    return {
      graphic:{
        chartOptions: {
          chart: {
            id: 'private-blockchain',
            width: '100%'
          },
          title:{
            text: 'TIV - Blockchain Privada',
            align: 'center'
          },
          subtitle:{
            text: 'Promedio: -',
            align: 'center'
          },
          xaxis: {
            categories: [],
            title:{
              text: 'Transacciones'
            },
            labels:{
              format: 'dd/MM/YYYY hh:mm', 
            }
          },
          yaxis: {
            title:{
              text: 'Tiempo (segundos)'
            }
          },
          colors: ['orange'],
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
  watch:{
    items(val){
      if(val.length != 0){
        this.getAverage()
      }
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
        where("blockchain_type", "==", "Private"),
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
    },
    getAverage(){
      let arrDuration = this.items.map(x => x.duration)
      let sum = arrDuration.reduce((a, b) => a + b, 0)
      let average = sum/arrDuration.length
      this.graphic.chartOptions.subtitle.text = `Promedio: ${average.toFixed(2)}`
      this.$refs.graphicPrivateBlockchain.updateOptions(this.graphic.chartOptions, false ,true)
    }
  },
  async mounted(){
    await this.getTransactions()
  }
}
</script>