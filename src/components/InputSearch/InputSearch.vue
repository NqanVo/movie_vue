<template>
    <form class="">
        <label for="default-search" class="sr-only mb-2 text-sm font-medium text-white">Search</label>
        <div class="relative bg-transparent px-3">
          <input type="search" id="default-search"
            class="block w-full rounded-lg border border-white bg-transparent px-2 md:px-3 py-2 text-sm text-white outline-none placeholder:text-white/90"
            placeholder="What do you want to watch?" required />
          <div class="pointer-events-none absolute inset-y-0 right-0 items-center pr-4 md:pr-6 hidden md:flex">
            <svg aria-hidden="true" class="h-5 w-5 text-white dark:text-white" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <!-- <div class="absolute inset-0 top-full w-full h-fit bg-white text-black mt-2 py-2 rounded-lg shadow-lg">
                <p class="block cursor-pointer hover:bg-gray-500/30 px-2 text-sm xl:text-base">Women</p>
                <p class="block cursor-pointer hover:bg-gray-500/30 px-2 text-sm xl:text-base">Women</p>
                <p class="block cursor-pointer hover:bg-gray-500/30 px-2 text-sm xl:text-base">Women</p>
                <p class="block cursor-pointer hover:bg-gray-500/30 px-2 text-sm xl:text-base">Women</p>
          </div> -->
        </div>
      </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        

        return {}
    }
})
</script>

<style scoped>

</style>