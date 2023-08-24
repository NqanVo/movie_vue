import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import store from '@/vuex/store'
import './assets/main.css'

const app = createApp(App)
app.use(router)
//vuex
app.use(store)
//pinia
app.use(createPinia())
app.mount('#app')


