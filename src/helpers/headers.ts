export function normalizeHeaders(headers?: Record<string, string>): Record<string, string> {
  if (!headers) {
    return {}
  }

  const normalized: Record<string, string> = {}

  Object.keys(headers).forEach(name => {
    const key = name
      .toLowerCase()
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('-')

    normalized[key] = headers[name]
  })

  return normalized
}

export function parseHeaders(headers: Headers): Record<string, string> {
  const result: Record<string, string> = {}

  headers.forEach((value, key) => {
    result[key] = value
  })

  return result
}
