import { createStore } from 'vuex'

import storeConfigMovieDetail from './MovieDetail.module/index'
import storeConfigLanguage from './Language.module/index'

const store = createStore({
  modules: {
    MovieDetailModule: {
      ...storeConfigMovieDetail
    },
    SetLanguageModule: {
      ...storeConfigLanguage
    }
  }
})

export default store
