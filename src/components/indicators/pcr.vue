<template>
    <VueApexCharts :type="graphic.type" :options="graphic.chartOptions" :series="graphic.series"></VueApexCharts>
</template>
<script>
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
              categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
              title:{
                text: 'Transacciones'
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
        }
      }
    }
}
</script>