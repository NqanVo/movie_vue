<template>
  <Header />
  <section class="container mx-auto flex min-h-screen flex-col gap-11 bg-gray-100 px-4 xl:max-w-screen-xl 2xl:px-0">
    <div v-if="!isLoading" class="">
      <div
        v-if="dataMovie && Object.keys(dataMovie).length > 0"
        class="grid grid-cols-1 gap-10 rounded-lg p-4 md:grid-cols-2"
      >
        <div class="">
          <img
            class="h-auto w-full object-cover"
            :src="`${IMAGE_URL + dataMovie.backdrop_path}`"
            :alt="dataMovie.title"
          />
        </div>
        <div class="">
          <h3>{{ dataMovie.title }}</h3>
          <div class="flex items-center gap-4">
            <p class="rounded-lg bg-yellow-500 p-1 text-xs font-bold uppercase text-black">vote</p>
            <p>{{ dataMovie.vote_average }} / 10</p>
          </div>
          <!-- <p class="text-xs text-gray-500">{{ dataMovie.genres }}</p> -->
          <div class="flex gap-2">
            <p v-for="gen in dataMovie.genres" :key="gen.id" class="rounded-lg bg-green-500 p-1 font-bold text-white">
              {{ gen.name }}
            </p>
          </div>
          <p>
            {{ dataMovie.overview }}
          </p>
          <a :href="dataMovie.homepage" target="_blank"
            ><button class="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-bold uppercase text-white">
              <svg
                class="h-4 w-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              Play now
            </button></a
          >
        </div>
        <div class="md:col-span-2">
          <div class="">
            <h3>Preview</h3>
            <p>
              {{ dataMovie.overview }}
            </p>
            <img
              :src="`https://image.tmdb.org/t/p/original/` + dataMovie.poster_path"
              alt=""
              class="mx-auto h-auto w-full md:max-w-sm"
            />
            <p>
              Production Companies:
              <span v-for="companies in dataMovie.production_companies" :key="companies.id"
                >{{ companies.name }}.
              </span>
            </p>
            <div v-if="dataMovie.casts" class="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
              <div v-for="cast in dataMovie.casts.cast" :key="cast.cast_id" class="flex flex-col">
                <img
                  :src="IMAGE_URL + cast.profile_path"
                  :alt="cast.name"
                  @error="(event)=> (event.target as HTMLImageElement).src = `https://cdn.freebiesupply.com/logos/large/2x/tv-movie-logo-svg-vector.svg`"
                  class="h-56 w-full object-cover"
                />
                <h4>{{ cast.name }}</h4>
                <p>Character: {{ cast.character }}</p>
              </div>
            </div>
          </div>
          <div class="">
            <h3>Trailer</h3>
            <!-- <video src="https://www.youtube.com/embed/oEOehmMNuHs" width="320" height="240" controls autoplay /> -->
            <div class="relative mx-auto h-0 pb-[56.25%]">
              <!-- 16:9 view -->
              <iframe
                class="absolute h-full w-full"
                src="https://www.youtube.com/embed/oEOehmMNuHs"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="grid grid-cols-1 gap-10 rounded-lg p-4 text-center">
        <h4>Something went wrong with this movie, please try again or change the language</h4>
      </div>
    </div>
    <div v-else>
      <LoadingVue />
    </div>
  </section>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'

import { getCastMovie, getDetailMovie } from '@/services/getMovies'
import { IMAGE_URL } from '@/assets/key'
import LoadingVue from '@/components/Loading/Loading.vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  components: {
    Header,
    Footer,
    LoadingVue
  },
  methods: {
    getDetailMovie() {
      return getDetailMovie(this.idMovie, this.getLanguage.code)
    },
    getCastMovie() {
      return getCastMovie(this.idMovie)
    },
    ...mapActions(['fecthMovieDetail'])
  },
  async mounted() {
    await this.fecthMovieDetail({ idMovie: this.idMovie, language: this.getLanguage })
  },
  watch: {
    // dataMovie: function (newVal, oldVal) {
    //   console.log(JSON.parse(JSON.stringify(oldVal)))
    //   console.log(JSON.parse(JSON.stringify(newVal)))
    // },
    getLanguage: async function () {
      await this.fecthMovieDetail({ idMovie: this.idMovie, language: this.getLanguage })
    }
  },
  computed: {
    ...mapGetters(['getLanguage', 'dataMovie', 'isLoading'])
  },
  data() {
    return {
      idMovie: this.$route.params.id as string,
      IMAGE_URL
    }
  }
})
</script>

<style scoped></style>
