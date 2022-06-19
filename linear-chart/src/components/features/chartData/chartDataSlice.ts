import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import build from "react-countup"
import { State } from "../../../interfaces/interfaces"


const initialState: State = {
    isLoading: true,
    dataFromAPI: [],
    error: '',
    selectedCountry: '',
    selectedCamp: '',
    selectedSchool: '',
    pointSchool: '',
    pointMonth: '',
    pointLessons: 0,

};


export const fetchChartData = <any>createAsyncThunk('chartData/fetchChartData', () => {
    return (
        axios
            .get("https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json")
            .then(response => response.data))
});


const chartDataSlice = <any>createSlice({
    name: 'chartData',
    initialState,
    reducers: {
        selectCountry: (state: State, action) => {
            state.selectedCountry = action.payload
        },
        selectCamp: (state: State, action) => {
            state.selectedCamp = action.payload
        },
        selectSchool: (state: State, action) => {
            state.selectedSchool = action.payload
        },
        addPointSchool: (state: State, action) => {
            state.pointSchool = action.payload
        },
        addPointMonth: (state: State, action) => {
            state.pointMonth = action.payload
        },
        addPointLessons: (state: State, action) => {
            state.pointLessons = action.payload
        }

    },
    extraReducers: builder => {
        builder.addCase(fetchChartData.pending, (state: State) => {
            state.isLoading = true
        })

        builder.addCase(fetchChartData.fulfilled, (state: State, action) => {
            state.isLoading = false
            state.dataFromAPI = action.payload
            state.error = ''
        })

        builder.addCase(fetchChartData.rejected, (state: State, action) => {
            state.isLoading = false
            state.dataFromAPI = []
            state.error = action.error.message
        })
    }

});

export default chartDataSlice.reducer
export const { selectCountry, selectCamp, selectSchool, addPointSchool, addPointMonth, addPointLessons } = chartDataSlice.actions