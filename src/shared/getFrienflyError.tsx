const map: Record<string, string> = {
    'is invalid': '格式不正确'
}
export const getFriendflyError = (error: string) => {
    return map[error] || error
}