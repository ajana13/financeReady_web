<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />-->
    <!-- <h2>Home page</h2> -->
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat color="white">
            <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">Today</v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">{{ $refs.calendar.title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 days</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon>
                  <v-icon
                    v-if="currentlyEditing !== selectedEvent.id"
                    @click.prevent="editEvent(selectedEvent)"
                  >mdi-pencil</v-icon>
                  <v-icon v-else @click.prevent="updateEvent(selectedEvent)">mdi-content-save</v-icon>
                </v-btn>

                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>-->
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <!-- <span v-html="selectedEvent.details"></span>
                <br />
                <p class="balance">
                  Available Balance:
                  <span v-html="selectedEvent.value"></span>
                </p>-->
                <form v-if="currentlyEditing !== selectedEvent.id">
                  {{selectedEvent.details}}
                  <br />
                  Available Balance: {{selectedEvent.bal}}
                </form>
                <form v-else>
                  <span>Details:</span>
                  <textarea-autosize
                    v-model="selectedEvent.details"
                    type="text"
                    style="width: 100%"
                    :min-width="100"
                    placeholder="add note "
                  />

                  <span>Add/Deduct: {{ selected }}</span>
                  <v-select v-model="selectedEvent.color" :items="['Add Funds', 'Deduct Funds']"></v-select>

                  <span>Amount:</span>
                  <textarea-autosize
                    v-model="selectedEvent.value"
                    type="number"
                    style="width: 100%"
                    :min-width="100"
                    placeholder="add note "
                  />
                </form>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import { db } from '@/main'

export default {
  name: 'Home',
  // components: {
  //   HelloWorld,
  // },
  // bal: 0,
  currBal: 0,
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    name: null,
    details: null,
    color: '#1976D2',
    value: 0,
    start: null,
    end: null,
    currentlyEditing: null,
    dialog: false,
  }),
  mounted() {
    // this.$refs.calendar.checkChange()
    this.getEvents()
  },
  methods: {
    async getEvents() {
      let snapshot = await db.collection('calEvent').get()
      let events = []
      let bal = 0
      snapshot.forEach(doc => {
        let appData = doc.data()
        appData.id = doc.id
        events.push(appData)
        if (appData.color == 'red') {
          bal -= appData.value
        } else if (appData.color == 'green') {
          bal += appData.value
        }
        this.updateBal(bal, appData)
      })
      this.events = events
    },
    async updateEvent(ev) {
      if (ev.color === 'Add Funds') {
        ev.color = 'green'
        ev.name = 'Funds added'
      } else if (ev.color === 'Deduct Funds') {
        ev.color = 'red'
        ev.name = 'Funds deducted'
      }
      await db
        .collection('calEvent')
        .doc(this.currentlyEditing)
        .update({
          details: ev.details,
          value: Number(ev.value),
          color: ev.color,
          name: ev.name,
        })
      this.selectedOpen = false
      this.currentlyEditing = null
      this.updateEvent()
    },
    async updateBal(bal, ev) {
      await db
        .collection('calEvent')
        .doc(ev.id)
        .update({
          bal: bal,
        })
    },
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    editEvent(ev) {
      this.currentlyEditing = ev.id
      console.log(ev.id)
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => (this.selectedOpen = true), 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange({ start, end }) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          value: this.value,
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        })
      }

      this.events = events
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
}
</script>
