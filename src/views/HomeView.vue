<template>
  <Header></Header>
  <div class="relative mx-auto h-screen w-full max-w-[1440px] md:h-[600px]">
    <img
      class="h-full w-full object-cover"
      src="https://a-static.besthdwallpaper.com/john-wick-movie-wallpaper-3440x1440-108073_15.jpg"
      alt=""
    />
    <div class="absolute inset-0 z-10 h-full w-full bg-black/40"></div>
    <div
      class="absolute inset-0 z-10 mx-auto grid h-full w-full max-w-screen-xl grid-cols-2 items-center px-4 text-white md:grid-cols-3 2xl:px-0"
    >
      <div class="flex flex-col items-start gap-4">
        <h2 class="">John Wick 3 : Parabellum</h2>
        <div class="flex items-center gap-4">
          <p class="rounded-lg bg-yellow-500 p-1 text-xs font-bold uppercase text-black">vote</p>
          <p>8 / 10</p>
        </div>
        <p class="text-sm font-medium">
          John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million
          price tag on his head, he is the target of hit men and women everywhere.
        </p>
        <button class="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-bold uppercase">
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
          Watch trailer
        </button>
      </div>
    </div>
  </div>
  <SectionListMovies v-if="listMoviesPopular" :listTitle="`Popular Movie`" :viewMore="`/popular-movie`" :listData="listMoviesPopular.results || []" />
  <SectionListMovies v-if="listMoviesTopRated" :listTitle="`Top Rated`" :viewMore="`/top-rated`" :listData="listMoviesTopRated.results || []" />

  <SectionListCasts :viewMore="`/casts`" />
  <Footer></Footer>

  
</template>

<script lang="ts">
// import { API_KEY, BASE_URL } from '@/assets/key';
import { defineComponent } from 'vue'
import SectionListMovies from '@/components/SectionListMovies/SectionListMovies.vue'
import SectionListCasts from '@/components/SectionListCasts/SectionListCasts.vue'
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'
import { getMoviesPopular, getMoviesTopRated } from '@/services/getMovies'
import type { GetMoviesResponse } from '@/types/GetMovies.interface'
import { mapGetters } from 'vuex'
document.title = 'TV MOVIE'

export default defineComponent({
  components: {
    SectionListMovies,
    SectionListCasts,
    Header,
    Footer
  },
  methods: {
    getMoviesPopular() {
      return getMoviesPopular(1,this.getLanguage.code)
    },
    getMoviesTopRated() {
      return getMoviesTopRated(1,this.getLanguage.code)
    }
  },
  async mounted() {
    setTimeout(async() => {
      this.listMoviesPopular = await this.getMoviesPopular()
    }, 1500);
    setTimeout(async ()=>{
      this.listMoviesTopRated= await this.getMoviesTopRated()
    }, 1000)
  },
  watch:{
    getLanguage : async function(){
      this.listMoviesPopular = await this.getMoviesPopular()
      this.listMoviesTopRated= await this.getMoviesTopRated()
    }
  },
  computed:{
    ...mapGetters(['getLanguage'])
  },
  data() {
    return {
      listMoviesPopular: {} as GetMoviesResponse,
      listMoviesTopRated: {} as GetMoviesResponse,
    }
  }
})
</script>

<style scoped></style>
