<template>
    <VueApexCharts :type="graphic.type" :options="graphic.chartOptions" :series="graphic.series"></VueApexCharts>
</template>
<script>
export default {
    name: 'Efficacy',
    data() {
      return {
        graphic:{
          chartOptions: {
            chart: {
              id: 'efficacy',
              width: '100%'
            },
            title:{
              text: 'Comparación de eficacia de la BC Pública y la Privada',
              align: 'center'
            },
            xaxis: {
              categories: ["Blockchain Pública", "Blockchain Privada"]
            },
            yaxis: {
              title:{
                text: '% de Eficacia'
              }
            },
            colors:["rgba(0, 143, 251, 0.85)","rgba(254, 176, 25, 0.85)"],
            stroke: {
              curve: 'smooth',
            },
            plotOptions: {
              bar: {
                columnWidth: '45%',
                distributed: true,
              }
            }
          },
          series: [{
            name: 'Eficacia',
            data: [100, 100]
          }],
          type: 'bar'
        }
      }
    }
}
</script>