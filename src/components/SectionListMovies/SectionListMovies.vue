<template>
  <section class="container mx-auto mt-11 flex flex-col gap-11 px-4 xl:max-w-screen-xl 2xl:px-0">
    <div class="flex justify-between">
      <h3 class="">{{ listTitle }}</h3>
      <RouterLink :to="viewMore || `/`" class="flex items-center gap-2 font-medium text-primary">
        See more
        <svg
          class="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </RouterLink>
    </div>
    <!-- <div class=" grid grid-cols-2 items-center gap-10 md:grid-cols-3 xl:grid-cols-4 xl:gap-20">
    </div> -->
    <div>
      <swiper
        v-if="listData.length > 0"
        :slides-per-view="4"
        :slides-per-group="2"
        :space-between="50"
        :breakpoints="{
          300: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 30
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 40
          },
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 2,
            spaceBetween: 50
          }
        }"
        :navigation="true"
        :modules="modules"
      >
        <swiper-slide v-for="(movie, i) in listData.slice(0, 8)" :key="i" class="my-auto">
          <CardMovie v-if="i < 7" :movie="movie" />
          <RouterLink :to="`/`" v-else class="flex items-center justify-center">
            <button class="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-bold uppercase text-white">
              See more
            </button>
          </RouterLink>
        </swiper-slide>
      </swiper>
      <!-- <Loading v-else /> -->
      <SectionListSkeleton v-else />
    </div>
  </section>
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import CardMovie from '@/components/Card/CardMovie.vue'
import SectionListSkeleton from '../SectionListSkeleton/SectionListSkeleton.vue'
import type { GetMoviesResponse } from '@/types/GetMovies.interface'
import Loading from '../Loading/Loading.vue'
export default defineComponent({
  components: {
    CardMovie,
    Swiper,
    SwiperSlide,
    Loading,
    SectionListSkeleton
  },
  props: {
    listData: {
      type: Array as () => GetMoviesResponse['results'],
      required: true
    },
    listTitle: {
      type: String,
      require: true
    },
    viewMore: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      modules: [Pagination, Navigation]
    }
  }
})
</script>

<style scoped></style>
