<template>
  <RouterLink :to="path || `/`">
    <button class="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-bold uppercase text-white">
      <span v-html="icon"></span>
      {{ title }}
    </button>
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    icon: {
      type: String
    },
    title: {
      type: String
    },
    path: {
      type: String
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
