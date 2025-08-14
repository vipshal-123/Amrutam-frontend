import axios, { handleResponse } from '../axios'

export const userInfo = async () => {
    try {
        const response = await axios({
            url: '/v1/user/user-info',
            method: 'GET',
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const doctorList = async (data) => {
    try {
        const response = await axios({
            url: '/v1/user/doctors-list',
            method: 'GET',
            params: { next: data?.next, limit: data?.limit },
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const singleDoctor = async (params) => {
    try {
        const response = await axios({
            url: `/v1/user/doctor/${params?.params?.id}`,
            method: 'GET',
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const getBookings = async (params) => {
    try {
        const response = await axios({
            url: `/v1/user/booking/${params?.params?.id}`,
            method: 'GET',
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const bookingSendOtp = async (data) => {
    try {
        const response = await axios({
            url: '/v1/user/booking-send-otp',
            method: 'POST',
            data,
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const bookingVerify = async (data) => {
    try {
        const response = await axios({
            url: '/v1/user/booking-verify-otp',
            method: 'POST',
            data,
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}
