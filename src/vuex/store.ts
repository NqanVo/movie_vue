import { getCastMovie, getDetailMovie } from "@/services/getMovies";
import type { MovideDetail } from "@/types/MovieDetail.interface";
import { createStore } from "vuex";

interface Language {
  code: string
}

const store = createStore({
  state() {
    const savedLanguage = localStorage.getItem("language")
    return {
      language: savedLanguage ? JSON.parse(savedLanguage) : { code: "en"},
      getMovieDetail : {
        isLoading:false,
        data: {} as MovideDetail
      }
    };
  },
  getters: {
    getLanguage: (state) => state.language,
    dataMovie: (state) => state.getMovieDetail.data,
    isLoading: (state) => state.getMovieDetail.isLoading,
  },
  mutations: {
    setLanguage(state, language: Language) {
      state.language = language;
      localStorage.setItem("language", JSON.stringify(language));
    },
    setMovieDetailStart ( state){
      state.getMovieDetail.isLoading = true
    },
    setMovieDetailSuccess ( state, payload){
      state.getMovieDetail.data = payload
      state.getMovieDetail.isLoading = false
    },
    setMovieDetailError ( state){
      state.getMovieDetail.isLoading = false
    }
  },
  actions: {
    setLanguage({ commit }, language: Language) {
      commit("setLanguage", language);
    },
    async fecthMovieDetail({commit}, payload : {idMovie: number | string, language:{code:string}}){
      try {
        commit('setMovieDetailStart')
        let data = await getDetailMovie(payload.idMovie, payload.language.code)
        data.casts = await getCastMovie(payload.idMovie)
        commit('setMovieDetailSuccess', data)
      } catch (error) {
        commit('setMovieDetailError')
      }
    }
  },
});

export default store