import { configureStore } from "@reduxjs/toolkit";
import PersonalDataSlice from "./Features/PersonalPromiseData/PersonalDataSlice";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    personalPromiseReducer: PersonalDataSlice
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
    // reducer: {
    //     personalPromiseReducer: PersonalDataSlice
    // }
});

export default store;