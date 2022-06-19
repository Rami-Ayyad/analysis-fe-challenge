import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChartData } from '../features/chartData/chartDataSlice';
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
import { getDisplayableChartData } from '../../Helpers/get-chart-data-obj';

const App: React.FC = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchChartData())
  }, [])



  //state from store
  const {selectedCountry, selectedCamp, selectedSchool, isLoading, dataFromAPI, errorFromAPI } =
  useSelector((state:any) => state.chartData)

  const uniqueCountryNames:string[] = getUniqueCountryNames(dataFromAPI)
  const uniqueCampNames:string[] = getUniqueCampNames(dataFromAPI)
  const uniqueSchoolNames: string[] = getUniqueSchoolNames(dataFromAPI)

  //filter data based on user selections
  const filteredData = getFilteredData(dataFromAPI ,selectedCountry, selectedCamp, selectedSchool)
  
  //Sum of all lessons in a chosen Camp
  const totalLessonsPerCamp: SchoolsData[] = getTotalLessonsPerCamp(filteredData)

  //Sum of all lessons for chosen school
  const totalLessonsPerShool = getTotalLessonsPerSchool(filteredData)

  const monthsArr: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const colorsArr: string[] = ["Aquamarine", "Aqua", "BlueViolet", "Chartreuse", "Crimson", "DarkOrange", "DeepPink", "Gold", "LightSeaGreen", "OrangeRed", "Tomato"]

const displayableChartData: LastOutPut | any = {}

displayableChartData["labels"] = monthsArr
displayableChartData["datasets"] = []

const schools: string[] = []
  const FinalFormatedData2 = getDisplayableChartData(filteredData, schools, displayableChartData,colorsArr,monthsArr)
  console.log(FinalFormatedData2)
 
 


  // const labels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  // const colors: string[] = ["Aquamarine", "Aqua", "BlueViolet", "Chartreuse", "Crimson", "DarkOrange", "DeepPink", "Gold", "LightSeaGreen", "OrangeRed", "Tomato"]

  // const lastOutPut: LastOutPut | any = {}

  // lastOutPut["labels"] = labels
  // lastOutPut["datasets"] = []

  // const schools: string[] = []

  // //Used in getLastOutput() & return sum of lessons for each month for each school
  // function getData(lessonsPerMonth: any) {
  //   const labels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  //   const values: string | number[] = []
  //   for (let n = 0; n < labels.length; n++) {
  //     if (Object.keys(lessonsPerMonth).includes(labels[n])) {
  //       let newValue = lessonsPerMonth[labels[n]]!;
  //       values.push(newValue);
  //     } else {
  //       values.push(0);
  //     }
  //   }
  //   return values;
  // }

  // //Used in getLastOutput() & return array of
  // function getLessonsByMonth(month: string) {
  //   const labels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  //   for (let n = 0; n < labels.length; n++) {
  //     if (labels[n] == month) {
  //       return n;
  //     }
  //   }
  //   return 0;
  // }

  // //Generates the final data={} Obj for the chart
  // function getLastOutput(filteredData: Data | any) {

  //   for (let i = 0; i < filteredData.length; i++) {
  //     if (!schools.includes(filteredData[i]["school"])) {
  //       let randomColorIndex = Math.floor((Math.random() * colors.length))
       
  //       lastOutPut["datasets"].push({
  //         label: filteredData[i]["school"],
  //         data: getData({ [filteredData[i]["month"]]: filteredData[i]["lessons"] }),
  //         fill: false,
  //         borderColor: colors[randomColorIndex],
  //         tension: 0.2,
  //         spanGaps: true,
  //         borderWidth: "3",
  //         pointHitRadius: "2",
  //         pointRadius: "6"
  //       })

  //       schools.push(filteredData[i]["school"])
  //     } else {
  //       lastOutPut["datasets"].find(
  //         (element: LastOutPut | any) => element["label"] == filteredData[i]["school"])["data"]
  //       [getLessonsByMonth(filteredData[i]["month"])] += filteredData[i]["lessons"]
  //     }
  //   }

  //   return lastOutPut
  // }
  // const FinalFormatedData: LastOutPut = getLastOutput(filteredData)
  // console.log(FinalFormatedData)

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
          <LineChart finalDataObj={FinalFormatedData2} />

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
