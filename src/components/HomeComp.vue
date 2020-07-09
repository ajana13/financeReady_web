<template>
  <div class="HomeComp">
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

    <div class="plot">
      <v-card class="d-block" min-width="70%">
        <v-container>
          <v-row justify="space-between">
            <v-col>
              <line-chart :data="balChartData"></line-chart>
            </v-col>

            <v-col cols="auto" class="text-center pl-0">
              <v-row class="flex-column ma-0 fill-height" justify="center"></v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { db } from '@/main'
// import Calendar from './Calendar.vue'

export default {
  name: 'Home',
  events: [],
  dates: [],
  bal: [],
  data() {
    return {
      today: this.todayDate(),
      currBal: this.getBal(3),
      nextBal: this.getBal(2),
      nextUpdate: this.getBal(1),
      balChartData: this.getBalData(),
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
    async getEvents() {
      let snapshot = await db
        .collection('calEvent')
        .orderBy('date', 'asc')
        .get()
      let events = []
      let bal = []
      let dates = []
      let balChartData = {}
      snapshot.forEach(doc => {
        let appData = doc.data()
        appData.id = doc.id
        appData.date = Date.parse(appData.start)
        events.push(appData)
        bal.push(appData.bal)
        dates.push(appData.start)
        // balChartData.appData.start = appData.bal
        // console.log(balChartData.appData.start)
      })
      this.events = events
      this.bal = bal
      this.dates = dates
      this.balChartData = balChartData
    },
    async getBalData() {
      await this.getEvents()

      let result = {}
      this.dates.forEach((key, i) => (result[key] = this.bal[i]))
      this.balChartData = result
    },
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
