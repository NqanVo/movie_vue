<template>
  <Header></Header>
  <Banner></Banner>
  <SectionListMovies
    v-if="listMoviesPopular"
    :listTitle="`Popular Movie`"
    :viewMore="`/popular-movie`"
    :listData="listMoviesPopular.results || []"
  />
  <SectionListMovies
    v-if="listMoviesTopRated"
    :listTitle="`Top Rated`"
    :viewMore="`/top-rated`"
    :listData="listMoviesTopRated.results || []"
  />

  <SectionListCasts :viewMore="`/casts`" :listData="['test']" :listTitle="`Featured Casts`" />
  <Footer></Footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Layout/Header.vue'
import Banner from '@/components/Banner/Banner.vue'
import SectionListMovies from '@/components/SectionListMovies/SectionListMovies.vue'
import SectionListCasts from '@/components/SectionListCasts/SectionListCasts.vue'
import Footer from '@/components/Layout/Footer.vue'
import Button from '@/components/Button/Button.vue'
import { getMoviesPopular, getMoviesTopRated } from '@/services/getMovies'
import type { GetMoviesResponse } from '@/types/GetMovies.interface'
import { mapGetters } from 'vuex'
document.title = 'TV MOVIE'

export default defineComponent({
  components: {
    SectionListMovies,
    SectionListCasts,
    Header,
    Banner,
    Footer,
    Button
  },
  methods: {
    getMoviesPopular() {
      return getMoviesPopular(1, this.getLanguage.code)
    },
    getMoviesTopRated() {
      return getMoviesTopRated(1, this.getLanguage.code)
    }
  },
  async mounted() {
    setTimeout(async () => {
      this.listMoviesPopular = await this.getMoviesPopular()
    }, 1500)
    setTimeout(async () => {
      this.listMoviesTopRated = await this.getMoviesTopRated()
    }, 1000)
  },
  watch: {
    getLanguage: async function () {
      this.listMoviesPopular = await this.getMoviesPopular()
      this.listMoviesTopRated = await this.getMoviesTopRated()
    }
  },
  computed: {
    ...mapGetters(['getLanguage'])
  },
  data() {
    return {
      listMoviesPopular: {} as GetMoviesResponse,
      listMoviesTopRated: {} as GetMoviesResponse
    }
  }
})
</script>

<style scoped></style>
