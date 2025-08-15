import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { userInfo } from '@/services/v1/user.service'

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async () => {
    try {
        const response = await userInfo()
        if (response.data) {
            return { isAuth: true, ...response.data }
        } else {
            return { isAuth: false, id: '', role: '', organizationId: '', email: '' }
        }
    } catch (error) {
        console.error('error: ', error)
        return { isAuth: false, id: '', role: '', organizationId: '', email: '' }
    }
})

const initialState = {
    isAuth: false,
    loading: true,
    userId: '',
    role: '',
    organizationId: '',
    email: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setupAuth: (state, { payload }) => {
            state.isAuth = payload.isAuth
            state.userId = payload.userId
            state.role = payload.role
            state.organizationId = payload.organizationId
            state.email = payload.email
        },
        revokeAuth: (state) => {
            state.isAuth = false
            state.userId = ''
            state.role = ''
            state.organizationId = ''
            state.email = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false
                state.isAuth = !!action?.payload?.isAuth
                state.userId = action?.payload?._id
                state.role = action?.payload?.role
                state.organizationId = action?.payload?.organizationId || ''
                state.email = action?.payload?.email
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.loading = false
                state.isAuth = false
                state.userId = ''
                state.role = ''
                state.organizationId = ''
                state.email = ''
            })
    },
})

export const { setupAuth, revokeAuth } = authSlice.actions
export default authSlice.reducer
