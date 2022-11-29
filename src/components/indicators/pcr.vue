<template>
    <VueApexCharts ref="graphicPCR" :type="graphic.type" :options="graphic.chartOptions" :series="series"></VueApexCharts>
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
          subtitle:{
            text: 'Promedio Privada: -',
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
          x.y = Number(x.pcr.toFixed(2))
      })
      return [{
          name: 'PCR - Privada',
          data: this.items.filter(x => x.blockchain_type == 'Private')
      },
      {
          name: 'PCR - Pública',
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
    },
    getAverage(){
      let arrPrivate = this.items.filter(x => x.blockchain_type == 'Private')
      let arrPcrPrivate = arrPrivate.map(x => x.pcr)
      let sumPrivate = arrPcrPrivate.reduce((a, b) => a + b, 0)
      let averagePrivate = sumPrivate/arrPcrPrivate.length
      let arrPublic = this.items.filter(x => x.blockchain_type == 'Public')
      let arrPcrPublic = arrPublic.map(x => x.pcr)
      let sumPublic = arrPcrPublic.reduce((a, b) => a + b, 0)
      let averagePublic = sumPublic/arrPcrPublic.length
      this.graphic.chartOptions.subtitle.text = `Promedio Privada: ${averagePrivate.toFixed(2)} | Promedio Pública: ${averagePublic.toFixed(2)}`
      this.$refs.graphicPCR.updateOptions(this.graphic.chartOptions, false ,true)
    }
  },
  async mounted(){
    await this.getTransactions()
  }
}
</script>