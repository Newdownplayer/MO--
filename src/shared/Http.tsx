import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue };

export class Http {
    instance: AxiosInstance
    constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL,
        })

    }
    get<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'url' | 'params' | 'methed'>) {
        return this.instance.request<R>({
            ...config,
            url,
            params: query,
            method: 'get'
        })
    }
    post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data' | 'methed'>) {
        return this.instance.request<R>({
            ...config,
            url,
            data,
            method: 'post'
        })
    }
    patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data' | 'methed'>) {
        return this.instance.request<R>({
            ...config,
            url,
            data,
            method: 'patch'
        })
    }
    delete<R = unknown>(url: string, data?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'url' | 'data' | 'methed'>) {
        return this.instance.request<R>({
            ...config,
            url,
            data,
            method: 'delete'
        })
    }
}
export const http = new Http('/api/v1/me')

http.instance.interceptors.response.use(response => {
    console.log('response')
    return response
}, (error) => {
    if (error.response) {
        const axiosError = error as AxiosError
        if (axiosError.response?.status === 429) {
            alert('你太频繁了')
        }
    }
    throw error
})