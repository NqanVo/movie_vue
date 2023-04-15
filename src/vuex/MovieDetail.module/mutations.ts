import type { MovideDetail } from '@/types/MovieDetail.interface'
import type { RootState } from './state'

export default {
  setMovieDetailStart(state: RootState) {
    state.isLoading = true
  },
  setMovieDetailSuccess(state: RootState, payload: MovideDetail) {
    state.data = payload
    state.isLoading = false
  },
  setMovieDetailError(state: RootState) {
    state.isLoading = false
  }
}
