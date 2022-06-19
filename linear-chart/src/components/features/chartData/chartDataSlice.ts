import {  createSlice } from "@reduxjs/toolkit"
import { fetchChartData } from "../../../services/fetch-data";
import { State } from "../../../interfaces/interfaces"


const initialState: State = {
    isLoading: true,
    dataFromAPI:[],
    errorFromAPI: '',
    selectedCountry: '',
    selectedCamp: '',
    selectedSchool: '',
    pointSchool: '',
    pointMonth: '',
    pointLessons: 0,

};

const chartSlice = createSlice({
    name: 'chart',
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
            state.errorFromAPI = ''
        })

        builder.addCase(fetchChartData.rejected, (state: State, action) => {
            state.isLoading = false
            state.dataFromAPI = []
            state.errorFromAPI = action.error.message
        })
    }

});

export default chartSlice.reducer
export const { selectCountry, selectCamp, selectSchool, addPointSchool, addPointMonth, addPointLessons } = chartSlice.actions