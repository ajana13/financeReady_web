import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import db from '@/main'
import data from '@/main'

// let events = []

// async function getEvents() {
//   let snapshot = await db
//     .collection('temp')
//     .orderBy('date', 'asc')
//     .get()
//   // let events = []
//   snapshot.forEach(doc => {
//     let appData = doc.data()
//     appData.id = doc.id
//     appData.date = Date.parse(appData.start)
//     this.updateDate(appData)
//     events.push(appData)
//     return events
//   })
//   //   // await this.updateAllBal()
//   //   // this.events = events
// }

// events = getEvents()

console.log(data)

Vue.use(VueRouter)

let fName = 'Anu'
let lName = 'Jana'

let name = []
name.push(fName)
name.push(lName)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/calendar',
    name: 'Calendar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Calendar.vue'),
  },
  {
    path: '/application',
    name: 'Application',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Application.vue'),
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    // component: DisplayComponent,
    props: {
      // <-- props as an Object
      user: {
        // firstName: fName,
        // lastName: lName,
        name: name,
        // event: events
      },
    },
  },
]

const router = new VueRouter({
  routes,
})

export default router
