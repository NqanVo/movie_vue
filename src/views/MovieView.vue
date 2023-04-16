<template>
  <Header></Header>
  <section
    class="container mx-auto flex min-h-fit flex-col gap-11 bg-gray-100 px-1 md:px-2 xl:max-w-screen-xl xl:px-4 2xl:px-0"
  >
    <div v-if="!isLoading" class="">
      <div
        v-if="dataMovie && Object.keys(dataMovie).length > 0"
        class="grid grid-cols-1 gap-10 rounded-lg p-4 md:grid-cols-3"
      >
        <div class="col-span-1 md:col-span-1">
          <img
            class="h-auto w-full rounded-lg object-cover shadow-lg"
            :src="`${IMAGE_URL + dataMovie.poster_path}`"
            :alt="dataMovie.title"
          />
        </div>
        <div class="col-span-1 flex flex-col gap-4 md:col-span-2">
          <h3>{{ dataMovie.title }}</h3>
          <Button
            :icon="`&lt;svg class=&quot;h-4 w-4 text-white&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;&gt; &lt;circle cx=&quot;12&quot; cy=&quot;12&quot; r=&quot;10&quot; /&gt; &lt;polygon points=&quot;10 8 16 12 10 16 10 8&quot; /&gt; &lt;/svg&gt;`"
            :title="`Play Now`"
            :path="dataMovie.homepage"
          ></Button>
          <h4>Storyline</h4>
          <p class="italic">
            {{ dataMovie.overview }}
          </p>
          <div class="grid w-full grid-cols-2 items-center md:w-1/2">
            <h4>Rating</h4>
            <div>{{ dataMovie.vote_average }}</div>
            <h4>Release</h4>
            <div>{{ dataMovie.release_date }}</div>
            <h4>Genres</h4>
            <div>
              <span v-for="(gen, index) in dataMovie.genres" :key="gen.id">
                {{ gen.name }}
                <span v-if="index !== dataMovie.genres.length - 1">, </span>
              </span>
            </div>
            <h4>Countries</h4>
            <div>
              <span v-for="(coun, index) in dataMovie.production_countries" :key="coun.iso_3166_1">
                {{ coun.name }}
                <span v-if="index !== dataMovie.genres.length - 1">, </span>
              </span>
            </div>
            <h4>Duration</h4>
            <div>{{ dataMovie.runtime }} minute</div>
          </div>
          <h4>Casts</h4>
          <div v-if="dataMovie.casts" class="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
            <div
              v-for="cast in dataMovie.casts.cast.slice(0, numberCasts)"
              :key="cast.cast_id"
              class="flex w-full transform items-center gap-2 rounded-lg bg-slate-200 p-2 transition-all hover:scale-105"
            >
              <img
                :src="IMAGE_URL + cast.profile_path"
                :alt="cast.name"
                @error="(event)=> (event.target as HTMLImageElement).src = `https://cdn.freebiesupply.com/logos/large/2x/tv-movie-logo-svg-vector.svg`"
                class="h-16 w-16 rounded-full object-cover"
              />
              <div class="text-sm">
                <p class="font-bold">{{ cast.name }}</p>
                <p>({{ cast.character }})</p>
              </div>
            </div>
            <p
              class="col-span-1 cursor-pointer text-right underline md:col-span-2 xl:col-span-4"
              @click="viewAllCasts = !viewAllCasts"
            >
              All casts
            </p>
          </div>
        </div>
        <div class="md:col-span-3">
          <div class="w-full">
            <h3>Trailer</h3>
            <div class="mx-auto w-full md:w-1/2">
              <div
                v-if="dataMovie.videos"
                v-for="video in dataMovie.videos.results.slice(0, 1)"
                :key="video.key"
                class="relative mx-auto h-0 pb-[56.25%]"
              >
                <iframe
                  class="absolute h-full w-full rounded-lg shadow-lg"
                  :src="`https://www.youtube.com/embed/${video.key}`"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
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
  <Footer></Footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'

import { getCastMovie, getDetailMovie } from '@/services/getMovies'
import { IMAGE_URL } from '@/assets/key'
import LoadingVue from '@/components/Loading/Loading.vue'
import Button from '@/components/Button/Button.vue'
import { mapActions, mapGetters } from 'vuex'
import { setSEO } from '@/seo/meta'
import type { MovideDetail } from '@/types/MovieDetail.interface'

export default defineComponent({
  components: {
    Header,
    Footer,
    LoadingVue,
    Button
  },
  methods: {
    getDetailMovie() {
      return getDetailMovie(this.idMovie, this.getLanguage.code)
    },
    getCastMovie() {
      return getCastMovie(this.idMovie)
    },
    async setMovieTitle() {
      await this.fecthMovieDetail({ idMovie: this.idMovie, language: this.getLanguage })
      this.setSEO(
        `${this.dataMovie.title} - TV MOVIE`,
        this.dataMovie.overview,
        this.IMAGE_URL + this.dataMovie.poster_path
      )
    },
    setSEO,
    ...mapActions(['fecthMovieDetail'])
  },
  async mounted() {
    await this.fecthMovieDetail({ idMovie: this.idMovie, language: this.getLanguage })
    this.setMovieTitle()
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.id !== from.params.id) {
      document.title = this.movieTitle
      this.idMovie = to.params.id as string
      this.fecthMovieDetail({ idMovie: this.idMovie, language: this.getLanguage }).then(() => {
        next()
      })
    } else {
      next()
    }
  },
  watch: {
    dataMovie: function (n, o) {
      console.log(JSON.parse(JSON.stringify(n)))
    },
    getLanguage: async function () {
      await this.fecthMovieDetail({ idMovie: this.idMovie, language: this.getLanguage })
    },
    idMovie: function () {
      this.setMovieTitle()
    },
    viewAllCasts: function () {
      if (this.viewAllCasts) this.numberCasts = this.dataMovie.casts.cast.length
      else this.numberCasts = 4
    }
  },
  computed: {
    movieTitle(): string {
      return `${this.dataMovie.title} - TV MOVIE`
    },
    ...mapGetters(['getLanguage', 'dataMovie', 'isLoading'])
  },
  data() {
    return {
      idMovie: this.$route.params.id as string,
      IMAGE_URL,
      viewAllCasts: false,
      numberCasts: 4
    }
  }
})
</script>

<style scoped></style>
