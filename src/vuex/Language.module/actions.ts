import type { Commit } from 'vuex'

export default {
  setLanguage({ commit }: { commit: Commit }, language: { code: string }) {
    commit('setLanguage', language)
  }
}
