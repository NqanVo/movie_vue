export interface RootState {
  language: { code: string }
}

export default (): RootState => {
  const savedLanguage = localStorage.getItem('language')
  return {
    language: savedLanguage ? JSON.parse(savedLanguage) : { code: 'en' }
  }
}
