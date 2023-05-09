import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/teams',
      name: 'teams',
      component: () => import("../views/teams/AllTeamsView.vue")
    },
    {
      path: '/signups',
      name: 'signups',
      component: () => import("../views/signUps/AllSignUpsView.vue")
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
      path: '/competitions', 
      name: 'competitions',
      component: () => import("../views/Competitions/AllCompetitionsView.vue"),
    },
    {
      path: "/addCompetition",
      name: "addCompetition",
      component: () => import("../views/Competitions/CreateCompetitionView.vue"),
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
