export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    vote_count: number;
    release_date: string;
    popularity: number;
  }
  
export interface GetMoviesResponse {
    page: number;
    results: Movie[];
    total_results: number;
    total_pages: number;
  }