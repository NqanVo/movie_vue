import type { GetMoviesResponse } from "@/types/GetMovies.interface";
import axios from "axios";
import { defineStore } from "pinia";

export const useGetListMovies = defineStore("ListMovie", {
    state: () => {
        return {
            isLoading: false as boolean,
            listMovies: {
                page: 1,
                results: [],
                total_results: 0,
                total_pages: 0
            } as GetMoviesResponse
        }
    },
    actions: {
        async getListMovies(currentType: string, currentPage: string | number, idGenres: number[]) {
            try {
                this.$state.isLoading = true
                const res = await axios.get(
                    `https://api.themoviedb.org/3/movie/${currentType}?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=${currentPage}&with_genres=${idGenres}`
                )
                this.listMovies = res.data
                this.$state.isLoading = false
            } catch (error) {
                this.$state.isLoading = false
                return
            }
        }
    },
    getters:{
        getterListMovies: (state)=> state.listMovies,
        getterIsLoadingListMovies: (state)=> state.isLoading
    }
})