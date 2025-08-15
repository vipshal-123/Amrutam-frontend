import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    type: '',
    message: '',
}

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        openToast: (state, action) => {
            state.message = action.payload.message
            state.type = action.payload.type
            return state
        },
        closeToast: (state) => {
            state.message = ''
            return state
        },
    },
})

export const { closeToast, openToast } = toastSlice.actions
export default toastSlice.reducer
