import axios, { handleResponse } from '../axios'

export const userInfo = async (data) => {
    try {
        const response = await axios({
            url: '/v1/user/user-info',
            method: 'GET',
            data,
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}
