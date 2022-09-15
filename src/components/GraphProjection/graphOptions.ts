import { ChartOptions } from "chart.js";

export const options: ChartOptions<'bar'> = {
    plugins: {
        title: {
            display: true,
            text: 'Projeção de Valores',
            align: 'start',
            font: { size: 18, weight: 'bold' },
            color: 'black'
        },
        legend: {
            position: 'bottom',
            labels: {
                usePointStyle: true,
                color: 'black'
            }
        }
    },
    scales: {
        xAxes: {
            title: {
                display: true,
                text: 'Tempo (meses)',
                color: 'black'
            },
            stacked: true,
            grid: {
                display: false,
                drawBorder: false
            },
            ticks:{
                color: 'black'
            }
        },
        yAxes: {
            title: {
                display: true,
                text: 'Valor (R$)',
                color: 'black'
            },
            stacked: true,
            grid: {
                display: false,
                drawBorder: false
            },
            ticks:{
                display: false
            }
        }
    }
}