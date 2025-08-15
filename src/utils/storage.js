export const setLocal = (key, token) => {
    return localStorage.setItem(key, token)
}

export const getLocal = (key) => {
    return localStorage.getItem(key)
}

export const removeLocal = (key) => {
    return localStorage.removeItem(key)
}
