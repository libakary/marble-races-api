import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("../views/teams/AllTeamsView.vue")
    },
    {
      path: '/addTeam',
      name: 'addTeam',
      component: () => import("../views/teams/CreateTeamView.vue")
    },
    {
      path: '/addSignUp',
      name: 'addSignUp',
      component: () => import("../views/signUps/CreateSignUpsView.vue")
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
