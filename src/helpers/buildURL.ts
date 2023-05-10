function encode(value: string): string {
  return encodeURIComponent(value)
}

export function buildURL(url: string, params?: Record<string, unknown>): string {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const value = params[key]

    if (value == null) {
      return
    }

    const values = Array.isArray(value) ? value : [value]
    const paramKey = Array.isArray(value) ? `${key}[]` : key

    values.forEach(item => {
      parts.push(`${encode(paramKey)}=${encode(String(item))}`)
    })
  })

  if (parts.length === 0) {
    return url
  }

  const mark = url.includes('?') ? '&' : '?'
  return `${url}${mark}${parts.join('&')}`
}

export function buildFullURL(baseURL: string | undefined, url: string): string {
  if (!baseURL || isAbsoluteURL(url)) {
    return url
  }

  return `${baseURL.replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`
}

function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url)
}
