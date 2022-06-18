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
import { Chart as ChartJS, registerables } from 'chart.js'

//configuration for the chart
ChartJS.register(...registerables)

const App:React.FC = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchChartData())
  }, [])

  const selectedCountry = useSelector((state: any) => state.chartData.selectedCountry)
  const selectedCamp = useSelector((state: any) => state.chartData.selectedCamp)
  const selectedSchool = useSelector((state: any) => state.chartData.selectedSchool)
  // console.log(selectedCountry,selectedCamp,selectedSchool)

  const isLoading = useSelector((state: any) => state.chartData.isLoading)
  const dataFromAPI = useSelector((state: any) => state.chartData.dataFromAPI)
  const errorFromAPI = useSelector((state: any) => state.chartData.error)

  //uniqe Arrays for Countries, Camps, and Schools.
  const uniqueCountryNames = dataFromAPI
    .map((dataObj: any) => dataObj.country)
    .filter((countryName: any, index: any, arr: any) => {
      return arr.indexOf(countryName) === index;
    })


  const uniqueCampNames = dataFromAPI
    .map((dataObj: any) => dataObj.camp)
    .filter((campName: any, index: any, arr: any) => {
      return arr.indexOf(campName) === index;
    })

  const uniqueSchoolNames = dataFromAPI
    .map((dataObj: any) => dataObj.school)
    .filter((schoolName: any, index: any, arr: any) => {
      return arr.indexOf(schoolName) === index;
    })


  //Takes data from each select input and uses it filter the whole fetched data from API
  function filterData(chosenCounrty: string, chosenCamp: string, chosenSchool: string,) {
    if (chosenSchool === "Show all") {
      return dataFromAPI.filter((dataObj: any) => (
        dataObj.camp === chosenCamp &&
        dataObj.country === chosenCounrty
      ))
    }
    else {
      return dataFromAPI.filter((dataObj: any) => (
        dataObj.country === chosenCounrty &&
        dataObj.camp === chosenCamp &&
        dataObj.school === chosenSchool
      ))
    }
  }
  let filteredData = filterData(selectedCountry, selectedCamp, selectedSchool)
  console.log(filteredData)


  //Sum of all lessons in a chosen Camp
  let totalLessonsPerCamp = filteredData.reduce((acc: number, filteredDataObj: any) => acc += filteredDataObj.lessons, 0)
  // console.log(totalLessonsPerCamp)


  //Sum of all lessons for each school
  function sumOfLesssonsPerSchool(filteredData: any) {
    let schoolsData: any = {}
    filteredData.forEach((data: any) => {
      if (data.school in schoolsData) {
        schoolsData[data.school] += data.lessons;
      } else {
        schoolsData[data.school] = data.lessons;
      }
    });
    let schoolsArr = [];
    for (let prop in schoolsData) {
      schoolsArr.push({ school: prop, lessons: schoolsData[prop] });
    }
    return schoolsArr;
  }
  let totalLessonsPerShool = sumOfLesssonsPerSchool(filteredData)
  // console.log(totalLessonsPerShool);

  
  const labels:any =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  const colors:any = ["Aquamarine", "Aqua", "BlueViolet", "Chartreuse", "Crimson", "DarkOrange", "DeepPink", "Gold", "LightSeaGreen", "OrangeRed", "Tomato"]

  const lastOutPut:any = {}

  lastOutPut["labels"] = labels
  lastOutPut["datasets"] = []

  const schools:any = []

  //Used in getLastOutput() & return sum of lessons for each month for each school
  function getData(lessonsPerMonth:any) {
    const labels:any =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const values:any = []
    for ( let n = 0 ; n < labels.length; n++) {
      if (Object.keys(lessonsPerMonth).includes(labels[n])) {
        let newValue = lessonsPerMonth[labels[n]]!;
        values.push(newValue);
      } else {
        values.push(0);
      }
    }
    return values;
  }

  //Used in getLastOutput() & return array of
  function getLessonsByMonth(month:any) {
    const labels:any =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    for (let n = 0 ; n < labels.length; n++) {
      if (labels[n] == month) {
        return n;
      }
    }
    return 0;
  }

  //Generates the final data={} Obj for the chart
  function getLastOutput(filteredData:any, schools:any, lastOutPut:any, colors:any) {

    for(let i = 0 ;i < filteredData.length ; i++) {
      if(!schools.includes(filteredData[i]["school"] )) {
        let randomColorIndex = Math.floor((Math.random() * colors.length))
        console.log(colors.length,randomColorIndex)

        lastOutPut["datasets"].push({
        label: filteredData[i]["school"],
        data: getData({[filteredData[i]["month"]]:filteredData[i]["lessons"]}),
        fill: false,
        borderColor: colors[randomColorIndex],
        tension: 0.2,
        spanGaps: true,
        borderWidth: "3",
        pointHitRadius: "2",
        pointRadius: "6"
        })

        schools.push(filteredData[i]["school"])
      } else {
        lastOutPut["datasets"].find(
          (element:any) => element["label"] == filteredData[i]["school"])["data"]
          [getLessonsByMonth(filteredData[i]["month"])] += filteredData[i]["lessons"]
      }
    }

    return lastOutPut
  }
  const FinalFormatedData = getLastOutput(filteredData, schools, lastOutPut, colors)
  console.log(FinalFormatedData)


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
          <LineChart finalDataObj={FinalFormatedData}/>

          <h5 className='total-schools-in-camp'>{(selectedSchool !== "Select" && filteredData.length > 0) ? (`${totalLessonsPerCamp} Lessons In ${selectedCamp}`) :null}</h5>
          {!errorFromAPI && (selectedSchool !== "Select" && selectedCamp !== "Select" && selectedCountry !== "Select") ? (
            <div className='chart-labels-container'>
              <ul className='chart-labels-list'>
                {
                  totalLessonsPerCamp ? totalLessonsPerShool.map((dataObj: any) => (
                    <li className='chart-labels-list-item' key={dataObj.school} ><em>{<CountUp end={dataObj.lessons}/>}</em> Lessons In</li>
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
