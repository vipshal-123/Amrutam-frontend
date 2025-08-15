import axios, { handleResponse } from '../axios'

export const doctorSignin = async (data) => {
    try {
        const response = await axios({
            url: '/auth/organization/doctor-signin',
            method: 'POST',
            data,
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}
