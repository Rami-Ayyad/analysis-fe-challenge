import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import './PointDetails.css'
import CountUp from 'react-countup'

interface Props {
}

const PointsDetails: React.FC = () => {


  const selectedCamp: string = useSelector((state: any) => state.chartData.selectedCamp)
  const selectedCountry: string = useSelector((state: any) => state.chartData.selectedCountry)
  const pointSchool: string = useSelector((state: any) => state.chartData.pointSchool)
  const pointMonth: string = useSelector((state: any) => state.chartData.pointMonth)
  const pointLessons: number = useSelector((state: any) => state.chartData.pointLessons)

  let navigate = useNavigate();
  function back() {
    navigate(-1)
  }
  return (
    <div className='pont-dtails-container'>

      <header>
        <button onClick={back} className='back'>{`< Back`}</button>

        <h1> Details About Selected Point :</h1>

      </header>
      <ul className='pont-dtails-list'>

        <li>Country : <span>{selectedCountry}</span></li>
        <li>Camp : <span>{selectedCamp}</span></li>
        <li>School : <span>{pointSchool}</span></li>
        <li>Month : <span>{pointMonth}</span></li>
        <li>Lessons : <span><CountUp end={pointLessons} /></span></li>

      </ul>
    </div>
  )


}
export default PointsDetails