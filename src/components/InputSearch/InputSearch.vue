<template>
  <form class="">
    <label for="default-search" class="sr-only mb-2 text-sm font-medium text-white">Search</label>
    <div class="relative bg-transparent px-3">
      <input
        type="search"
        id="default-search"
        class="block w-full rounded-lg border border-white bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-white/90 md:px-3"
        placeholder="What do you want to watch?"
        v-model="stringSearch"
        autocomplete="off"
        v-debounce:500="getMovieWithSearch"
        @click="openResultsSearch = true"
        @search="
          () => {
            resultsSearch = { page: 0, results: [], total_pages: 0, total_results: 0 }
            openResultsSearch = false
          }
        "
        required
      />
      <div v-if="!stringSearch" class="">
        <div class="pointer-events-none absolute inset-y-0 right-0 hidden items-center pr-4 md:flex md:pr-6">
          <svg
            aria-hidden="true"
            :class="`h-5 w-5 text-white dark:text-white ${stringSearch.length <= 0 ? '' : 'hidden'}`"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>
      <!-- results search  -->
      <div
        v-if="resultsSearch.results.length > 0 && openResultsSearch"
        class="absolute inset-0 top-full mt-2 h-fit w-full rounded-lg bg-white py-2 text-black shadow-lg"
      >
        <h4 class="px-2">Results search:</h4>
        <RouterLink
          v-for="result in resultsSearch.results.slice(0, 7)"
          :key="result.id"
          :to="{ name: 'movie', params: { id: result.id } }"
          class="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm capitalize hover:bg-gray-500/30 xl:text-base"
          @click="
            () => {
              stringSearch = result.title
              openResultsSearch = false
            }
          "
        >
          <img :src="IMAGE_URL + result.poster_path" :alt="result.title" class="h-10 w-10 rounded-full object-cover" />
          {{ result.title }}
        </RouterLink>
        <h4 class="px-2">{{ resultsSearch.total_results }} results</h4>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import axios from 'axios'
import { vue3Debounce } from 'vue-debounce'
import { defineComponent } from 'vue'
import { IMAGE_URL } from '@/assets/key'
import type MovieSearchResult from '@/types/ResultsSearch.interface'
export default defineComponent({
  directives: {
    debounce: vue3Debounce({ lock: true })
  },
  methods: {
    async getMovieWithSearch() {
      try {
        if (this.stringSearch !== '') {
          const res = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=1&include_adult=false&query=${this.stringSearch.trim()}`
          )
          this.resultsSearch = res.data
        } else this.resultsSearch = { page: 0, results: [], total_pages: 0, total_results: 0 }
      } catch (error) {
        this.resultsSearch = { page: 0, results: [], total_pages: 0, total_results: 0 }
      }
    }
  },
  data() {
    return {
      stringSearch: '' as string,
      openResultsSearch: false,
      resultsSearch: { page: 0, results: [], total_pages: 0, total_results: 0 } as MovieSearchResult,
      IMAGE_URL
    }
  }
})
</script>

<style scoped></style>
