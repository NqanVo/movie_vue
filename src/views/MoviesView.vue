<template>
  <Header></Header>
  <section class="container mx-auto flex flex-col gap-11 bg-gray-100 p-4 xl:max-w-screen-xl 2xl:px-0">
    <nav class="border-gray-200 bg-white dark:bg-gray-900">
      <div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <div id="mega-menu" class="w-full items-center justify-between md:order-1 md:flex">
          <ul class="mt-4 flex flex-col font-medium md:mt-0 md:flex-row md:space-x-8">
            <li v-for="ty in typesMovie" :key="ty.to">
              <RouterLink
                :to="`/movies/${ty.to}`"
                :class="`${
                  currentType === ty.to ? 'text-red-500' : ''
                } block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:text-red-500 dark:hover:bg-gray-700 dark:hover:text-red-500 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-red-600 md:dark:hover:bg-transparent md:dark:hover:text-red-500`"
                >{{ ty.title }}</RouterLink
              >
            </li>
          </ul>
          <ul class="mt-4 flex flex-col font-medium md:mt-0 md:flex-row md:space-x-8">
            <li v-if="genresMovie.genres.length > 0" class="group">
              <button
                id="mega-menu-dropdown-button"
                data-dropdown-toggle="mega-menu-dropdown"
                class="flex w-full items-center justify-between border-b border-gray-100 py-2 pl-3 pr-4 font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-red-500 md:w-auto md:border-0 md:p-0 md:hover:bg-transparent md:group-hover:text-red-600 md:dark:hover:bg-transparent md:dark:hover:text-red-500"
              >
                Genres
                <svg
                  aria-hidden="true"
                  class="ml-1 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <div
                id="mega-menu-dropdown"
                class="absolute right-0 z-10 hidden w-auto grid-cols-2 rounded-lg border border-gray-100 bg-white text-sm shadow-md group-hover:grid dark:border-gray-700 dark:bg-gray-700 md:grid-cols-3 xl:grid-cols-4"
              >
                <p
                  v-for="gen in genresMovie.genres"
                  :key="gen.id"
                  @click="choseGenre(gen.id)"
                  :class="`${
                    idGenres.includes(gen.id) ? `text-red-500` : `text-gray-500`
                  } origin-center transform cursor-pointer p-4 transition-all hover:text-red-600 active:scale-110 dark:text-gray-400 dark:hover:text-red-500`"
                >
                  {{ gen.name }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </section>
  <Footer></Footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {mapGetters} from 'vuex'
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'
import { setSEO } from '@/seo/meta'
import axios from 'axios'
import { getMoviesPopular } from '@/services/getMovies'
// import type {GetMoviesResponse} from '@/typ'
const typesMovie = [
  {
    to: 'popular',
    title: 'Popular'
  },
  {
    to: 'top_rated',
    title: 'Top Rated'
  },
  {
    to: 'upcoming',
    title: 'Upcoming'
  }
]

export default defineComponent({
  components: {
    Header,
    Footer
  },
  methods: {
    setSEO,
    async getGenresMovie(): Promise<{ genres: { id: number; name: string }[] }> {
      const res = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US`
      )
      return res.data
    },
    choseGenre(id: number) {
      const check = this.idGenres.includes(id)
      if (!check) this.idGenres.push(id)
      else {
        const indexId = this.idGenres.indexOf(id)
        this.idGenres.splice(indexId, 1)
      }
    },
    getMoviesPopular():any {
      return getMoviesPopular(1, this.getLanguage.code)
    },
  },
  async mounted() {
    this.setSEO()
    this.genresMovie = await this.getGenresMovie()
  },
  watch: {},
  computed: {
    currentType(): string {
      return this.$route.path.split('/')[2] || ''
    },
    ...mapGetters(['getLanguage'])
  },
  data() {
    return {
      genresMovie: { genres: [] } as { genres: { id: number; name: string }[] },
      typesMovie: typesMovie,
      idGenres: [] as number[],
      listMovies: {} as GetMoviesResponse
    }
  }
})
</script>

<style scoped></style>
