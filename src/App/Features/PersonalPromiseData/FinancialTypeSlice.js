import { createSlice } from "@reduxjs/toolkit"

export const FinancialTypeSlice = createSlice({
    name: 'FinancialType',
    initialState: {
        data: {
            type: ''
        }
    },
    reducers: {
        financialTypeReducer: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { financialTypeReducer } = FinancialTypeSlice.actions;

export default FinancialTypeSlice.reducer;