import axios, { handleResponse } from '../axios'

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

export const docCreatePassword = async (data) => {
    try {
        const response = await axios({
            url: '/auth/organization/doctor-create-password',
            method: 'POST',
            data,
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const orgAdminSigninSendOtp = async (data) => {
    try {
        const response = await axios({
            url: '/auth/organization/admin-signin-send-otp',
            method: 'POST',
            data,
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const orgAdminSigninVerifyOtp = async (data) => {
    try {
        const response = await axios({
            url: '/auth/organization/verify-signin-otp',
            method: 'POST',
            data,
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const addDoctor = async (data) => {
    try {
        const response = await axios({
            url: '/auth/organization/add-doctor',
            method: 'POST',
            data,
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}

export const addDoctorResendMail = async (data) => {
    try {
        const response = await axios({
            url: '/auth/organization/resend-doc-mail',
            method: 'POST',
            data,
        })

        return handleResponse(response, 'success')
    } catch (error) {
        return handleResponse(error, 'error')
    }
}
