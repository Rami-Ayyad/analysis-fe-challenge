import { Data, LastOutPut } from "../interfaces/interfaces"



// const monthsArr: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
// const colorsArr: string[] = ["Aquamarine", "Aqua", "BlueViolet", "Chartreuse", "Crimson", "DarkOrange", "DeepPink", "Gold", "LightSeaGreen", "OrangeRed", "Tomato"]

// const displayableChartData: LastOutPut | any = {}

// displayableChartData["labels"] = monthsArr
// displayableChartData["datasets"] = []

// const schools: string[] = []

//Used in getDisplayableChartData(), returns arr with found lessons and 0s in empty months
function getExistingLessonsPerMonth(lessonsPerMonth: any) {
    const monthsArr: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const existingLessons: string | number[] = []
    for (let n = 0; n < monthsArr.length; n++) {
        if (Object.keys(lessonsPerMonth).includes(monthsArr[n])) {
            const foundLesson = lessonsPerMonth[monthsArr[n]];
            existingLessons.push(foundLesson);
        } else {
            existingLessons.push(0);
        }
    }
    return existingLessons;
}

//Used in getDisplayableChartData(), looks for months index and returns it
function getIndexOfMonth(month: string) {
    const monthsArr: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    for (let n = 0; n < monthsArr.length; n++) {
        if (monthsArr[n] == month) {
            return n;
        }
    }
    return 0;
}

//Generates the final data={} Obj for the chart
export function getDisplayableChartData(filteredData: Data | any,schools:any,displayableChartData:any,colorsArr:any,monthsArr:any) {
    
    for (let i = 0; i < filteredData.length; i++) {
        if (!schools.includes(filteredData[i]["school"])) {
            schools.push(filteredData[i]["school"])
            let randomColorIndex = Math.floor((Math.random() * colorsArr.length))

            displayableChartData["datasets"].push({
                label: filteredData[i]["school"],
                data: getExistingLessonsPerMonth({ [filteredData[i]["month"]]: filteredData[i]["lessons"] }),//[0,0,0,"Apr,0"...]
                fill: false,
                borderColor: colorsArr[randomColorIndex],
                tension: 0.2,
                spanGaps: true,
                borderWidth: "3",
                pointHitRadius: "2",
                pointRadius: "6"
            })

            
        } else {
            displayableChartData["datasets"].find((element: LastOutPut | any) => {
                   return element["label"] == filteredData[i]["school"]
                })["data"]
            [getIndexOfMonth(filteredData[i]["month"])] += filteredData[i]["lessons"]
        }
    }

    return displayableChartData
}