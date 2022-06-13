import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import('./views/index.vue')
  },
  {
    path: '/button',
    component: () => import('./views/button.vue')
  }
  // {
  //   path: '/grid',
  //   component: () => import('./views/grid.vue')
  // },
  // {
  //   path: '/layout',
  //   component: () => import('./views/layout.vue')
  // },
  // {
  //   path: '/card',
  //   component: () => import('./views/card.vue')
  // },
  // {
  //   path: '/collapse',
  //   component: () => import('./views/collapse.vue')
  // },
  // {
  //   path: '/switch',
  //   component: () => import('./views/switch.vue')
  // },
  // {
  //   path: '/input',
  //   component: () => import('./views/input.vue')
  // },
  // {
  //   path: '/checkbox',
  //   component: () => import('./views/checkbox.vue')
  // },
  // {
  //   path: '/form',
  //   component: () => import('./views/form.vue')
  // },
  // {
  //   path: '/alert',
  //   component: () => import('./views/alert.vue')
  // },
  // {
  //   path: '/table-render',
  //   component: () => import('./views/table-render.vue')
  // },
  // {
  //   path: '/table-slot',
  //   component: () => import('./views/table-slot.vue')
  // },
  // {
  //   path: '/tree',
  //   component: () => import('./views/tree.vue')
  // },
  // {
  //   path: '*',
  //   component: () => import('./views/index.vue')
  // }
]

export default new Router({
  routes
})
