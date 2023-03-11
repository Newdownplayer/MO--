/// <reference types="vite/client" />
type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>
type Tag = {
    id: number,
    user_id: number,
    name: string,
    sign: string,
    kind: expenses | income
}