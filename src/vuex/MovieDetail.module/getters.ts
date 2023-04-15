import type { RootState } from './state'

export default {
  dataMovie: (state: RootState) => state.data,
  isLoading: (state: RootState) => state.isLoading
}
