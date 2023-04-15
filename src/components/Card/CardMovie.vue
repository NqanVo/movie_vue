<template>
  <div class="min-h-[500px] w-full transform transition-all duration-200">
    <img
      class="h-[330px] w-full object-cover"
      :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
      :alt="movie.title"
    />
    <RouterLink :to="`/movie/${movie.id}`">
      <div class="mt-2 flex flex-col justify-between gap-2">
        <p class="text-xs text-gray-500">Release: {{ movie.release_date }}</p>
        <h4>{{ movie.title }}</h4>

        <div class="flex items-center gap-4">
          <p class="rounded-lg bg-yellow-500 p-1 text-xs font-bold uppercase text-black">vote</p>
          <p>
            <span class="text-primary">{{ movie.vote_average }}</span> / 10
          </p>
        </div>
        <p class="text-xs text-gray-500">{{ movie.popularity }}</p>
      </div>
    </RouterLink>
  </div>
</template>

<script lang="ts">
import type { Movie } from '@/types/GetMovies.interface'
import { IMAGE_URL } from '@/assets/key'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    movie: {
      type: Object as () => Movie,
      required: true
    }
  }
})
</script>

<style scoped></style>
