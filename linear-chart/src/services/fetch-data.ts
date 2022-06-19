import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { Data } from "../interfaces/interfaces";

export const fetchChartData:Data[]|any = createAsyncThunk('chart/fetchChartData', () => {
    return (
        axios
            .get("https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json")
            .then(response => response.data))
});