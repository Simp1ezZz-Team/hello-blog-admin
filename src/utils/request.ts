import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElNotification } from 'element-plus'

//创建axios对象
const request = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
})

//请求拦截器
request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    },
)

//响应拦截器
request.interceptors.response.use(
    (response: AxiosResponse) => {
        switch (response.data.code) {
            case 400:
                ElNotification({
                    title: '失败',
                    message: response.data.msg,
                    type: 'error',
                })
                break
            case 402:
                break
            case 500:
                ElNotification({
                    title: '失败',
                    message: response.data.msg,
                    type: 'error',
                })
                break
        }
        return response
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    },
)

export default request
