<template>
  <div>
    <swiper
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
    >
      <swiper-slide v-for="i in 4" :key="i" class="my-auto">
        <div
          role="status"
          class="max-w-sm animate-pulse rounded border border-gray-200 p-4 shadow dark:border-gray-700 md:p-6 overflow-hidden"
        >
          <div class="mb-4 flex h-48 items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
            <svg
              class="h-12 w-12 text-gray-200 dark:text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path
                d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"
              />
            </svg>
          </div>
          <div class="mb-2.5 h-3 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div class="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div class="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div class="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div class="h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <span class="sr-only">Loading...</span>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
export default defineComponent({
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
