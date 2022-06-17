import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import build from "react-countup"


const initialState = {
    loading: true,
    chartData: <any>[],
    error: '',
    selectedCountry: '',
    selectedCamp: '',
    selectedSchool: ''
}


export const fetchChartData = <any>createAsyncThunk('chartData/fetchChartData', () => {
    return (
        axios
        .get("https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json")
        .then(response => response.data))
})


const chartDataSlice = <any>createSlice({
    name: 'chartData',
    initialState,
    reducers: {
        selectCountry: (state, action) => {
            state.selectedCountry = action.payload
        },
        selectCamp: (state, action) => {
            state.selectedCamp = action.payload
        },
        selectSchool: (state, action) => {
            state.selectedSchool = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchChartData.pending, state => {
            state.loading = true
        })

        builder.addCase(fetchChartData.fulfilled, (state, action) => {
            state.loading = false
            state.chartData = action.payload
            state.error = ''
        })

        builder.addCase(fetchChartData.rejected, (state, action) => {
            state.loading = false
            state.chartData = []
            state.error = action.error.message
        })
    }

})

export default chartDataSlice.reducer
export const { selectCountry, selectCamp, selectSchool } = chartDataSlice.actions