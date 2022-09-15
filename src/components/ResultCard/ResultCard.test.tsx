import { render, screen } from '@testing-library/react'
import { ResultCard } from './ResultCard'

describe('ResultCard component', () => {
    it('renders correctly', () => {
        render(
            <ResultCard title='Valor final' value='R$ 0' />
        )

        expect(screen.getByText('Valor final')).toBeInTheDocument()
    })
})