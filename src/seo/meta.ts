const metaTitle = document.querySelector('meta[property="og:title"]')
const metaDescription = document.querySelector('meta[property="og:description"]')
const metaImage = document.querySelector('meta[property="og:image"]')

export const setSEO = (
  title: string = `TV MOVIE`,
  desc: string = `You can find all movie in the website`,
  image: string = `https://cdn.freebiesupply.com/logos/large/2x/tv-movie-logo-svg-vector.svg`
) => {
  document.title = title
  metaTitle?.setAttribute('content', title)
  metaDescription?.setAttribute('content', `${desc.substring(0, 47)}...`)
  metaImage?.setAttribute('content', image)
}
