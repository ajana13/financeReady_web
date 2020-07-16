import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueTextareaAutosize from 'vue-textarea-autosize'
import firebase from 'firebase'
import chartkick from 'vue-chartkick'
import chart from 'chart.js'

Vue.use(VueTextareaAutosize)
Vue.use(chartkick.use(chart))

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyAAEiyrvhG9bpMMqveT3YYwcqfdrODOZJg',
  authDomain: 'financeready-21a34.firebaseapp.com',
  databaseURL: 'https://financeready-21a34.firebaseio.com',
  projectId: 'financeready-21a34',
  storageBucket: 'financeready-21a34.appspot.com',
  messagingSenderId: '399573588570',
  appId: '1:399573588570:web:74331b9245d7863f19d663',
  measurementId: 'G-P4KJ5LMDJW',
})

export const db = firebase.firestore()
// let events = []
// async function getData() {
//   let snapshot = await db
//     .collection('temp')
//     // .orderBy('date', 'asc')
//     .get()
//   events = []
//   snapshot.forEach(doc => {
//     let appData = doc.data()
//     appData.id = doc.id
//     // appData.date = Date.parse(appData.start)
//     // this.updateDate(appData)
//     events.push(appData)
//     // console.log(events)
//   })
//   return events
// }
// export async function data() {
//   events = await getData()
//   return events
// }
// data().then(events => console.log(events))

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
