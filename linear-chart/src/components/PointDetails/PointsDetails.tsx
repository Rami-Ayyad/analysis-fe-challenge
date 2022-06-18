import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import './PointDetails.css'

interface Props {
}

const PointsDetails = () => {


  const selectedCamp = useSelector((state: any) => state.chartData.selectedCamp)
  const selectedCountry = useSelector((state: any) => state.chartData.selectedCountry)
  const pointSchool = useSelector((state: any) => state.chartData.pointSchool)
  const pointMonth = useSelector((state: any) => state.chartData.pointMonth)
  const pointLessons = useSelector((state: any) => state.chartData.pointLessons)

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
        <li>Lessons : <span>{pointLessons}</span></li>

      </ul>
    </div>
  )


}
export default PointsDetails