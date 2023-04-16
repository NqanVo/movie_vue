import { getCastMovie, getDetailMovie } from '@/services/getMovies'
import type { MovideDetail } from '@/types/MovieDetail.interface'
import type { Commit } from 'vuex'

export default {
  async fecthMovieDetail(
    { commit }: { commit: Commit },
    payload: { idMovie: number | string; language: { code: string } }
  ) {
    try {
      commit('setMovieDetailStart')
      let data: MovideDetail = await getDetailMovie(payload.idMovie, payload.language.code)
      data.casts = await getCastMovie(payload.idMovie)
      commit('setMovieDetailSuccess', data)
    } catch (error) {
      commit('setMovieDetailError')
    }
  }
}
