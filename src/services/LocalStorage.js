const storage = window.localStorage

const JWT_TOKEN = 'jwt_token'

export const getToken = () => storage.getItem(JWT_TOKEN)
export const saveToken = (token) => storage.setItem(JWT_TOKEN, token)
export const removeToken = () => storage.removeItem(JWT_TOKEN)
