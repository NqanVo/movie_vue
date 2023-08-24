import {defineStore} from "pinia"
import { getCastMovie, getDetailMovie } from "@/services/getMovies"
import type { MovideDetail } from "@/types/MovieDetail.interface"

export const useGetMovieDetail = defineStore("MovieDetail",{
    state:()=>{
        return {
            isLoading : false as boolean,
            data : {} as MovideDetail 
        }
    },
    actions:{
       async getMovieDetail(idMovie:number|string, language: { code: string }){
        try {
            this.$state.isLoading = true;
            const resMovie = await getDetailMovie(idMovie, language.code);
            const resCastsMovie = await getCastMovie(idMovie);
            this.$state.data = resMovie;
            this.$state.data.casts = resCastsMovie
            this.$state.isLoading = false;
          } catch (error) {
            this.$state.data = {};
            this.$state.isLoading = false;

          }
       }
    },
    getters:{
        getterMovieDetail: (state)=> state.data,
        getterIsLoading: (state)=> state.isLoading
    }
})