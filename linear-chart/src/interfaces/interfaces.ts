export interface State {
    isLoading: boolean,
    dataFromAPI: Data [],
    errorFromAPI: string ,
    selectedCountry: string,
    selectedCamp: string,
    selectedSchool: string,
    pointSchool: string,
    pointMonth: string,
    pointLessons: number,
};

export interface Data {
    id?: string,
    month?: string,
    camp?: string,
    country?: string,
    school?: string,
    lessons?: number
}

export interface SchoolsData {
    includes:( string | undefined),
    push:( string | undefined),
    school: string,
    lessons: number
}

interface Datasets {
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

export interface LastOutPut {
    labels:string[],
    datasets:Datasets[],
    
}