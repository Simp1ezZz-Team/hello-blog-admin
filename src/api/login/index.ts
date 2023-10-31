import type { LoginForm } from '@/api/login/types'
import type { AxiosPromise } from 'axios'
import request from '@/utils/request'
import type { Result } from '@/api/model/types'

export function login(data: LoginForm): AxiosPromise<Result<string>> {
    return request({
        url: '/login',
        method: 'post',
        data,
    })
}
