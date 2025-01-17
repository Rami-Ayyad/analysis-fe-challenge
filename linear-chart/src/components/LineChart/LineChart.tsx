import React, { FC, ReactElement, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Chart as ChartJS, InteractionItem, registerables } from 'chart.js'
import { getDatasetAtEvent, getElementAtEvent, Line } from 'react-chartjs-2';
import { addPointSchool, addPointMonth, addPointLessons } from '../features/chartData/chartDataSlice';
import { useNavigate } from "react-router-dom"
import './LineChart.css'
import { LastOutPut } from "../../interfaces/interfaces"
import { options, printDatasetAtEvent, printElementAtEvent } from './LineChartLogic';

//Configuration for the chart to work
ChartJS.register(...registerables)

interface Props {
  finalDataObj: LastOutPut[],
}

const SelectCamp:React.FC<Props> = ({ finalDataObj }: Props):ReactElement => {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const data: LastOutPut|any = finalDataObj



  const chartRef = useRef(null);

  const handlePintClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>):undefined => {

    if (!chartRef.current) { return }

    const schoolName:string|undefined = printDatasetAtEvent(data, getDatasetAtEvent(chartRef.current, event));
    dispatch(addPointSchool(schoolName))

    const [month, lessons, index]:undefined|(string|number)[]|any = printElementAtEvent(data, getElementAtEvent(chartRef.current, event));
    dispatch(addPointMonth(month))
    dispatch(addPointLessons(lessons))

    if (index! >= 0) {
      navigate('/point-details', { replace: false })
    }
  };

  return (
    <div className='line-chart-container'>
      <Line data={data} options={options} style={{ width: "80%", }} ref={chartRef} onClick={handlePintClick} />
    </div>
  )


}
export default SelectCamp