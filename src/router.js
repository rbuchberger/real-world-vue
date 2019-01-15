import Vue from 'vue'
import Router from 'vue-router'
import EventList from './views/EventList.vue'
import NProgress from 'nprogress'
import store from '@/store/store'

// import EventCreate from './views/EventCreate.vue'
// import EventShow from './views/EventShow.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList
    },
    {
      path: '/event/:id',
      name: 'event-show',
      // component: EventShow,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store.dispatch('event/fetchEvent', routeTo.params.id).then(event => {
          routeTo.params.event = event
          next()
        })
      },

      component: () =>
        import(/* webpackChunkName: "event-show" */ '@/views/EventShow.vue')
    },
    {
      path: '/event/create',
      name: 'event-create',
      // component: EventCreate
      component: () =>
        import(/* webpackChunkName: "event-create" */ '@/views/EventCreate.vue')
    }
  ]
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
