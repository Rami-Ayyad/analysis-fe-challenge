import React, { useState, useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChartData } from '../features/chartData/chartDataSlice';
import { selectCountry, selectCamp, selectSchool } from '../features/chartData/chartDataSlice';
import { Chart as ChartJS, registerables } from 'chart.js'
import { Line } from 'react-chartjs-2';
import SelectCountry from '../SelectCountry/SelectCountry';
import SelectCamp from '../SelectCamp/SelectCamp'
import SelecSchool from '../SelectSchool/SelectSchool'
import { BounceLoader, BarLoader, BeatLoader } from 'react-spinners'
ChartJS.register(...registerables)

const App: React.FC = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchChartData())
  }, [])

  const selectedCountry = useSelector((state: any) => state.chartData.selectedCountry)
  const selectedCamp = useSelector((state: any) => state.chartData.selectedCamp)
  const selectedSchool = useSelector((state: any) => state.chartData.selectedSchool)
  // console.log(selectedCountry,selectedCamp,selectedSchool)

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
  console.log(JSON.stringify(filteredData))


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
    let Months: any = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    monthsArr.sort((a: any, b: any) => {
      return Months.indexOf(a.month) - Months.indexOf(b.month)
    })

    return monthsArr


  }
  let lessonsPerMonthForSchool = lessonsPerMonthForChosenSchool(filteredData)
  // console.log(lessonsPerMonthForSchool)


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
  let Months: any = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let mappedMonths: any = []
  Months.forEach((month: any) => {
    const item: any = lessonsPerMonthForSchool?.find((item: any) => item?.month === month)
    if (item) {
      mappedMonths.push(item)
    }
    else {
      mappedMonths.push({ month: null, lessons: 0 })
    }
  })
  // console.log(mappedMonths)



  ////////////////////////
  // let mappedzeft:any = []
  // filteredData.forEach((data:any)=>{

  // })
  // console.log(mappedzeft)





  const data: any = {
    labels: Months,
    datasets:
      [{
        label: selectedSchool,
        data: mappedMonths.map((obj: any) => obj.lessons),//[65, 59, 81, , 55, 40, 30, 56, 45, 23, 95, 51],
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        spanGaps: true,
        borderWidth: "3",
        pointHitRadius: "2",
        pointRadius: "4"
      }]
  }

  const options: any = {

  }


  return (
    <div className="App">


      <h1 className='main-title'>Analysis Chart</h1>
      <h2 className='secondary-title'>Number of Lessons</h2>

      <div className='selects-container'>
        <SelectCountry selectOptions={uniqueCountryNames} />
        <SelectCamp selectOptions={uniqueCampNames} />
        <SelecSchool selectOptions={uniqueSchoolNames} />
      </div>


      {<div><BeatLoader size={40} color="rgb(75, 192, 192)" loading={chartDataState.loading} /></div>}
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

      {/* {<div><BounceLoader loading={chartDataState.loading}/></div>} */}
      <div style={{ width: "500px", height: "500px", margin: "auto" }}><Line data={data} options={options} /></div>

    </div>
  );
}

export default App;
