import { Data } from "../interfaces/interfaces";

const getUniqueCountryNames = (dataFromAPI: Data[]):string[] => {
    return dataFromAPI
        .map((dataObj: Data) => dataObj.country!)
        .filter((countryName:string, index:number, arr :string[]) => {
            return arr.indexOf(countryName) === index;
        })
};



const getUniqueCampNames = (dataFromAPI: Data[]): string[] => {
    return dataFromAPI
        .map((dataObj: Data) => dataObj.camp!)
        .filter((campName: string, index: number, arr: string[]) => {
            return arr.indexOf(campName) === index;
        })
};

const getUniqueSchoolNames = (dataFromAPI: Data[]): string[] => {
    return dataFromAPI
        .map((dataObj: Data) => dataObj.school!)
        .filter((schoolName:string, index: number, arr: string[]) => {
            return arr.indexOf(schoolName) === index;
        })
};

export { getUniqueCountryNames, getUniqueCampNames, getUniqueSchoolNames };
