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
            <v-list-item-subtitle>{{ currBal }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ nextUpdate }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ nextBal }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
// @ is an alias to /src
import { db } from '@/main'
// import Calendar from './Calendar.vue'

export default {
  name: 'Home',
  data() {
    return {
      today: this.todayDate(),
      currBal: this.getBal(3),
      nextBal: this.getBal(2),
      nextUpdate: this.getBal(1),
    }
  },
  methods: {
    todayDate() {
      var today = new Date()
      var dd = String(today.getDate())
      var mm = String(today.getMonth() + 1) //January is 0!
      // var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
      var yyyy = today.getFullYear()
      today = yyyy + '-' + mm + '-' + dd
      return today
    },
    async getBal(n) {
      let snapshot = await db
        .collection('calEvent')
        .orderBy('date', 'asc')
        .get()
      // let today = this.todayDate()
      // this.today = today
      snapshot.forEach(doc => {
        let appData = doc.data()
        // if aftertoday, do not include in current bal
        if (appData.start <= this.today) {
          this.currBal = appData.bal
        } else {
          // Get next Update date
          if (n == 1) {
            return appData.start
          }
          // Get next Update Balance
          if (n == 2) {
            return appData.bal
          }
          // Get current balance
          return this.currBal
        }
      })
      if (n == 1) {
        return 'No new updates'
      } else {
        return this.currBal
      }
    },
  },
}
</script>
