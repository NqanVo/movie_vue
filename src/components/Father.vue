<template>
    <div class="flex flex-col gap-4 justify-center bg-red-500">
        <h1>father</h1>
        <slot></slot>
    </div>
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