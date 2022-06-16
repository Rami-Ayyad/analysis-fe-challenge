import { configureStore } from "@reduxjs/toolkit";
import chartDataReducer from "../features/chartData/chartDataSlice"

const store = configureStore({
    reducer:{
        chartData:chartDataReducer,
    }
})

export default store