import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue"
import MovieView from "@/views/MovieView.vue"
import NotFoundView from "@/views/NotFoundView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: MovieView
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFoundView
    },
  ]
})

//middleware router
router.beforeEach((to, from, next)=>{
  const isPathMatched = router.resolve(to.path).matched.length;  
  if(isPathMatched) next()
  else next({ name: 'not-found' })
})

export default router
