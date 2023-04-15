import axios from 'axios'
import { API_KEY, BASE_URL } from '@/assets/key'

const timeout = 5000

export const getMoviesPopular = async (currentPage: number = 1, language: string = `en-US`) => {
  try {
    const res = await axios.get(BASE_URL + `movie/popular?api_key=${API_KEY}&language=${language}&page=${currentPage}`, {timeout:timeout})
    return res.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getMoviesTopRated = async (currentPage: number = 1, language: string = `en-US`) => {
    try {
      const res = await axios.get(BASE_URL + `movie/top_rated?api_key=${API_KEY}&language=${language}&page=${currentPage}`,{timeout:timeout})
      return res.data
    } catch (error) {
      console.log(error)
      return null
    }
}

export const getDetailMovie = async (idMovie:number | string,language: string = `en-US`) => {
  try {
    const res = await axios.get(BASE_URL + `movie/${idMovie}?api_key=${API_KEY}&language=${language}`,{timeout:timeout})
      return res.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getCastMovie = async (idMovie:string | number) =>{
  try {
    const res = await axios.get(BASE_URL + `movie/${idMovie}/casts?api_key=${API_KEY}`,{timeout:timeout})
    return res.data
  } catch (error) {
    return null
  }
}