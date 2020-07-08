<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />-->
    <!-- <h2>Home page</h2> -->
    <v-navigation-drawer absolute dark>
      <v-list dense nav>
        <v-list-item>
          <v-list-item-content>
            <!-- <v-list-item-title>Your Finances</v-list-item-title> -->
            <v-card>
              <v-card-title>Your Finances</v-card-title>
              <br />
              <p class="summary">
                <v-card-text>
                  <h3>Current Balance:</h3>
                  {{ currBal }}
                </v-card-text>
                <v-card-text>
                  <h3>Next Update:</h3>
                  {{ nextUpdate }}
                </v-card-text>
                <v-card-text>
                  <h3>Balance on next update:</h3>
                  {{ nextBal }}
                </v-card-text>
              </p>
            </v-card>
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
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
      // var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
      var yyyy = today.getFullYear()
      today = yyyy + '-' + mm + '-' + dd
      this.today = today
      return today
    },
    async getBal(n) {
      let snapshot = await db
        .collection('calEvent')
        .orderBy('date', 'asc')
        .get()
      for (var i = 0; i < snapshot.size; i++) {
        let appData = snapshot.docs[i].data()
        // if aftertoday, do not include in current bal
        if (appData.start <= this.today) {
          this.currBal = appData.bal
        } else {
          // Get next Update date
          if (n == 1) {
            this.nextUpdate = appData.start
          }
          // Get next Update Balance
          if (n == 2) {
            this.nextBal = appData.bal
          }
          return
        }
      }
      if (n == 1) {
        this.nextUpdate = 'No new updates'
      } else {
        this.nextBal = this.currBal
      }
    },
  },
}
</script>
