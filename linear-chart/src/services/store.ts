import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "../components/features/chartData/chartDataSlice"

const store = configureStore({
    reducer:{
        chartData:chartReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store