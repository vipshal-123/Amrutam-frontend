import axios, { handleResponse } from '../axios'

export const doctorList = async (data) => {
    try {
        const response = await axios({
            url: '/v1/organization/doctors-list',
            method: 'GET',
            params: { next: data?.next, limit: data?.limit },
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const doctorAvailability = async (data) => {
    try {
        const response = await axios({
            url: '/v1/organization/doctor-availability',
            method: 'POST',
            data,
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const getDoctorAvailability = async () => {
    try {
        const response = await axios({
            url: '/v1/organization/doctor-availability',
            method: 'GET',
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const updateDoctorAvailability = async (data) => {
    try {
        const response = await axios({
            url: '/v1/organization/doctor-availability',
            method: 'PUT',
            data,
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}
