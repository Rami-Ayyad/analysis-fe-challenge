import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChartData } from '../features/chartData/chartDataSlice';
import { objectTraps } from 'immer/dist/internal';
import { Chart as ChartJS, registerables } from 'chart.js'
import { Line } from 'react-chartjs-2';

ChartJS.register(...registerables)

function App() {
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedCamp, setSelectedCamp] = useState("")
  const [selectedSchool, setSelectedSchool] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchChartData())
  }, [])

  const chartDataState = useSelector((state: any) => state.chartData)

  //uniqe Arrays for Countries, Camps, and Schools.
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

  //Takes data from each select input and uses it filter the whole fetched data from API
  function filterData(chosenCounrty: string, chosenCamp: string, chosenSchool: string,) {
    if (chosenSchool === "Show all") {
      return chartDataState.chartData.filter((dataObj: any) => (
        dataObj.camp === chosenCamp &&
        dataObj.country === chosenCounrty
      ))
    }
    else {
      return chartDataState.chartData.filter((dataObj: any) => (
        dataObj.country === chosenCounrty &&
        dataObj.camp === chosenCamp &&
        dataObj.school === chosenSchool
      ))
    }
  }
  let filteredData = filterData(selectedCountry, selectedCamp, selectedSchool)
  console.log(filteredData)

  /////////////////////////////////////////////////////////
  // function zeft() {
    
  //   return filteredData.map((obj:any)=>{
     
  //   })


  // }console.log(zeft())


  function lessonsPerMonthForChosenSchool(filteredData: any) {
    if (selectedSchool === "Show all") return
    let monthsData: any = {}
    
    filteredData.forEach((data: any) => {
      if (data.month in monthsData) {
        monthsData[data.month] += data.lessons;
      
      } else {
        monthsData[data.month] = data.lessons;
     
      }
    });

    let monthsArr = [];
    for (let prop in monthsData) {
      monthsArr.push({ month: prop, lessons: monthsData[prop] });
    }

    //sort by months
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    monthsArr.sort((a:any,b:any)=>{
      return months.indexOf(a.month)-months.indexOf(b.month)
    })

    return monthsArr
    

  }
  let lessonsPerMonthForSchool = lessonsPerMonthForChosenSchool(filteredData)
  console.log(lessonsPerMonthForSchool)


  //Sum of all lessons in a chosen Camp
  let totalLessons = filteredData.reduce((acc: number, filteredDataObj: any) => acc += filteredDataObj.lessons, 0)
  // console.log(totalLessons)


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
  let lessonsPerShool = sumOfLesssonsPerSchool(filteredData)

  // console.log(lessonsPerShool);



  // map only existing months to new array and leave non existing months empty
  let Months:any =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let mappedMonths:any = []
  Months.forEach((month:any)=>{
    const item:any = lessonsPerMonthForSchool?.find((item:any)=> item?.month === month)
    if(item){
      mappedMonths.push(item)
    }
    else{
      mappedMonths.push({month:null, lessons:0})
    }
  })
  console.log(mappedMonths)



////////////////////////


  let mappedzeft:any = []
  console.log(mappedzeft)

  
    
  
 

  const data: any = {
    labels: Months,
    datasets:
      [{
        label: selectedSchool,
        data:mappedMonths.map((obj:any) => obj.lessons  ),//[65, 59, 81, , 55, 40, 30, 56, 45, 23, 95, 51],
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        spanGaps:true
      }]
  }

  const options: any = {

  }


  return (
    <div className="App">
      <h1>data from api</h1>

      <label>Select Country
        <select value={selectedCountry} onChange={e => setSelectedCountry(e.currentTarget.value)}>
          <option>Select</option>
          {uniqueCountryNames.map((country: string, index: number) => (
            <option key={index}>{country}</option>
          ))}
        </select>
      </label>
      <div>{selectedCountry === "Select" ? "Please Select Country" : null}</div>


      <label>Select Camp
        <select value={selectedCamp} onChange={e => setSelectedCamp(e.currentTarget.value)}>
          <option>Select</option>
          {uniqueCampNames.map((camp: string, index: number) => (
            <option key={index}>{camp}</option>
          ))}
        </select>
      </label>
      <div>{selectedCamp === "Select" ? "Please Select Camp" : null}</div>


      <label>Select School
        <select value={selectedSchool} onChange={e => setSelectedSchool(e.currentTarget.value)}>
          <option>Select</option>
          <option>Show all</option>
          {uniqueSchoolNames.map((school: string, index: number) => (
            <option key={index}>{school}</option>
          ))}
        </select>
      </label>
      <div>{selectedSchool === "Select" ? "Please Select School" : null}</div>



      {chartDataState.loading && <h1>Loading...</h1>}
      {!chartDataState.loading && chartDataState.error ? <h2>Error:{chartDataState.error}</h2> : null}
      {!chartDataState.loading && (selectedSchool !== "Select" && selectedCamp !== "Select" && selectedCountry !== "Select") ? (
        <div>
          <h5>{selectedSchool === "Select" ? (`Please Select School`) : (`${totalLessons ? totalLessons : `No`} Lessons In ${selectedCamp} `)}</h5>
          <ul>
            {
              totalLessons ? lessonsPerShool.map((dataObj: any) => (
                <li key={dataObj.school}>{`${dataObj.lessons} Lessons In ${dataObj.school}`}</li>
              )) : `No Lessons In Selected School`
            }
          </ul>
        </div>
      ) : null}


      <div style={{ width: "500px", height: "500px", margin: "auto" }}><Line data={data} options={options} /></div>

    </div>
  );
}

export default App;
