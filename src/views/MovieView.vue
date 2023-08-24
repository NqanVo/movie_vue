<template>
  <Header></Header>
  <section
    class="container mx-auto flex min-h-fit flex-col gap-11 bg-gray-100 px-1 md:px-2 xl:max-w-screen-xl xl:px-4 2xl:px-0">
    <div v-if="!getterIsLoading" class="">
      <div v-if="getterMovieDetail && Object.keys(getterMovieDetail).length > 0"
        class="grid grid-cols-1 gap-10 rounded-lg p-4 md:grid-cols-3">
        <div class="col-span-1 md:col-span-1">
          <img class="h-auto w-full rounded-lg object-cover shadow-lg"
            :src="`${IMAGE_URL + getterMovieDetail.poster_path}`" :alt="getterMovieDetail.title" />
        </div>
        <div class="col-span-1 flex flex-col gap-4 md:col-span-2">
          <h3>{{ getterMovieDetail.title }}</h3>
          <!-- <Button
            :icon="`&lt;svg class=&quot;h-4 w-4 text-white&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;&gt; &lt;circle cx=&quot;12&quot; cy=&quot;12&quot; r=&quot;10&quot; /&gt; &lt;polygon points=&quot;10 8 16 12 10 16 10 8&quot; /&gt; &lt;/svg&gt;`"
            :title="`Play Now`" :path="getterMovieDetail.homepage"></Button> -->

          <a :href="getterMovieDetail.homepage"
            class="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-bold uppercase text-white justify-center w-full md:max-w-[200px]"
            target="_blank">
            <span
              v-html="`&lt;svg class=&quot;h-4 w-4 text-white&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;&gt; &lt;circle cx=&quot;12&quot; cy=&quot;12&quot; r=&quot;10&quot; /&gt; &lt;polygon points=&quot;10 8 16 12 10 16 10 8&quot; /&gt; &lt;/svg&gt;`"></span>

            Play Now</a>
          <h4>Storyline</h4>
          <p class="italic text-justify md:text-left">
            {{ getterMovieDetail.overview }}
          </p>
        
          <div class="w-full md:w-1/2 flex flex-col gap-4">
            <div class="flex justify-between gap-5 border-b-2 border-b-gray-300">
              <h4>Rating</h4>
              <span>{{ getterMovieDetail.vote_average }}</span>
            </div>
            <div class="flex justify-between gap-5 border-b-2 border-b-gray-300">
              <h4>Release</h4>
              <span>{{ getterMovieDetail.release_date }}</span>
            </div>
            <div class="flex justify-between gap-5 border-b-2 border-b-gray-300">
              <h4>Genres</h4>
              <div v-if="getterMovieDetail.genres">
                <span v-for="(gen, index) in getterMovieDetail.genres" :key="gen.id">
                  {{ gen.name }}
                  <span v-if="index !== getterMovieDetail.genres.length - 1">, </span>
                </span>
              </div>
            </div>
            <div class="flex justify-between gap-5 border-b-2 border-b-gray-300">
              <h4>Countries</h4>
              <div v-if="getterMovieDetail.production_countries">
                <span v-for="(coun, index) in getterMovieDetail.production_countries" :key="coun.iso_3166_1">
                  {{ coun.name }}
                  <span v-if="index !== getterMovieDetail.production_countries.length - 1">, </span>
                </span>
              </div>
            </div>
            <div class="flex justify-between gap-5 border-b-2 border-b-gray-300">
              <h4>Duration</h4>
              <div>{{ getterMovieDetail.runtime }} minute</div>
            </div>
          </div>
          <h4>Casts</h4>
          <div v-if="getterMovieDetail.casts && getterMovieDetail.casts.cast"
            class="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
            <div v-for="cast in getterMovieDetail.casts.cast.slice(0, numberCasts)" :key="cast.cast_id"
              class="flex w-full transform items-center gap-2 rounded-lg bg-slate-200 p-2 transition-all hover:scale-105">
              <img :src="IMAGE_URL + cast.profile_path" :alt="cast.name"
                @error="(event) => (event.target as HTMLImageElement).src = `https://cdn.freebiesupply.com/logos/large/2x/tv-movie-logo-svg-vector.svg`"
                class="h-16 w-16 rounded-full object-cover" />
              <div class="text-sm">
                <p class="font-bold">{{ cast.name }}</p>
                <p>({{ cast.character }})</p>
              </div>
            </div>
            <p class="col-span-1 cursor-pointer text-right underline md:col-span-2 xl:col-span-4"
              @click="viewAllCasts = !viewAllCasts">
              All casts
            </p>
          </div>
        </div>
        <div v-if="getterMovieDetail.video" class="md:col-span-3">
          <div class="w-full">
            <h3>Trailer</h3>
            <div class="mx-auto w-full md:w-1/2">
              <div v-for="video in getterMovieDetail.video.results.slice(0, 1)" :key="video.key"
                class="relative mx-auto h-0 pb-[56.25%]">
                <iframe class="absolute h-full w-full rounded-lg shadow-lg"
                  :src="`https://www.youtube.com/embed/${video.key}`" frameborder="0" allowfullscreen></iframe>
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

<script setup lang="ts">
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'
import LoadingVue from '@/components/Loading/Loading.vue'
import Button from '@/components/Button/Button.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { IMAGE_URL as IMAGE } from '@/assets/key'
import { setSEO } from '@/seo/meta'
import { useGetMovieDetail } from '@/pinia/movieDetail.store.js'
import { useOther } from '@/pinia/other.store'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const storeMoviedetail = useGetMovieDetail()
const storeOther = useOther()
const route = useRoute()
const { getMovieDetail } = storeMoviedetail
const { getterMovieDetail, getterIsLoading } = storeToRefs(storeMoviedetail)
const { getterLanguage } = storeToRefs(storeOther)
const IMAGE_URL = ref<string>(IMAGE)
let viewAllCasts = ref<boolean>(false)
const numberCasts = computed(() => (!viewAllCasts.value ? 4 : getterMovieDetail.value.casts?.cast?.length))
const idMovie = ref(useRoute().params.id as string)

const setPageTitle = async function () {
  await getMovieDetail(idMovie.value, getterLanguage.value)
  setSEO(
    `${getterMovieDetail.value.title} - TV MOVIE`,
    getterMovieDetail.value.overview,
    getterMovieDetail.value.poster_path ? IMAGE_URL + getterMovieDetail.value.poster_path : ''
  )
}

onMounted(async () => {
  try {
    await getMovieDetail(idMovie.value, getterLanguage.value)
    setPageTitle()
    // console.log(JSON.parse(JSON.stringify(getterMovieDetail.value)));

  } catch (error) {
    console.error(error)
  }
})
watch([getterLanguage, idMovie, route], async () => {
  try {
    idMovie.value = route.params.id as string
    await getMovieDetail(idMovie.value, getterLanguage.value)
    setPageTitle()
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scoped></style>
