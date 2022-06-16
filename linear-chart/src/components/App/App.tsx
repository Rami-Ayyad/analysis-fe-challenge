import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChartData } from '../features/chartData/chartDataSlice';
import { objectTraps } from 'immer/dist/internal';

function App() {
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedCamp, setSelectedCamp] = useState("")
  const [selectedSchool, setSelectedSchool] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchChartData())
  }, [])

  const chartDataState = useSelector((state: any) => state.chartData)

  const uniqueCountryNames = chartDataState.chartData
    .map((dataObj: any) => dataObj.country)
    .filter((countryName: any, index: any, arr: any) => {
      return arr.indexOf(countryName) === index;
    })

  const uniqueCampNames = chartDataState.chartData
    .map((dataObj: any) => dataObj.camp)
    .filter((campName: any, index: any, arr: any) => {
      return arr.indexOf(campName) === index;
    })

  const uniqueSchoolNames = chartDataState.chartData
    .map((dataObj: any) => dataObj.school)
    .filter((schoolName: any, index: any, arr: any) => {
      return arr.indexOf(schoolName) === index;
    })
  // console.log(uniqueCampNames)
  // console.log(uniqueCountryNames)
  // console.log(uniqueSchoolNames)

  function filterData(chosenCounrty:string, chosenCamp:string, chosenSchool:string,) {
    if(chosenSchool === "Show all") {
      return chartDataState.chartData.filter((dataObj:any) => (
        dataObj.camp === chosenCamp &&
        dataObj.country === chosenCounrty
        ))
    }
    else {
      return chartDataState.chartData.filter((dataObj:any) => (
        dataObj.country === chosenCounrty &&
        dataObj.camp === chosenCamp &&
        dataObj.school === chosenSchool
        ))
    }
  }
let filteredData = filterData(selectedCountry,selectedCamp,selectedSchool)
// console.log(filteredData)

let totalLessons = filteredData.reduce((acc:number,filteredDataObj:any) => acc+=filteredDataObj.lessons ,0)
// console.log(totalLessons)



function sumOfLesssonsPerSchool(filteredData:any) {
  let schoolsData:any = {}
  filteredData.forEach((data:any) => {
    if(data.school in schoolsData) {
      schoolsData[data.school] += data.lessons;
    }else {
      schoolsData[data.school] = data.lessons;
    }
  });
  // to display each school and its lessons in an array
  let schoolsArr = [];
  for(let prop in schoolsData) {
    schoolsArr.push({school:prop, lessons: schoolsData[prop]});
  }
  return schoolsArr;
}
let lessonsPershool = sumOfLesssonsPerSchool(filteredData)
// console.log(lessonsPershool);

  

  return (
    <div className="App">
      <h1>data from api</h1>

      <label>Select Country
        <select value={selectedCountry} onChange={e => setSelectedCountry(e.currentTarget.value)}>
          <option>Select</option>
          {uniqueCountryNames.map((country: string) => (
            <option>{country}</option>
          ))}
        </select>
      </label>
      <div>{selectedCountry==="Select"?"Please Select Country":null}</div>


      <label>Select Camp
        <select value={selectedCamp} onChange={e => setSelectedCamp(e.currentTarget.value)}>
          <option>Select</option>
          {uniqueCampNames.map((camp: string) => (
            <option>{camp}</option>
          ))}
        </select>
      </label>
      <div>{selectedCamp==="Select"?"Please Select Camp":null}</div>


      <label>Select School
        <select value={selectedSchool} onChange={e => setSelectedSchool(e.currentTarget.value)}>
          <option>Select</option>
          <option>Show all</option>
          {uniqueSchoolNames.map((school: string) => (
            <option>{school}</option>
          ))}
        </select>
      </label>
      {/* <div>{selectedSchool==="Select"?"Please Select School"}</div> */}



      {chartDataState.loading && <h1>Loading...</h1>}
      {!chartDataState.loading && chartDataState.error ? <h2>Error:{chartDataState.error}</h2> : null}
      {!chartDataState.loading && (selectedSchool!== "Select" && selectedCamp!== "Select" && selectedCountry!== "Select")? (
        <div>
          <h5>{selectedSchool ==="Select"? (`Please Select School`):(`${totalLessons?totalLessons:`No`} Lessons In ${selectedCamp} `)}</h5>
          <ul>
            {
              totalLessons?lessonsPershool.map((dataObj: any) => (
                <li key={dataObj.school}>{`${dataObj.lessons} Lessons In ${dataObj.school}`}</li>
              )):`No Lessons In Selected School`
            }
          </ul>
        </div>
      ) : null}

    </div>
  );
}

export default App;
