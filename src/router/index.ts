import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }, {
      path: '/posts',
      name: 'posts',
      component: () => import("../components/AllPosts.vue")
    }
  ]
})

router.beforeEach((to, from, next) => {

  let user = localStorage.userID;
  if (to.name !== 'home' && !user) {
    next({
      path: '/',
      replace: true
    })
  } else {
    next();
  }
})

export default router
