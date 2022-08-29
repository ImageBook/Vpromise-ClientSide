import { createSlice } from "@reduxjs/toolkit"

export const ReceiverVideoSlice = createSlice({
    name: 'PersonalReceiverVideo',
    initialState: {
        data: {
            visual: ''
        }
    },
    reducers: {
        personalReceiverVideoReducer: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { personalReceiverVideoReducer } = ReceiverVideoSlice.actions;

export default ReceiverVideoSlice.reducer;