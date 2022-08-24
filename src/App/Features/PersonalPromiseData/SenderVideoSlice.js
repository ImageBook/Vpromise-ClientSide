import { createSlice } from "@reduxjs/toolkit"

export const SenderVideoSlice = createSlice({
    name: 'PersonalSenderVideo',
    initialState: {
        data: {
            visual: ''
        }
    },
    reducers: {
        personalSenderVideoReducer: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { personalSenderVideoReducer } = SenderVideoSlice.actions;

export default SenderVideoSlice.reducer;