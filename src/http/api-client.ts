import axios, { AxiosInstance } from 'axios'

import { env } from '@/env'

const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
  })

  instance.interceptors.request.use(async (request) => {
    const token = env.NEXT_PUBLIC_TOKEN

    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }

    return request
  })

  return instance
}

export const api = {
  rota: createAxiosInstance(
    env.NEXT_PUBLIC_API_ROTA + '/recruitment',
  ),
}