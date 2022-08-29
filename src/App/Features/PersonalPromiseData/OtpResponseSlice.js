import { createSlice } from "@reduxjs/toolkit"

export const OtpResponseSlice = createSlice({
    name: 'PersonalPromiseData',
    initialState: {
        info: {
            response: ''
        }
    },
    reducers: {
        signInOtpReducer: (state, action) => {
            state.info = action.payload
        }
    }
})

export const { signInOtpReducer } = OtpResponseSlice.actions;

export default OtpResponseSlice.reducer;