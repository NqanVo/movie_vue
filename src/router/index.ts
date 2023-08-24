import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MovieView from '@/views/MovieView.vue'
import MoviesView from '@/views/MoviesView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import SignInView from '@/views/SignInView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/sign-in',
      name:'SignIn',
      component: SignInView
    },
    {
      path: '/movies/popular',
      name: 'moviesPopular',
      component: MoviesView
    },
    {
      path: '/movies/top_rated',
      name: 'moviesTopTated',
      component: MoviesView
    },
    {
      path: '/movies/upcoming',
      name: 'moviesUpcoming',
      component: MoviesView
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: MovieView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})



export default router
