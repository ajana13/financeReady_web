<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />-->
    <!-- <h2>Home page</h2> -->
    <CalendarComp></CalendarComp>
  </div>
</template>

<script>
// @ is an alias to /src
import CalendarComp from '@/components/CalendarComp.vue'

// import { db } from '@/main'
// import Home from './Home.vue'

export default {
  components: {
    CalendarComp,
  },
}
</script>
