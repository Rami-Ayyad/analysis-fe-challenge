import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import build from "react-countup"


const initialState ={
    loading:false,
    chartData:<any>[],
    error:<any>'',
    itmes:<any>5
}


export const fetchChartData = <any>createAsyncThunk('chartData/fetchChartData',()=>{
    return (axios.get("https://raw.githubusercontent.com/abdelrhman-arnos/analysis-fe-challenge/master/data.json")
           .then(response => response.data))
})


const chartDataSlice = <any>createSlice({
    name:'chartData',
    initialState,
    reducers:{
        addItemEx:(state,action)=> {
            state.itmes += action.payload
        }
    },
    extraReducers:builder => {
        builder.addCase(fetchChartData.pending, state => {
            state.loading = true
        })

        builder.addCase(fetchChartData.fulfilled, (state, action) => {
            state.loading = false
            state.chartData= action.payload
            state.error=''
        })

        builder.addCase(fetchChartData.rejected, (state, action) => {
            state.loading = false
            state.chartData = []
            state.error = action.meta.arg 
        })
    }

})

export default chartDataSlice.reducer
export const {addItemEx} = chartDataSlice.actions