import { useState } from "react";
import { Results } from "./components/Results/Results";
import { Simulator } from "./components/Simulator/Simulator";
import { Container, Main, GlobalStyle } from "./styles/global";

export interface Simulation {
	tipoIndexacao: string,
	tipoRendimento: string,
	valorFinalBruto: number,
	aliquotaIR: number,
	valorPagoIR: number,
	valorTotalInvestido: number,
	valorFinalLiquido: number,
	ganhoLiquido: number,
	graficoValores: {
		comAporte: {
			[name: string]: number
		},
		semAporte: {
			[name: string]: number
		}
	}
}

export function App() {
	const [ isResultsAvailable, setIsResultsAvailable ] = useState(false)
	const [ simulation, setSimulation ] = useState({} as Simulation)

	async function getSimulationResults(indexType: string, income: string){
        const data = await fetch(`http://localhost:3000/simulacoes/?tipoIndexacao=${indexType}&tipoRendimento=${income}`)

		if (data.status === 200){
			const results = await data.json()
			setSimulation(results[0])
			setIsResultsAvailable(true)
		}
		else {
			setIsResultsAvailable(false)
		}
	}

	return (
		<Container>
			<h1>Simulador de Investimentos</h1>

			<Main>
				<Simulator getSimulationResults={getSimulationResults} />
				<Results simulation={simulation} visibility={isResultsAvailable ? 'visible' : 'hidden'} />
			</Main>

    		<GlobalStyle />
		</Container>
	)
}