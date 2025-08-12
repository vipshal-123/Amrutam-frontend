import AxiosService from 'axios'
import { getLocal } from '../utils/storage'

AxiosService.interceptors.request.use(
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
    (error) => {
        throw error
    },
)

export default AxiosService
