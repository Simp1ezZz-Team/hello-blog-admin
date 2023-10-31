/**
 * 通用返回结果
 */
export interface Result<T> {
    /**
     * 返回状态
     */
    flag: boolean
    /**
     * 状态码
     */
    code: number
    /**
     * 返回信息
     */
    message: string
    /**
     * 返回数据
     */
    data: T
}
