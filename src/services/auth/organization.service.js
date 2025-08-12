import axios, { handleResponse } from '@/services/axios'

export const createOrgSendOtp = async (data) => {
    try {
        const response = await axios({
            url: '/auth/organization/send-otp',
            method: 'POST',
            data,
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const createOrgVerifyOtp = async (data) => {
    try {
        const response = await axios({
            url: '/auth/organization/verify-otp',
            method: 'POST',
            data,
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const orgResendOtp = async (data) => {
    try {
        const response = await axios({
            url: '/auth/organization/resend-otp',
            method: 'POST',
            data,
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}