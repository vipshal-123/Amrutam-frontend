import axios from 'axios'
import { getLocal } from '../utils/storage'
import config from '@/config'
import paramsEncoder from '@/utils/paramsEncoder'

const UserService = axios.create({
    baseURL: config.API_URL,
    withCredentials: true,
    paramsSerializer: paramsEncoder,
})

UserService.interceptors.request.use(
    (config) => {
        const token = getLocal('access_token')
        if (token && !config.url.endsWith('refresh-token')) {
            config.headers.Authorization = 'Bearer ' + token
        } else {
            config.headers.Authorization = ''
        }
        config.headers.TIMESTAMP = new Date().toISOString()
        config.headers.TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone
        return config
    },
    (error) => Promise.reject(error),
)

export default UserService
