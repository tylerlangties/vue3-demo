export const randomNumber = (min = 1, max = 50000) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export function mockCall(delay, value) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay, value)
  })
}
