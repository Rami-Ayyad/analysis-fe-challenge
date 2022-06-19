export interface State {
    isLoading: boolean,
    dataFromAPI: string | unknown[],
    error: string | undefined,
    selectedCountry: string,
    selectedCamp: string,
    selectedSchool: string,
    pointSchool: string,
    pointMonth: string,
    pointLessons: number,
};

export interface Data {
    id: string,
    month: string,
    camp: string,
    country: string,
    school: string,
    lessons: number
}


export interface SchoolsData {
    school: string,
    lessons: number
}


export interface LastOutPut {
    
    labels:string[],
    datasets:
     [
        {
            borderColor: string
            borderWidth: string
            data: number[]
            fill: false
            label: string
            pointHitRadius: string
            pointRadius: string
            spanGaps: boolean
            tension: number
        }

    ],
    
    
}