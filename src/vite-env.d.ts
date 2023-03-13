/// <reference types="vite/client" />
type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>
type Tag = {
    id: number,
    user_id: number,
    name: string,
    sign: string,
    kind: expenses | income
}
type Resources<T = any> = {
    resources: T[]
    pager: {
        page: number,
        per_page: number,
        count: number
    }
}
type Item = {
    id: number
    user_id: number
    amount: number
    tags_id: number[]
    tags?: Tag[]
    note: string
    happen_at: string
    kind: expenses | income
}
type Resource<T> = {
    resource: T
}

type ResourceError = {
    errors: Record<string, string[]>
}
