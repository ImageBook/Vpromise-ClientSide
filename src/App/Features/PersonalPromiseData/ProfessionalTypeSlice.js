import { createSlice } from "@reduxjs/toolkit"

export const ProfessionalTypeSlice = createSlice({
    name: 'ProfessionalType',
    initialState: {
        data: {
            type: ''
        }
    },
    reducers: {
        professionalTypeReducer: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { professionalTypeReducer } = ProfessionalTypeSlice.actions;

export default ProfessionalTypeSlice.reducer;