import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import build from "react-countup"


const initialState = {
    isLoading: true,
    dataFromAPI: <any>[],
    error: '',
    selectedCountry: '',
    selectedCamp: '',
    selectedSchool: '',
    pointSchool:'',
    pointMonth:'',
    pointLessons:'',
    
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
        addPointSchool: (state, action) => {
            state.pointSchool = action.payload
        },
        addPointMonth: (state, action) => {
            state.pointMonth = action.payload
        },
        addPointLessons: (state, action) => {
            state.pointLessons = action.payload
        }

    },
    extraReducers: builder => {
        builder.addCase(fetchChartData.pending, state => {
            state.isLoading = true
        })

        builder.addCase(fetchChartData.fulfilled, (state, action) => {
            state.isLoading = false
            state.dataFromAPI = action.payload
            state.error = ''
        })

        builder.addCase(fetchChartData.rejected, (state, action) => {
            state.isLoading = false
            state.dataFromAPI = []
            state.error = action.error.message
        })
    }

})

export default chartDataSlice.reducer
export const { selectCountry, selectCamp, selectSchool, addPointSchool, addPointMonth, addPointLessons } = chartDataSlice.actions