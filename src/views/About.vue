<template>
  <div class="About">
    <h1>This is the about page</h1>
    <div class="plot">
      <v-card class="d-block" min-width="100%">
        <line-chart :data="chartData" :min="1000" :max="5000"></line-chart>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      chartData: {
        '2020-06-07': 2,
        '2020-07-04': 5,
        '2020-07-07': 7,
        '2020-07-10': 3,
      },
      chartDataOption: {
        responsive: true,
        lineTension: 1,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                padding: 25,
                max: 15,
                min: 0,
                stepSize: 0.5,
              },
            },
          ],
        },
      },
    }
  },
}
</script>

<style>
.plot {
  display: flex;
  justify-content: flex-end;
  padding-right: 5%;
  padding-top: 2%;
}
</style>
