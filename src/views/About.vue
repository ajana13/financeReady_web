<template>
  <div class="About">
    <h1>This is the about page</h1>
    <line-chart :data="chartData" class="ml-auto"></line-chart>
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
    }
  },
}
</script>

<style></style>
