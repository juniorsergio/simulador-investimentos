import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend,
    Tooltip,
} from 'chart.js';

import { options } from './graphOptions';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend,
    Tooltip
) 

interface GraphProjectionProps {
    values: {
        comAporte: {
            [name: string]: number
        },
        semAporte: {
            [name: string]: number
        }
    }
}

export function GraphProjection({ values }: GraphProjectionProps){
    const labels = Object.keys(values.semAporte)

    const data = {
        labels,
        datasets: [
            {
                label: 'Sem Aporte',
                data: Object.entries(values.semAporte).map(([key, value]) => {
                    return value
                }),
                backgroundColor: '#000000'
            },
            {
                label: 'Com Aporte',
                data: Object.entries(values.comAporte).map(([key, value]) => {
                    return value
                }),
                backgroundColor: '#ED8E53'
            }
        ]
    }

    return (
        <Bar options={options} data={data} />
    )
}