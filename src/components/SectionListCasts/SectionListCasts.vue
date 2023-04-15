<template>
  <section class="container mx-auto xl:max-w-screen-xl flex flex-col gap-11 mt-11 px-4 2xl:px-0">
    <div class="flex justify-between">
      <h3 class="">Featured Casts</h3>
      <RouterLink :to="viewMore || `/`" class="flex items-center gap-2 font-medium text-primary">
        See more
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </RouterLink>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-20 items-center">
      <div class="w-full">
        <img class="h-2/3 w-full object-contain"
          src="https://upload.wikimedia.org/wikipedia/vi/e/e7/John_Wick_4_teaser_poster.jpg" alt="" />
        <div class="flex flex-col gap-2 mt-2">
          <h4 class="">Keanu Reeves</h4>
        </div>
      </div>
      <div class="w-full">
        <img class="h-2/3 w-full object-contain"
          src="https://upload.wikimedia.org/wikipedia/vi/e/e7/John_Wick_4_teaser_poster.jpg" alt="" />
        <div class="flex flex-col gap-2 mt-2">
          <h4 class="">Keanu Reeves</h4>
        </div>
      </div>
      <div class="w-full">
        <img class="h-2/3 w-full object-contain"
          src="https://upload.wikimedia.org/wikipedia/vi/e/e7/John_Wick_4_teaser_poster.jpg" alt="" />
        <div class="flex flex-col gap-2 mt-2">
          <h4 class="">Keanu Reeves</h4>
        </div>
      </div>
      <div class="w-full">
        <img class="h-2/3 w-full object-contain"
          src="https://upload.wikimedia.org/wikipedia/vi/e/e7/John_Wick_4_teaser_poster.jpg" alt="" />
        <div class="flex flex-col gap-2 mt-2">
          <h4 class="">Keanu Reeves</h4>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props:{
        viewMore: String
    }
})
</script>

<style scoped>

</style>