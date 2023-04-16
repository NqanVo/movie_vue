import type { MovideDetail } from './MovieDetail.interface'

export default interface MovieSearchResult {
  page: number
  results: MovideDetail[]
  total_pages: number
  total_results: number
}
