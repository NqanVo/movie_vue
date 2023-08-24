import type { MovideDetail } from '@/types/MovieDetail.interface'

export interface RootState {
  isLoading: boolean
  data: MovideDetail
}

export default (): RootState => {
  return {
    isLoading: false,
    data: {} as MovideDetail
  }
}

