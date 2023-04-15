import { getCastMovie, getDetailMovie } from '@/services/getMovies'
import type { Commit } from 'vuex'

export default {
  async fecthMovieDetail(
    { commit }: { commit: Commit },
    payload: { idMovie: number | string; language: { code: string } }
  ) {
    try {
      commit('setMovieDetailStart')
      let data = await getDetailMovie(payload.idMovie, payload.language.code)
      data.casts = await getCastMovie(payload.idMovie)
      commit('setMovieDetailSuccess', data)
    } catch (error) {
      commit('setMovieDetailError')
    }
  }
}
