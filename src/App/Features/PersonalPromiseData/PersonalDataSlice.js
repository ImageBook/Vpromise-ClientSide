import { createSlice } from "@reduxjs/toolkit"

export const PersonalDataSlice = createSlice({
    name: 'PersonalPromiseData',
    initialState: {
        data: {
            title: '',
            date: '',
            notes: ''
        }
    },
    reducers: {
        personalPromiseReducer: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { personalPromiseReducer } = PersonalDataSlice.actions;

export default PersonalDataSlice.reducer;