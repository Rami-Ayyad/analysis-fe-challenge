import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Chart as ChartJS, InteractionItem, registerables } from 'chart.js'
import { getDatasetAtEvent, getElementAtEvent, Line } from 'react-chartjs-2';
import { addPointSchool, addPointMonth, addPointLessons } from '../features/chartData/chartDataSlice';
import { useNavigate } from "react-router-dom"
import './LineChart.css'

//Configuration for the chart to work
ChartJS.register(...registerables)

interface Props {
  finalDataObj:any,
}

const SelectCamp = ({ finalDataObj }: Props) => {

  let navigate = useNavigate();



  const data: any = finalDataObj

  const dispatch = useDispatch()

  const options: any = {
    scales:{
      y:{
        beginAtZero:true,
        title:{
          display:true,
          text:'No of lessons'
        }
      }
    },
    layout: {

    },
    plugins: {
      legend: {

        position: 'right',
        labels: {
          usePointStyle: true,
          padding:70,
          font: {
            size: 18,
          }

        }
      }
    }
  }
  

  const printDatasetAtEvent = (dataset: InteractionItem[]) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;

    dispatch(addPointSchool(data.datasets[datasetIndex].label))
  };

  const printElementAtEvent = (element: InteractionItem[]) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];
    dispatch(addPointMonth(data.labels[index]))
    dispatch(addPointLessons(data.datasets[datasetIndex].data[index])) 
  };


  const chartRef:any = useRef<ChartJS>(null);

  const onClick = (event:any) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));

    navigate('../point-details', { replace: false })


  };

  const selectedCamp = useSelector((state: any) => state.chartData.selectedCamp)
    const selectedCountry = useSelector((state: any) => state.chartData.selectedCountry)
    const pointSchool = useSelector((state: any) => state.chartData.pointSchool)
    const pointMonth = useSelector((state: any) => state.chartData.pointMonth)
    const pointLessons = useSelector((state: any) => state.chartData.pointLessons)
    console.log(selectedCamp
      ,selectedCountry
      ,pointSchool
      ,pointMonth
      ,pointLessons)
 

  return (
    <div className='line-chart-container'>
      <Line data={data} options={options} style={{width:"80%",}} ref={chartRef} onClick={onClick} />
      {<div>{selectedCamp} -
      {selectedCountry} -
      {pointSchool} -
      {pointMonth} -
      {pointLessons}</div>}
    </div>
  )


}
export default SelectCamp