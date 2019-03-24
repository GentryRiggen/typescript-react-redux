import axios, { AxiosResponse } from 'axios'
import * as R from 'ramda'
import { camelizeKeys } from 'humps'

import { getLocalItem, setLocalItem } from 'lib/utils/localStorage'
import {
  TOKENS_STORAGE_KEY,
  GET,
  POST,
  PUT,
  DELETE,
} from 'lib/api/apiConstants'

const defaultTimeout = 20000
const BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080'
const getUrl = (url: string) => {
  if (url.includes('http')) {
    return url
  }
  return `${BASE_URL}/${url}`
}

interface IResponse extends AxiosResponse {
  success?: boolean
}

const isUnauthorized = (response: IResponse) =>
  R.compose(
    R.equals(401),
    R.pathOr(0, ['response', 'status']),
  )(response)

const getResponseStructure = (response: IResponse, success?: boolean) =>
  R.compose(
    R.assoc('success', success),
    R.pick(['data', 'headers', 'status']),
  )(response)

export const formatResponse = (response: IResponse) =>
  getResponseStructure(response, response.success)

export const setTokens = (response: IResponse) =>
  setLocalItem(TOKENS_STORAGE_KEY, response.data || {})

const api = axios.create({
  timeout: defaultTimeout,
})

api.interceptors.response.use(
  R.assoc('success', true),
  R.assoc('success', false),
)

const refreshTokens = async (refreshToken: string) => {
  const response = await api.post(getUrl('auth/refresh'), { refreshToken })

  if (!isUnauthorized(response)) {
    await setTokens(response)
  }

  return formatResponse(response)
}

interface IBaseHTTPRequestOptions {
  url: string
  data?: object
  params?: object
  headers?: object
  timeout?: number
}
interface IHTTPRequestOptions extends IBaseHTTPRequestOptions {
  method: string
}

export const httpRequest = async (
  options: IHTTPRequestOptions,
  isRetry = false,
): Promise<IResponse> => {
  const {
    method = 'GET',
    url = '',
    data = {},
    params = {},
    headers = {},
    timeout = defaultTimeout,
  } = options
  const tokens = await getLocalItem(TOKENS_STORAGE_KEY)
  const { accessToken = false, refreshToken = false } = tokens || {}
  const requestHeaders = R.compose(
    (mutableHeaders: object) =>
      R.isEmpty(headers) ? mutableHeaders : R.merge(mutableHeaders, headers),
    (mutableHeaders: object) =>
      accessToken
        ? R.assoc('Authorization', `Bearer ${accessToken}`, mutableHeaders)
        : mutableHeaders,
  )({})

  const defaultRequestOptions = {
    method,
    url: getUrl(url),
    headers: requestHeaders,
    timeout,
  }
  const requestOptions = R.compose(
    (mutlableOptions: object) =>
      R.isEmpty(params)
        ? mutlableOptions
        : R.assoc('params', params, mutlableOptions),
    (mutlableOptions: object) =>
      R.isEmpty(data)
        ? mutlableOptions
        : R.assoc('data', data, mutlableOptions),
  )(defaultRequestOptions)

  const resp = await api.request(requestOptions)
  const response = camelizeKeys(resp) as AxiosResponse

  if (isUnauthorized(response) && !isRetry) {
    if (refreshToken) {
      await refreshTokens(refreshToken)
      return httpRequest(
        {
          method,
          url,
          data,
          params,
          headers,
        },
        true,
      )
    }
  }

  return response
}

export const getRequest = (options: IBaseHTTPRequestOptions) =>
  httpRequest({ ...options, method: GET })
export const postRequest = (options: IBaseHTTPRequestOptions) =>
  httpRequest({ ...options, method: POST })
export const putRequest = (options: IBaseHTTPRequestOptions) =>
  httpRequest({ ...options, method: PUT })
export const deleteRequest = (options: IBaseHTTPRequestOptions) =>
  httpRequest({ ...options, method: DELETE })
