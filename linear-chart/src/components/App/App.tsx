import React, { ReactElement, useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChartData } from '../../services/fetch-data'
import SelectCountry from '../SelectCountry/SelectCountry';
import SelectCamp from '../SelectCamp/SelectCamp'
import SelecSchool from '../SelectSchool/SelectSchool'
import LineChart from '../LineChart/LineChart';
import Spinner from '../Spinner/Spinner'
import CountUp from 'react-countup';
import { State, Data, SchoolsData, LastOutPut } from '../../interfaces/interfaces';
import { getUniqueCountryNames, getUniqueCampNames, getUniqueSchoolNames } from '../../Helpers/get-names';
import { getFilteredData } from '../../Helpers/filter-data';
import { getTotalLessonsPerCamp, getTotalLessonsPerSchool } from '../../Helpers/get-lessons-sum';
import { getDisplayableChartData } from '../../Helpers/get-chart-obj';
import { RootState } from '../../services/store';

const App: React.FC = (): ReactElement => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchChartData())
  }, [])

  //state from store
  const { selectedCountry, selectedCamp, selectedSchool, isLoading, dataFromAPI, errorFromAPI } =
    useSelector((state: RootState) => state.chartData)

  const uniqueCountryNames: string[] = getUniqueCountryNames(dataFromAPI)
  const uniqueCampNames: string[] = getUniqueCampNames(dataFromAPI)
  const uniqueSchoolNames: string[] = getUniqueSchoolNames(dataFromAPI)

  //filter data based on user selections
  const filteredData:Data[] = getFilteredData(dataFromAPI, selectedCountry, selectedCamp, selectedSchool)

  //Sum of all lessons in a chosen Camp
  const totalLessonsPerCamp: number= getTotalLessonsPerCamp(filteredData)

  //Sum of all lessons for chosen school
  const totalLessonsPerShool: SchoolsData[]  = getTotalLessonsPerSchool(filteredData)

  //creating an object that the chart would accept to display data
  const monthsArr: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const colorsArr: string[] = ["Aquamarine", "Aqua", "BlueViolet", "Chartreuse", "Crimson", "DarkOrange", "DeepPink", "Gold", "LightSeaGreen", "OrangeRed", "Tomato"]
  const schools: string[] = []

  const displayableChartData: LastOutPut  = {
    labels: [],
    datasets: []
  }
  displayableChartData["labels"] = monthsArr
  displayableChartData["datasets"] = []

  const FinalFormatedData:LastOutPut[] = getDisplayableChartData(filteredData, schools, displayableChartData, colorsArr, monthsArr)

  return (
    <div className="App">

      <h1 className='main-title'>Analysis Chart</h1>
      <h2 className='secondary-title'>Number of Lessons</h2>

      <div className='selects-container'>
        <SelectCountry selectOptions={uniqueCountryNames} />
        <SelectCamp selectOptions={uniqueCampNames} />
        <SelecSchool selectOptions={uniqueSchoolNames} />
      </div>

      <div>{errorFromAPI ? <h2 className='api-error-message'>Error: {errorFromAPI}</h2> : null}</div>
      {isLoading ? <Spinner /> :
        <div className='chart-data-and-labels-conatiner'>
          <LineChart finalDataObj={FinalFormatedData} />

          <h5 className='total-schools-in-camp'>{(selectedSchool !== "Select" && filteredData.length > 0) ? (`${totalLessonsPerCamp} Lessons In ${selectedCamp}`) : null}</h5>
          {!errorFromAPI && (selectedSchool !== "Select" && selectedCamp !== "Select" && selectedCountry !== "Select") ? (
            <div className='chart-labels-container'>
              <ul className='chart-labels-list'>
                {
                  totalLessonsPerCamp ? totalLessonsPerShool.map((dataObj: any) => (
                    <li className='chart-labels-list-item' key={dataObj.school} ><em>{<CountUp end={dataObj.lessons} />}</em> Lessons In</li>
                  )) : <h4 className='no-lessons-available'>No Lessons Available In Selected School !</h4>
                }
              </ul>
            </div>
          ) : null}

        </div>}
    </div>
  );
}

export default App
