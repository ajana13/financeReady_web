<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />-->
    <!-- <h2>Home page</h2> -->
    <HomeComp></HomeComp>
  </div>
</template>

<script>
// @ is an alias to /src
// import { db } from '@/main'
import HomeComp from '@/components/HomeComp.vue'

export default {
  components: {
    HomeComp,
  },
}
</script>