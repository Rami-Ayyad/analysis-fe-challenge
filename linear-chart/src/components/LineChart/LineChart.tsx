import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Chart as ChartJS, registerables } from 'chart.js'
import { Line } from 'react-chartjs-2';
import './LineChart.css'

//Configuration for the chart to work
ChartJS.register(...registerables)

interface Props {
  finalDataObj:any,
}

const SelectCamp = ({ finalDataObj }: Props) => {

  const selectedSchool = useSelector((state: any) => state.chartData.selectedSchool)

  let Months: any = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const data: any = finalDataObj


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
          font: {
            size: 18,
          }

        }
      }
    }
  }

  const dispatch = useDispatch()
  const selectedCamp = useSelector((state: any) => state.chartData.selectedCamp)

  return (
    <div className='line-chart-container'>
      <Line data={data} options={options} />
    </div>
  )


}
export default SelectCamp