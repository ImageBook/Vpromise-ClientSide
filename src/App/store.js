import { configureStore } from "@reduxjs/toolkit";
import PersonalDataSlice from "./Features/PersonalPromiseData/PersonalDataSlice";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import SenderVideoSlice from "./Features/PersonalPromiseData/SenderVideoSlice";
import ReceiverVideoSlice from "./Features/PersonalPromiseData/ReceiverVideoSlice";
import OtpResponseSlice from "./Features/PersonalPromiseData/OtpResponseSlice";
import PersonalTypeSlice from "./Features/PersonalPromiseData/PersonalTypeSlice";
import ProfessionalTypeSlice from "./Features/PersonalPromiseData/ProfessionalTypeSlice";
import FinancialTypeSlice from "./Features/PersonalPromiseData/FinancialTypeSlice";

const reducers = combineReducers({
    personalPromiseReducer: PersonalDataSlice,
    personalSenderVideoReducer: SenderVideoSlice,
    personalReceiverVideoReducer: ReceiverVideoSlice,
    signInOtpReducer: OtpResponseSlice,
    personalTypeReducer: PersonalTypeSlice,
    professionalTypeReducer: ProfessionalTypeSlice,
    financialTypeReducer: FinancialTypeSlice
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
});

export default store;