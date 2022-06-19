import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import './PointDetails.css'
import CountUp from 'react-countup'
import { ReactElement } from 'react'
import { RootState } from '../../services/store'

interface Props {
}

const PointsDetails: React.FC = ():ReactElement => {

  const { selectedCamp, selectedCountry, pointSchool,
    pointMonth, pointLessons } = useSelector((state: RootState) => state.chartData)


  const navigate = useNavigate();

  const back = ():void => {
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