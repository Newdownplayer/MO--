interface FData {
    [k: string]: string | number | null | undefined | FData
}
type Rule<T> = {
    key: keyof T
    message: string
} & (
        { type: 'required' } |
        { type: 'pattern', regexp: RegExp }
    )
type Rules<T> = Rule<T>[]
export type { Rule, Rules, FData }
export const validate = <T extends FData>(formData: T, rules: Rules<T>) => {
    type Errors = { [k in keyof T]?: string[] }
    const errors: Errors = {}
    rules.map(rule => {
        const { key, type, message } = rule
        const value = formData[key]
        switch (type) {
            case 'required':
                if (value === undefined || value === null || value === '') {
                    errors[key] = errors[key] ?? []
                    errors[key]?.push(message)
                }
                break
            case 'pattern':
                if (value && !rule.regexp.test(value.toString())) {
                    errors[key] = errors[key] ?? []
                    errors[key]?.push(message)
                }
                break
        }
    }
    )
    return errors
}