import axios from '../../src/index'

const controller = new AbortController()

axios
  .get('/cancel/get', {
    signal: controller.signal
  })
  .then(function () {
    controller.abort('Operation canceled by the user.')
  })
  .catch(function (e) {
    console.log(e)
  })


axios
  .get('/cancel/get', {
    signal: controller.signal
  })
  .catch(function (e) {
    console.log(e)
  })

axios
  .get('/cancel/get', {
    signal: controller.signal
  })
  .catch(function (e) {
    console.log(e)
  })
