<template>
  <header
    :class="`fixed left-0 right-0 top-0 z-20 ${
      isHome ? (scrollHeight > 150 ? 'bg-black/80' : 'md:bg-transparent') : 'bg-black/80'
    } ${isOpenMenu ? `h-screen bg-black/80` : ``} ${
      !isHome ? `bg-black/80` : ``
    } transition-all duration-200 md:h-auto`"
  >
    <nav
      class="container mx-auto grid w-full grid-cols-2 items-center px-4 py-4 text-white md:grid-cols-4 xl:max-w-screen-xl xl:grid-cols-3 2xl:px-0"
    >
      <RouterLink to="/" class="">
        <img
          class="h-14 w-14 object-cover"
          src="https://cdn.freebiesupply.com/logos/large/2x/tv-movie-logo-svg-vector.svg"
          alt=""
        />
      </RouterLink>
      <div
        :class="`col-span-3 transform transition-all duration-200 md:col-span-2 md:block md:translate-x-0  md:opacity-100 xl:col-span-1 ${
          isOpenMenu ? `block translate-x-0 opacity-100` : `hidden -translate-x-full opacity-0`
        }`"
      >
        <InputSearch />
      </div>
      <div class="col-start-2 row-start-1 flex items-center justify-end gap-6 md:col-start-auto md:row-start-auto">
        <div>
          <select
            id="countries"
            class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-1 text-sm font-bold text-gray-900 outline-none"
            :value="getLanguage.code"
            @change="(event) => setLanguage({ code: (event.target as HTMLSelectElement).value})"
          >
            <option value="en">English</option>
            <option value="vi">Tiếng Việt</option>
          </select>
        </div>
        <a href="#!" class="hidden md:block">Sign in</a>
        <button
          v-if="!isOpenMenu"
          @click="isOpenMenu = true"
          href=""
          class="block rounded-full bg-primary p-1 md:hidden"
        >
          <svg
            class="h-6 w-6 text-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="4" y1="8" x2="20" y2="8" />
            <line x1="4" y1="16" x2="20" y2="16" />
          </svg>
        </button>
        <button
          v-if="isOpenMenu"
          @click="isOpenMenu = false"
          href=""
          class="block rounded-full bg-primary p-1 md:hidden"
        >
          <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>
  </header>
  <div :class="`h-auto bg-transparent py-4 ${isHome ? `hidden` : `block`}`">
    <a href="#" class="">
      <img
        class="invisible h-14 w-14 object-cover"
        src="https://cdn.freebiesupply.com/logos/large/2x/tv-movie-logo-svg-vector.svg"
        alt=""
      />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapMutations, mapState } from 'vuex'
import InputSearch from '@/components/InputSearch/InputSearch.vue'
import store from '@/vuex/store'

export default defineComponent({
  components: {
    InputSearch
  },

  setup() {
    // console.log(document.location.pathname.split("/")[1]);
  },
  data() {
    return {
      scrollHeight: 0,
      isOpenMenu: false,
      isHome: document.location.pathname.split('/')[1] === `` ? true : false
      // language: store.state.language
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.scrollHeight = document.documentElement.scrollTop
    },
    ...mapMutations(['setLanguage'])
  },
  computed: {
    ...mapGetters(['getLanguage'])
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }
})
</script>

<style scoped></style>
