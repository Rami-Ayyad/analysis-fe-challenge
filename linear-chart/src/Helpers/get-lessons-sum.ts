import { Data, SchoolsData } from "../interfaces/interfaces"

const getTotalLessonsPerCamp = (filteredData: Data[]):number => {
    return filteredData
        .reduce((acc: number, filteredDataObj: Data) => acc += filteredDataObj.lessons!, 0)
};

const getTotalLessonsPerSchool = (filteredData: Data[]):SchoolsData[] => {
    let schoolsData: SchoolsData|any = {}
    filteredData.forEach((data: Data) => {
        if (data.school! in schoolsData) {
            schoolsData[data.school!] += data.lessons;
        } else {
            schoolsData[data.school!] = data.lessons;
        }
    })

    let schoolsArr: SchoolsData[] = [];
    for (let prop in schoolsData) {
        schoolsArr.push({
            school: prop, lessons: schoolsData[prop],
            includes: undefined,
            push: undefined
        });
    }
    return schoolsArr;
};

export {getTotalLessonsPerCamp, getTotalLessonsPerSchool}