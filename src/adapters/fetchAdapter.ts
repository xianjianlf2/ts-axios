import { parseHeaders } from '../helpers/headers'
import { AxiosAdapter } from '../types'

const fetchAdapter: AxiosAdapter = async config => {
  const response = await fetch(config.url, {
    method: config.method ?? 'GET',
    headers: config.headers,
    body: config.data == null ? undefined : String(config.data)
  })

  return {
    data: await response.text(),
    status: response.status,
    statusText: response.statusText,
    headers: parseHeaders(response.headers),
    config,
    request: response
  }
}

export default fetchAdapter
