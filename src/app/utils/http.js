import axios from 'axios'
import QS from 'qs'
import { message } from 'antd'
import config from '../config'
import { getToken } from './token'

//设置axios基础路径
const service = axios.create({
  baseURL: config.backend,
  timeout: 5000,
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization: getToken(),
      'Content-Type': 'application/json',
    }
    return config
  },
  (error) => {
    return error
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code) {
      switch (res.code) {
        case 200:
          return res
        case 4001:
          message.error(res.message)
          window.location.href = '/login'
          break
        default:
          return res
      }
    } else {
      return res
    }
  },
  () => {
    message.error('网络请求异常')
  }
)

const get = async (url, params) =>
  await service.get(url, {
    params: { ...params },
  })

const post = async (url, data) => await service.post(url, data)

const put = async (url, data) => await service.put(url, data)

const file = async (url, file = {}) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('fileType', 'png')
  return await axios.post(config.backend + url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

const http = {
  get,
  post,
  put,
  file,
}

export default http
