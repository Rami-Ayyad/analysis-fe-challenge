import { Data } from "../interfaces/interfaces";

export const getFilteredData = (
    dataFromAPI: Data[],
    chosenCounrty: string,
    chosenCamp: string,
    chosenSchool: string,):Data[] => {
        
    if (chosenSchool === "Show all") {
        return dataFromAPI.filter((dataObj: Data) => (
            dataObj.camp === chosenCamp &&
            dataObj.country === chosenCounrty
        ))
    }
    else {
        return dataFromAPI.filter((dataObj: Data) => (
            dataObj.country === chosenCounrty &&
            dataObj.camp === chosenCamp &&
            dataObj.school === chosenSchool
        ))
    }
};