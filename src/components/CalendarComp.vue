<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-icon @click="dialog = true">mdi-plus-box</v-icon>
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

      <!-- Add Event dialog -->
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent">
              <v-text-field v-model="details" type="text" label="details" />
              <v-text-field v-model="start" type="date" label="date (required)" />
              <v-text-field v-model="value" type="number" label="amount (required)" />
              <v-select
                v-model="color"
                :items="['Add Funds', 'Deduct Funds']"
                label="add/deduct (required)"
              />
              <v-btn
                type="submit"
                color="primary"
                class="mr-4"
                @click.stop="dialog=false"
              >Create Event</v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>

      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="secondary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
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
                <v-icon @click="deleteEvent(selectedEvent.id)">mdi-delete</v-icon>
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
                <p v-if="selectedEvent.color==='red'">Funds deducted: {{selectedEvent.value}}</p>
                <p v-else-if="selectedEvent.color==='green'">Funds added: {{selectedEvent.value}}</p>
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

                <span>Add/Deduct:</span>
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
              <v-btn text color="secondary" @click="closeOpen()">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { db } from '@/main'
// import Home from './Home.vue'

export default {
  name: 'Calendar',
  // currBal: 0,
  // today: '',
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
    color: '',
    value: 0,
    start: null,
    currentlyEditing: null,
    dialog: false,
  }),
  mounted() {
    this.getEvents()
  },
  methods: {
    closeOpen() {
      this.selectedOpen = false
      this.currentlyEditing = null
    },
    async getEvents() {
      let snapshot = await db
        .collection('financeEvent')
        .orderBy('date', 'asc')
        .get()
      let events = []
      snapshot.forEach(doc => {
        let appData = doc.data()
        appData.id = doc.id
        appData.date = Date.parse(appData.start)
        this.updateDate(appData)
        events.push(appData)
      })
      await this.updateAllBal()
      this.events = events
    },

    async updateDate(ev) {
      await db
        .collection('financeEvent')
        .doc(ev.id)
        .update({
          date: Number(ev.date),
        })
      this.getEvents()
    },

    async addEvent() {
      if (this.start && this.value && this.color) {
        if (this.color === 'Add Funds') {
          this.color = 'green'
          this.name = 'Funds added'
        } else if (this.color === 'Deduct Funds') {
          this.color = 'red'
          this.name = 'Funds deducted'
        }
        await db.collection('financeEvent').add({
          details: this.details,
          value: Number(this.value),
          start: this.start,
          date: Date.parse(this.start),
          bal: 0,
          color: this.color,
          name: this.name,
        })
      } else {
        alert('Date, value, and type are required')
      }
      this.getEvents()
    },

    async updateAllBal() {
      // let today = this.todayDate()
      let snapshot = await db
        .collection('financeEvent')
        .orderBy('date', 'asc')
        .get()
      let bal = 0
      snapshot.forEach(doc => {
        let appData = doc.data()
        appData.id = doc.id
        if (appData.color == 'red') {
          bal -= appData.value
        } else if (appData.color == 'green') {
          bal += appData.value
        }
        this.updateBal(bal, appData)
      })
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
        .collection('financeEvent')
        .doc(this.currentlyEditing)
        .update({
          details: ev.details,
          value: Number(ev.value),
          color: ev.color,
          name: ev.name,
        })
      this.selectedOpen = false
      this.currentlyEditing = null
      this.updateAllBal()
    },

    async deleteEvent(ev) {
      await db
        .collection('financeEvent')
        .doc(ev)
        .delete()
      this.selectedOpen = false
      this.getEvents()
    },

    async updateBal(bal, ev) {
      await db
        .collection('financeEvent')
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
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => (this.selectedOpen = true), 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        this.currentlyEditing = null
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
  },
}
</script>
