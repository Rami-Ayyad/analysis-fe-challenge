import { ChartType, InteractionItem } from "chart.js";
import { LastOutPut } from "../../interfaces/interfaces";

const options:any= {
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'No of lessons'
            }
        }
    },
    layout: {

    },
    plugins: {
        legend: {

            position: 'right',
            labels: {
                usePointStyle: true,
                padding: 70,
                font: {
                    size: 18,
                }

            }
        }
    }
}

// used to get shool name of clicked point
const printDatasetAtEvent = (data: LastOutPut, dataset: InteractionItem[]):string|undefined => {
    if (!dataset.length) return;
    const datasetIndex = dataset[0].datasetIndex;
    const schoolName = data.datasets[datasetIndex].label;
    return schoolName
};

// used get month and no. of lessons at clicked point
const printElementAtEvent = (data: LastOutPut, element: InteractionItem[]):undefined|(string|number)[] => {
    if (!element.length) {
        return
    }

    const { datasetIndex, index } = element[0];
    const month: string = data.labels[index]
    const lessons: number = data.datasets[datasetIndex].data[index]
    return [month, lessons, index]
};

export { options, printDatasetAtEvent, printElementAtEvent }
