<template>
  <Header />
  <section class="container mx-auto flex min-h-[500px] flex-col gap-11 bg-gray-100 px-4 xl:max-w-screen-xl 2xl:px-0">
    <div class="text-center">
      <h4>Link does not exist</h4>
      <RouterLink to="/">Back home</RouterLink>
    </div>
  </section>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'
export default defineComponent({
  components: {
    Header,
    Footer
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
