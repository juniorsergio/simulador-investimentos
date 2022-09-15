import { render, screen, act, fireEvent, waitFor } from '@testing-library/react'
import { Simulator } from './Simulator'

const indicatorsMock = [
    {
        nome: 'cdi',
        valor: 9.15
    },
    {
        nome: 'ipca',
        valor: 10.06
    }
]

const getSimulationResultsMock = jest.fn()

global.fetch = jest.fn(() =>
    Promise.resolve({
        status: 200,
        json: () => Promise.resolve(indicatorsMock)
    })
) as jest.Mock

describe('Simulator component', () => {
    it('renders correctly', async () => {
        // awaits for useEffect to finish
        await act(async () => render(
            <Simulator getSimulationResults={getSimulationResultsMock} />
        ) as any)

        expect(screen.getByDisplayValue('9.15%')).toBeInTheDocument()
    })

    it('renders correctly with API status 404', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 404
            })
        ) as jest.Mock

        // awaits for useEffect to finish
        await act(async () => render(
            <Simulator getSimulationResults={getSimulationResultsMock} />
        ) as any)

        const cdi = screen.getByRole('textbox', { name: 'cdi' }) as HTMLInputElement
        const ipca = screen.getByRole('textbox', { name: 'ipca' }) as HTMLInputElement

        expect(cdi.value).toBe('0%')
        expect(ipca.value).toBe('0%')
    })

    it('changes selected element on list', () => {
        render(
            <Simulator getSimulationResults={getSimulationResultsMock} />
        )

        const listElements = [
            screen.getByRole('listitem', { name: 'liquido' }),
            screen.getByRole('listitem', { name: 'pre' })
        ]

        listElements.forEach((e) => {
            act(() => {
                fireEvent.click(e)
            })
            expect(e).toHaveClass('active')
        })
    })

    it('identifies text instead of numeric input on initialTransfer as wrong', async () => {
        render(
            <Simulator getSimulationResults={getSimulationResultsMock} />
        )
        
        act(() => {
            fireEvent.input((screen.getByRole('textbox', { name: 'Aporte Inicial' })), {
                target: { value: 'teste' }
            })
        })

        expect(await screen.findByText('Aporte deve ser um número')).toBeInTheDocument()
    })

    it('identifies text instead of numeric input on timeInMonths as wrong', async () => {
        render(
            <Simulator getSimulationResults={getSimulationResultsMock} />
        )
        
        act(() => {
            fireEvent.input((screen.getByRole('textbox', { name: 'Prazo (em meses)' })), {
                target: { value: 'teste' }
            })
        })

        expect(await screen.findByText('Prazo deve ser um número')).toBeInTheDocument()
    })

    it('identifies text instead of numeric input on monthlyTransfer as wrong', async () => {
        render(
            <Simulator getSimulationResults={getSimulationResultsMock} />
        )
        
        act(() => {
            fireEvent.input((screen.getByRole('textbox', { name: 'Aporte Mensal' })), {
                target: { value: 'teste' }
            })
        })

        expect(await screen.findByText('Aporte deve ser um número')).toBeInTheDocument()
    })

    it('identifies text instead of numeric input on investimentReturn as wrong', async () => {
        render(
            <Simulator getSimulationResults={getSimulationResultsMock} />
        )
        
        act(() => {
            fireEvent.input((screen.getByRole('textbox', { name: 'Rentabilidade' })), {
                target: { value: 'teste' }
            })
        })

        expect(await screen.findByText('Rentabilidade deve ser um número')).toBeInTheDocument()
    })

    it('has submit enabled with all numeric inputs', async () => {
        render(
            <Simulator getSimulationResults={getSimulationResultsMock} />
        )

        act(() => {
            fireEvent.input((screen.getByRole('textbox', { name: 'Aporte Inicial' })!), {
                target: { value: 10 }
            })
            fireEvent.input((screen.getByRole('textbox', { name: 'Prazo (em meses)' })), {
                target: { value: 10 }
            })
            fireEvent.input((screen.getByRole('textbox', { name: 'Aporte Mensal' })), {
                target: { value: 10 }
            })
            fireEvent.input((screen.getByRole('textbox', { name: 'Rentabilidade' })), {
                target: { value: 10 }
            })
        })

        await waitFor(() => 
            expect(screen.getByRole('button', { name: 'Simular' })).toBeEnabled()
        )
        expect(screen.queryByText('deve ser um número')).not.toBeInTheDocument()
    })

    it('submits form correctly', async () => {
        render(
            <Simulator getSimulationResults={getSimulationResultsMock} />
        )

        act(() => {
            fireEvent.input((screen.getByRole('textbox', { name: 'Aporte Inicial' })!), {
                target: { value: 10 }
            })
            fireEvent.input((screen.getByRole('textbox', { name: 'Prazo (em meses)' })), {
                target: { value: 10 }
            })
            fireEvent.input((screen.getByRole('textbox', { name: 'Aporte Mensal' })), {
                target: { value: 10 }
            })
            fireEvent.input((screen.getByRole('textbox', { name: 'Rentabilidade' })), {
                target: { value: 10 }
            })

            fireEvent.submit(screen.getByRole('button', { name: 'Simular' }))
        })
        expect(screen.getByRole('button', { name: 'Simular' })).toBeDisabled()
    })

    it('resets input', async () => {
        render(
            <Simulator getSimulationResults={getSimulationResultsMock} />
        )

        const input = screen.getByRole('textbox', { name: 'Aporte Inicial' }) as HTMLInputElement
        
        act(() => {
            fireEvent.input((input), {
                target: { value: 'teste' }
            })
            fireEvent.click(screen.getByRole('button', { name: 'Limpar campos' }))
        })

        expect(input.value).toBe('')
    })
})