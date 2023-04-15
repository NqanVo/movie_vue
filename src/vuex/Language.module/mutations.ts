import type { RootState } from './state'

export default {
  setLanguage(state: RootState, language: { code: string }) {
    state.language = language
    localStorage.setItem('language', JSON.stringify(language))
  }
}
