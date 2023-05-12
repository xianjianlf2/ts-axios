import cookie from '../helpers/cookies'
import { createError } from '../helpers/error'
import { parseHeaders } from '../helpers/headers'
import { isURLSameOrigin } from '../helpers/url'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      withCredentials,
      signal,
      xsrfCookieName,
      xsrfHeaderName
    } = config
    let onCanceled: (cancel?: Event) => any

    let request = new XMLHttpRequest()
    // set response Type
    if (responseType) {
      request.responseType = responseType
    }

    if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
      const xsrfValue = cookie.read(xsrfCookieName)
      if (xsrfValue) {
        headers[xsrfHeaderName!] = xsrfValue
      }
    }

    if (withCredentials) {
      request.withCredentials = withCredentials
    }

    if (timeout) {
      request.timeout = timeout
    }

    if (signal) {
      const onCanceled = (cancel?: Event) => {
        if (!request) {
          return
        }
        reject(
          !cancel || cancel.type
            ? createError('Request aborted', config, 'ECONNABORTED', request)
            : cancel
        )
        request.abort()
      }
      signal.aborted ? onCanceled() : signal.addEventListener('abort', onCanceled)
    }

    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    request.onerror = function handleError() {
      reject(createError('Network Error', config, undefined, request))
    }

    // abort controller
    request.onabort = function handleAbort() {
      reject(createError('Request aborted', config, 'ECONNABORTED', request))
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
        if (config.signal) {
          config.signal.removeEventListener('abort', onCanceled)
        }
      } else {
        reject(
          createError(
            `Request fail with status code ${response.status}`,
            config,
            undefined,
            request,
            response
          )
        )
      }
    }
  })
}
