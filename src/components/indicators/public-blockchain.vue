<template>
    <VueApexCharts :type="graphic.type" :options="graphic.chartOptions" :series="graphic.series"></VueApexCharts>
</template>
<script>
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
        }
      }
    }
}
</script>