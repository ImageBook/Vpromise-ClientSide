import { configureStore } from "@reduxjs/toolkit";
import PersonalDataSlice from "./Features/PersonalPromiseData/PersonalDataSlice";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    personalPromiseReducer: PersonalDataSlice
});

const store = configureStore({
    reducer: {
        personalPromiseReducer: PersonalDataSlice
    }
})

export default store;