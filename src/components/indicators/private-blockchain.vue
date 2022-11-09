<template>
    <VueApexCharts :type="graphic.type" :options="graphic.chartOptions" :series="graphic.series"></VueApexCharts>
</template>
<script>
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
            xaxis: {
              categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
              title:{
                text: 'Transacciones'
              }
            },
            yaxis: {
              title:{
                text: 'Tiempo (milisegundos)'
              }
            },
            colors: ['orange'],
            stroke: {
              curve: 'stepline',
            }
          },
          series: [{
            name: 'Tiempo (milisegundos)',
            data: [30, 40, 45, 50, 49, 60, 70, 91]
          }],
          type: 'area'
        }
      }
    }
}
</script>