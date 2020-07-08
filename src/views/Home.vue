<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />-->
    <!-- <h2>Home page</h2> -->
    <v-navigation-drawer absolute dark>
      <v-list dense nav>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Your Finances</v-list-item-title>
            <v-list-item-subtitle>{{ bal }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
// @ is an alias to /src
import Calendar from './Calendar.vue'

// import { db } from '@/main'

export default {
  name: 'Home',
  data() {
    return {
      colors: ['primary', 'secondary'],
      model: 0,
      bal: Calendar.currBal,
      name: Calendar.name,
    }
  },
}
</script>
