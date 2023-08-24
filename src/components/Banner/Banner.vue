<template>
  <swiper
    v-if="Object.keys(listMoviesPopular).length > 0"
    :direction="'vertical'"
    :pagination="paginationSwiper"
    :autoplay="autoplaySwiper"
    :modules="modules"
    :loop="true"
    class="relative mx-auto h-[90vh] w-full max-w-[1440px] md:h-[500px] xl:h-[600px]"
  >
    <!-- <swiper-slide v-for="i in 8" :key="i"> -->
    <swiper-slide v-for="movie in listMoviesPopular.results.slice(0, 8)" :key="movie.id">
      <!-- <div class="relative mx-auto h-screen w-full max-w-[1440px] md:h-[600px]"> -->
      <div class="relative mx-auto h-screen w-full max-w-[1440px] md:h-[600px]">
        <img
          class="h-full w-full object-cover"
          :src="`https://image.tmdb.org/t/p/original/` + movie.backdrop_path"
          alt=""
        />
        <div class="absolute inset-0 z-10 h-full w-full bg-black/40"></div>
        <div
          class="absolute inset-0 z-10 mx-auto grid h-full w-full max-w-screen-xl grid-cols-2 items-center px-4 text-white md:grid-cols-3 2xl:px-0"
        >
          <div class="flex flex-col items-start gap-4">
            <h2 class="">{{ movie.title }}</h2>
            <div class="flex items-center gap-4">
              <p class="rounded-lg bg-yellow-500 p-1 text-xs font-bold uppercase text-black">vote</p>
              <p>{{ movie.vote_average }} / 10</p>
            </div>
            <p class="text-sm font-medium">
              {{ movie.overview.length > 150 ? movie.overview.substring(0,150) + "..." : movie.overview}}
            </p>
            <Button
              :path="`/movie/${movie.id}`"
              :title="`WATCH TRAILER`"
              :icon="`&lt;svg class=&quot;h-4 w-4 text-white&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;&gt;&lt;circle cx=&quot;12&quot; cy=&quot;12&quot; r=&quot;10&quot; /&gt;&lt;polygon points=&quot;10 8 16 12 10 16 10 8&quot; /&gt;&lt;/svg&gt;`"
            ></Button>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
  <div v-else class="relative mx-auto h-[90vh] w-full max-w-[1440px] md:h-[500px] xl:h-[600px]">
    <div
      role="status"
      class="flex h-full w-full animate-pulse items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-700"
    >
      <svg
        class="h-12 w-12 text-gray-200 dark:text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 384 512"
      >
        <path
          d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

import Button from '@/components/Button/Button.vue'
import type { GetMoviesResponse } from '@/types/GetMovies.interface'

import { getMoviesPopular } from '@/services/getMovies'
import { mapGetters } from 'vuex'
import { useOther } from '@/pinia/other.store'
import { storeToRefs } from 'pinia'
export default defineComponent({
  components: {
    Button,
    Swiper,
    SwiperSlide
  },
  setup() {
    const storeOther = useOther()
    const {getterLanguage:getLanguage} = storeToRefs(storeOther)
  
    return {getLanguage,
      modules: [Pagination, Autoplay]
    }
  },
  methods: {
    getMoviesPopular(): any {
      return getMoviesPopular(1, this.getLanguage.code)
    }
  },
  async mounted() {
    // setTimeout(async () => {
    //   this.listMoviesPopular = await this.getMoviesPopular()
    // }, 1000)
    this.listMoviesPopular = await this.getMoviesPopular()
  },
  watch: {
    getLanguage: async function () {
      this.listMoviesPopular = await this.getMoviesPopular()
    }
  },
  computed: {
    // ...mapGetters(['getLanguage'])
  },
  data() {
    return {
      listMoviesPopular: {} as GetMoviesResponse,
      paginationSwiper: {
        clickable: true
      },
      autoplaySwiper: {
        delay: 3000,
        disableOnInteraction: false
      }
    }
  }
})
</script>

<style scoped>
.swiper-pagination-bullet-active {
  @apply !bg-red-500;
}
</style>

<!-- https://a-static.besthdwallpaper.com/john-wick-movie-wallpaper-3440x1440-108073_15.jpg -->
