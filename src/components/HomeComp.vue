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
          <v-row>
            <v-col class="d-flex" cols="12" sm="2">
              <v-select
                v-model="timePeriod"
                :items="['year-to-date', 'year', 'month', 'last 5 years', 'all time']"
                filled
                @change="timePeriod = timePeriod"
                placeholder="year-to-date"
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="2" v-if="timePeriod == 'month'">
              <v-select
                v-model="month"
                :items="['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
                filled
                placeholder="new"
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="2" v-if="timePeriod == 'year'">
              <v-select
                v-model="year"
                :items="['2021', '2020', '2019', '2018', '2017', '2016', '2015']"
                filled
                placeholder="new"
              ></v-select>
            </v-col>
            <v-col></v-col>
            <v-col class="d-flex rightBtn" cols="12" sm="2">
              <v-btn @click="updateChartTime()">Update</v-btn>
            </v-col>
          </v-row>

          <v-row justify="space-between">
            <v-col>
              <line-chart
                :data="balChartData"
                :min="balChartMin"
                :max="balChartMax"
                xtitle="Date"
                ytitle="Balance"
              ></line-chart>
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
  async mounted() {
    this.todayDate()
    await this.getEvents()
    this.getBal()
    // this.getBalData()
  },
  data() {
    return {
      today: '',
      currBal: 0,
      nextBal: 0,
      nextUpdate: '',
      balChartData: null,
      balChartMax: 0,
      balChartMin: 0,
      timePeriod: '',
      month: '',
      year: '',
    }
  },
  methods: {
    updateChartTime() {
      let dates = []
      let bal = []
      var i = 0
      if (this.timePeriod === 'year-to-date') {
        let startYear = this.today.substr(0, 3) + '-01-01'
        for (i = this.dates.length - 1; i >= 0; i--) {
          if (this.dates[i] >= startYear) {
            dates.push(this.dates[i])
            bal.push(this.bal[i])
          } else {
            break
          }
        }
        dates = dates.reverse()
        bal = bal.reverse()
        this.dates = dates
        this.bal = bal
        this.getBalData()
      }
      if (this.timePeriod === 'year') {
        let yyyy = '2020'
        if (this.year === '2021') {
          yyyy = '2021'
        }
        if (this.year === '2019') {
          yyyy = '2019'
        }
        if (this.year === '2018') {
          yyyy = '2018'
        }
        if (this.year === '2017') {
          yyyy = '2017'
        }
        if (this.year === '2016') {
          yyyy = '2016'
        }
        if (this.year === '2015') {
          yyyy = '2015'
        }
        let startYear = yyyy + '-01-01'
        let endYear = Number(yyyy) + 1 + '-01-01'
        for (i = 0; i < this.dates.length; i++) {
          if (this.dates[i] >= startYear && this.dates[i] < endYear) {
            dates.push(this.dates[i])
            bal.push(this.bal[i])
          } else {
            break
          }
        }
        this.dates = dates
        this.bal = bal
        this.getBalData()
      }
    },

    todayDate() {
      var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
      var yyyy = today.getFullYear()
      today = yyyy + '-' + mm + '-' + dd
      this.today = today
      return today
    },

    async getBal() {
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
          this.nextUpdate = appData.start
          this.nextBal = appData.bal
          return
        }
      }
      this.nextUpdate = 'No new updates'
      this.nextBal = this.currBal
    },

    async getEvents() {
      let snapshot = await db
        .collection('calEvent')
        .orderBy('date', 'asc')
        .get()
      let events = []
      let bal = []
      let dates = []
      snapshot.forEach(doc => {
        let appData = doc.data()
        appData.id = doc.id
        appData.date = Date.parse(appData.start)
        events.push(appData)
        bal.push(appData.bal)
        dates.push(appData.start)
      })
      this.events = events
      this.bal = bal
      this.dates = dates
      let max = Math.max(...bal)
      let min = Math.min(...bal)
      this.balChartMax = max + (5 / 100) * max
      this.balChartMin = min - (5 / 100) * min
      this.getBalData()
    },

    getBalData() {
      // await this.getEvents()

      let result = {}
      // if (this.dates != []) {
      //   this.balChartData = { Nothing: 2 }
      // } else {
      this.dates.forEach((key, i) => (result[key] = this.bal[i]))
      // }
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
.rightBtn {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>
