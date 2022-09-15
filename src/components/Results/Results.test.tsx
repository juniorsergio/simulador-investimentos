import { render, screen } from '@testing-library/react'
import { Results } from './Results'
import { Simulation } from "../../App";

const formatCurrencyMock = {
    valorFinalBruto: 1234.56
}

const graphValuesMock = {
    graficoValores: {
        comAporte: {
            '1': 10
        },
        semAporte: {
            '2': 20
        }
    }
}

jest.mock('react-chartjs-2', () => ({
    Bar: () => null
}))

describe('Results component', () => {
    it('is visible', () => {
        render(
            <Results simulation={{} as Simulation} visibility="visible" />
        )

        expect(screen.getByText('Resultado da Simulação')).toBeVisible()
    })

    it('it is not visible', () => {
        render(
            <Results simulation={{} as Simulation} visibility="hidden" />
        )

        expect(screen.getByText('Resultado da Simulação')).not.toBeVisible()
    })

    it('format currency as expected', () => {
        render(
            <Results simulation={formatCurrencyMock as Simulation} visibility="visible" />
        )

        expect(screen.getByText('R$ 1.234,56')).toBeInTheDocument()
    })

    it('renders graph', () => {
        render(
            <Results simulation={graphValuesMock as unknown as Simulation} visibility="visible" />
        )

        expect(screen.getByText('Resultado da Simulação')).toBeInTheDocument()
    })
})