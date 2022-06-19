import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchChartData:any = createAsyncThunk('chart/fetchChartData', () => {
    return (
        axios
            .get("https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json")
            .then(response => response.data))
});