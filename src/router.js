import Vue from 'vue'
import Router from 'vue-router'
import LoginView from './views/LoginView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: LoginView,
    },
    {
      path: '/main',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/MainView.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('./views/Dashboard.vue')
        },
        {
          path: 'residents',
          component: () => import('./views/Residents.vue')
        },
        {
          path: 'users',
          component: () => import('./views/Users.vue')
        },
        {
          path: 'medicines',
          component: () => import('./views/Medicines.vue')
        },
        {
          path: 'residenttransactions',
          component: () => import('./views/ResidentTransactions.vue')
        },
        {
          path: 'businessowners',
          component: () => import('./views/BusinessOwners.vue')
        },
        {
          path: 'businessclearance',
          component: () => import('./views/BusinessClearance.vue')
        },     
        {
          path: 'blotters',
          component: () => import('./views/Blotters.vue')
        },   
        {
          path: 'firsttimelogin',
          component: () => import('./views/FirstTimeLogin.vue')
        },    
        {
          path: 'profile',
          component: () => import('./views/Profile.vue')
        },    
        {
          path: 'reports',
          component: () => import('./views/Reports.vue')
        },  
      ]
    }
  ]
})
