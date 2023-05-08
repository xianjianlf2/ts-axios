import axios from '../../src/index'

axios.interceptors.request.use(config => {
  console.log('first request interceptor')
  config.headers.test += '1'
  return config
})
axios.interceptors.request.use(config => {
  console.log('second request interceptor')
  config.headers.test += '2'
  return config
})
axios.interceptors.request.use(config => {
  console.log('third request interceptor')
  config.headers.test += '3'
  return config
})

axios.interceptors.response.use(res => {
  res.data += '1'
  return res
})
let interceptor = axios.interceptors.response.use(res => {
  res.data += '2'
  return res
})
axios.interceptors.response.use(res => {
  res.data += '3'
  return res
})

axios.interceptors.response.eject(interceptor)

axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    axiosRequestInterceptor: ''
  }
}).then(res => {
  console.log(res.data)
})
