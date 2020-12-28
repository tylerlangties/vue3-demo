import Axios from 'axios'
const BASE_URL = 'https://jsonplaceholder.typicode.com'

const instance = Axios.create({
  baseURL: BASE_URL
})

const POSTS_URL = 'posts'

const getPosts = async ({ start = 0, limit = 5 } = {}) => {
  return wait(
    instance.get(POSTS_URL, {
      params: {
        _start: start,
        _limit: limit
      }
    })
  )
}

const posts = {
  get: getPosts
}

export { posts, instance }

//simulate res time
function wait(promise, n = 1000) {
  return new Promise(res => setTimeout(() => res(promise), n))
}
