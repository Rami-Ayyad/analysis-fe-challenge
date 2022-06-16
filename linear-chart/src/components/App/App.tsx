import React from 'react';
import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChartData } from '../features/chartData/chartDataSlice';

function App() {

  const chartData = useSelector((state:any) => state.chartData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchChartData())
  }, [])

  return (
    <div className="App">
     <h1>data from api</h1>
     {chartData.loading && <h1>Loading...</h1>}
     {!chartData.loading && chartData.error ? <h2>Error:{chartData.error}</h2>:null}
     {!chartData.loading && chartData.chartData.length ?(
      <ul>
        {
          chartData.chartData.map((data:any) => (
            <li key={data.id}>{data.school}</li>
          ))
        }
      </ul>
     ):null}
      
    </div>
  );
}

export default App;
