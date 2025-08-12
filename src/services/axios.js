import axios from './axiosService'
import config from '@/config'
import paramsEncoder from '@/utils/paramsEncoder'
import isEmpty from 'is-empty'

axios.defaults.baseURL = config.API_URL
axios.defaults.withCredentials = true
axios.defaults.paramsSerializer = paramsEncoder
axios.defaults.headers.common['TIMEZONE'] = Intl.DateTimeFormat().resolvedOptions().timeZone

export const handleResponse = (response, type) => {
    try {
        if (type === 'success') {
            return response.data
        } else if (type === 'error') {
            if (isEmpty(response.response) || isEmpty(response.response.data)) {
                return { success: false, message: 'Unknown error occurred' }
            }

            return response.response.data
        }
    } catch (error) {
        console.log('error: ', error)
        return { success: false, message: 'Unknown error occurred' }
    }
}

export default axios
