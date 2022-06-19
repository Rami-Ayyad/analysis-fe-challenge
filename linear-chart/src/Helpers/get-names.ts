import { Data } from "../interfaces/interfaces";

const getUniqueCountryNames = (dataFromAPI: any): string[] => {
    return dataFromAPI
        .map((dataObj: Data) => dataObj.country)
        .filter((countryName: string, index: number, arr: string[]) => {
            return arr.indexOf(countryName) === index;
        })
};



const getUniqueCampNames = (dataFromAPI: any): string[] => {
    return dataFromAPI
        .map((dataObj: Data) => dataObj.camp)
        .filter((campName: string, index: number, arr: string[]) => {
            return arr.indexOf(campName) === index;
        })
};

const getUniqueSchoolNames = (dataFromAPI: any): string[] => {
    return dataFromAPI
        .map((dataObj: any) => dataObj.school)
        .filter((schoolName: any, index: any, arr: any) => {
            return arr.indexOf(schoolName) === index;
        })
};

export { getUniqueCountryNames, getUniqueCampNames, getUniqueSchoolNames };
