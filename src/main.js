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

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
