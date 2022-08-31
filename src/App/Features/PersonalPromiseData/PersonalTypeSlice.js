import { createSlice } from "@reduxjs/toolkit"

export const PersonalTypeSlice = createSlice({
    name: 'PersonalType',
    initialState: {
        data: {
            type: ''
        }
    },
    reducers: {
        personalTypeReducer: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { personalTypeReducer } = PersonalTypeSlice.actions;

export default PersonalTypeSlice.reducer;