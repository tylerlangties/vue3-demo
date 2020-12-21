import Axios from 'axios'
const BASE_URL = 'https://jsonplaceholder.typicode.com'

const instance = Axios.create({
  baseURL: BASE_URL
})

const POSTS_URL = 'posts'
const IMAGES_URL = 'photos'

const getPosts = async ({ start = 0, limit = 5 } = {}) => {
  return wait(
    instance.get(POSTS_URL, {
      searchParams: {
        _start: start,
        _limit: limit
      }
    })
  )
}

const posts = {
  get: getPosts
}

function getPhotos({ start = 0, limit = 5 } = {}) {
  return wait(
    instance.get(IMAGES_URL, {
      searchParams: {
        _start: start,
        _limit: limit
      }
    })
  )
}

const photos = {
  get: getPhotos
}

export { posts, photos }

//simulate res time
function wait(promise, n = 1500) {
  return new Promise(res => setTimeout(() => res(promise), n))
}
