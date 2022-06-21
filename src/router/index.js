import Vue from 'vue'
import VueRouter from 'vue-router'
import BothCreate from '../views/BothCreate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:id',
    name: 'Redirect',
    component: () => import(/* webpackChunkName: "Redirect" */ '../views/Redirect.vue')

  },
  {
    path: '/',
    name: 'Home',
    component: BothCreate
  },

  {
    path: '/create/qr',
    name: 'Qr',
    component: BothCreate,
  },
  {
    path: '/create/short-link',
    name: 'ShortLink',
    component: BothCreate,
  },
  {
    path: '/create/qr-link',
    name: 'Both',
    component: BothCreate,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
