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
            <v-col class="d-flex" cols="12" sm="3">
              <v-select
                v-model="timePeriod"
                :items="['year-to-date', 'year', 'month', 'all-time']"
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
                prefix="$"
                :xtitle="timePeriod + ' ' + month + ' ' + year"
                ytitle="Balance"
                :messages="{empty: 'No data for the selected time-period'}"
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
      timePeriod: 'year-to-date',
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
        this.month = ''
        let startYear = this.today.substr(0, 4) + '-01-01'
        for (i = this.events.length - 1; i >= 0; i--) {
          if (this.events[i].start >= startYear) {
            dates.push(this.events[i].start)
            bal.push(this.events[i].bal)
          } else {
            break
          }
        }
      } else if (this.timePeriod === 'year') {
        this.month = ''
        let yyyy = '2020'
        // make this auto instead of fixing years
        if (this.year === '2021') {
          yyyy = '2021'
        } else if (this.year === '2019') {
          yyyy = '2019'
        } else if (this.year === '2018') {
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
        for (i = 0; i < this.events.length; i++) {
          if (
            this.events[i].start >= startYear &&
            this.events[i].start < endYear
          ) {
            dates.push(this.events[i].start)
            bal.push(this.events[i].bal)
          } else if (this.events[i].start > startYear) {
            continue
          } else {
            break
          }
        }
      } else if (this.timePeriod === 'month') {
        this.year = this.today.substr(0, 4)
        let mm = '01'
        let em = '02'
        if (this.month === 'Feb') {
          mm = '02'
          em = '03'
        } else if (this.month == 'Mar') {
          mm = '03'
          em = '04'
        } else if (this.month == 'April') {
          mm = '04'
          em = '05'
        } else if (this.month == 'May') {
          mm = '05'
          em = '06'
        } else if (this.month == 'Jun') {
          mm = '06'
          em = '07'
        } else if (this.month == 'Jul') {
          mm = '07'
          em = '08'
        } else if (this.month == 'Aug') {
          mm = '08'
          em = '09'
        } else if (this.month == 'Sep') {
          mm = '09'
          em = '10'
        } else if (this.month == 'Oct') {
          mm = '11'
          em = '02'
        } else if (this.month == 'Nov') {
          mm = '11'
          em = '12'
        } else if (this.month == 'Dec') {
          mm = '12'
          em = '01'
        }
        let yyyy = this.year
        if (em == '01') {
          yyyy = Number(this.year) + 1
        }
        let startMonth = yyyy + '-' + mm + '-01'
        let endMonth = yyyy + '-' + em + '-01'
        for (i = 0; i < this.events.length; i++) {
          if (
            this.events[i].start >= startMonth &&
            this.events[i].start < endMonth
          ) {
            dates.push(this.events[i].start)
            bal.push(this.events[i].bal)
          } else if (this.events[i].start > startMonth) {
            continue
          } else {
            break
          }
        }
      } else {
        for (i = 0; i < this.events.length; i++) {
          dates.push(this.events[i].start)
          bal.push(this.events[i].bal)
        }
      }
      this.dates = dates
      this.bal = bal
      this.findMinMax(bal)
      this.getBalData()
    },

    findMinMax(bal) {
      let max = Math.max(...bal)
      let min = Math.min(...bal)
      this.balChartMax = max + (5 / 100) * max
      this.balChartMin = min - (5 / 100) * min
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
      this.findMinMax(bal)
      this.getBalData()
    },

    getBalData() {
      // await this.getEvents()

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
.rightBtn {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>
