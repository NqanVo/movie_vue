<template>
  <Header></Header>
  <section class="container mx-auto flex flex-col gap-4 bg-gray-100 p-4 xl:max-w-screen-xl 2xl:px-0">
    <nav class="border-gray-200 bg-white">
      <div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <div v-if="genresMovie" id="mega-menu" class="w-full items-center justify-between md:order-1 md:flex">
          <ul class="mt-4 flex flex-col font-medium md:mt-0 md:flex-row md:space-x-8">
            <li v-for="ty in typesMovie" :key="ty.to">
              <RouterLink
                :to="`/movies/${ty.to}`"
                :class="`${
                  currentType === ty.to ? 'text-red-500' : ''
                } block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-50 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-red-600`"
              >
                {{ ty.title }}</RouterLink
              >
            </li>
          </ul>
          <ul class="mt-4 flex flex-col font-medium md:mt-0 md:flex-row md:space-x-8">
            <li v-if="genresMovie.genres.length > 0" class="group">
              <button
                id="mega-menu-dropdown-button"
                data-dropdown-toggle="mega-menu-dropdown"
                class="relative flex w-full items-center justify-between border-b border-gray-100 py-2 pl-3 pr-4 font-medium text-gray-900 hover:bg-gray-50 md:w-auto md:border-0 md:p-0 md:hover:bg-transparent md:group-hover:text-red-600"
              >
                Genres
                <svg
                  aria-hidden="true"
                  :class="`ml-1 h-5 w-5 transition-all group-hover:rotate-180`"
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
                <p v-if="idGenres.length > 0">{{ idGenres.length }}</p>
              </button>
              <div
                id="mega-menu-dropdown"
                class="absolute left-0 right-0 z-10 hidden w-auto grid-cols-3 rounded-lg border border-gray-100 bg-white text-sm shadow-md group-hover:grid md:left-auto md:grid-cols-3 xl:grid-cols-4"
              >
                <p
                  v-for="gen in genresMovie.genres"
                  :key="gen.id"
                  @click="choseGenre(gen.id)"
                  :class="`${
                    idGenres.includes(gen.id) ? `text-red-500` : `text-gray-500`
                  } origin-center transform cursor-pointer p-4 transition-all hover:text-red-500 active:scale-105`"
                >
                  {{ gen.name }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div v-if="listMovies.results.length > 0" class="flex flex-col items-end justify-center">
      <span class="text-sm">
        <span class="font-semibold text-red-500">{{ currentPage }}</span> /
        <span class="font-semibold">{{ listMovies.total_pages }} pages</span>
      </span>
      <div class="xs:mt-0 mt-2 inline-flex">
        <!-- Buttons -->
        <button
          class="inline-flex items-center rounded-l bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-400"
          @click="setPage(-1)"
          :disabled="currentPage <= 1 || getterIsLoadingListMovies ? true : false"
        >
          <svg
            aria-hidden="true"
            class="mr-2 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Prev
        </button>
        <button
          class="inline-flex items-center rounded-r border-0 border-l bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-400"
          @click="setPage(1)"
          :disabled="currentPage >= listMovies.total_pages || getterIsLoadingListMovies ? true : false"
        >
          Next
          <svg
            aria-hidden="true"
            class="ml-2 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div v-if="!getterIsLoadingListMovies" class="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
      <CardMovie v-if="listMovies.results.length > 0" v-for="movie in listMovies.results" :key="movie.id" :movie="movie" />
        <div v-else class="text-center">No matching movies found</div>
    </div>
    <Loading v-else ></Loading>
  </section>
  <Footer></Footer>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'
import Loading from '@/components/Loading/Loading.vue'
import { setSEO } from '@/seo/meta'
import axios from 'axios'
import CardMovie from '@/components/Card/CardMovie.vue'
import { useRoute } from 'vue-router'
import { useGetListMovies} from "@/pinia/listMovies.store"
import { storeToRefs } from 'pinia'

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

const route = useRoute()
const storeListMovies = useGetListMovies()
const {getListMovies} = storeListMovies
const {getterIsLoadingListMovies,getterListMovies:listMovies} = storeToRefs(storeListMovies)
let genresMovie = reactive({ genres: [] } as { genres: { id: number; name: string }[] })
const idGenres = ref<number[]>([])
const currentPage = ref<number>(1)
const currentType = ref(route.path.split('/')[2])

const choseGenre = (id: number) => {
  const check = idGenres.value.includes(id)
  if (!check) idGenres.value.push(id)
  else {
    const indexId = idGenres.value.indexOf(id)
    idGenres.value.splice(indexId, 1)
  }
}
const getGenresMovie = async (): Promise<{ genres: { id: number; name: string }[] }> => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US`
  )
  return res.data
}
const setPage = (number: number) => {
  if (currentPage.value <= 0) {
    currentPage.value = 1
  } else if (currentPage.value > listMovies.value.total_pages) {
  } else currentPage.value += number
}

onMounted(async () => {
  try {
    setSEO
    genresMovie = await getGenresMovie()
    await getListMovies(currentType.value,currentPage.value,idGenres.value)
  } catch (error) {}
})

watch([currentPage], async () => {
  await getListMovies(currentType.value,currentPage.value,idGenres.value)

})
watch([idGenres.value,route], async () => {
  currentType.value = route.path.split('/')[2]
  currentPage.value = 1
  await getListMovies(currentType.value,currentPage.value,idGenres.value)
})
</script>


<style scoped></style>
