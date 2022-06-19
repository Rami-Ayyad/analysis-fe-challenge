import React, { FC, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Chart as ChartJS, InteractionItem, registerables } from 'chart.js'
import { getDatasetAtEvent, getElementAtEvent, Line } from 'react-chartjs-2';
import { addPointSchool, addPointMonth, addPointLessons } from '../features/chartData/chartDataSlice';
import { useNavigate } from "react-router-dom"
import './LineChart.css'
import { LastOutPut } from "../../interfaces/interfaces"

//Configuration for the chart to work
ChartJS.register(...registerables)

interface Props {
  finalDataObj: LastOutPut,
}

const SelectCamp = ({ finalDataObj }: Props) => {

  let navigate = useNavigate();



  const data: LastOutPut | any = finalDataObj

  const dispatch = useDispatch()

  const options: any = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'No of lessons'
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
          padding: 70,
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
    return datasetIndex
  };


  const chartRef: any = useRef<ChartJS>(null);

  const onClick = (event: any) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    const index: number | undefined = printElementAtEvent(getElementAtEvent(chart, event));

    if (index! >= 0) {
      navigate('/point-details', { replace: false })
    }


  };

  return (
    <div className='line-chart-container'>
      <Line data={data} options={options} style={{ width: "80%", }} ref={chartRef} onClick={onClick} />
    </div>
  )


}
export default SelectCamp