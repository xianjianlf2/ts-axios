import axios from '../../src'

interface ResponseData<T> {
  code: number
  data: T
  msg?: string
}

interface User {
  name: string
  age: number
}

const arr = new Int32Array([21, 31])

axios({ method: 'post', url: '/base/buffer', data: arr })

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json',
    Accept: 'application/json,text/plain,*/*'
  },
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(res)
})

axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
}).then(res => {
  console.log(res)
})
