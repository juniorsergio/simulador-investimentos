import { CSSProperties } from "react";

import { ResultCard } from "../ResultCard/ResultCard";
import { GraphProjection } from "../GraphProjection/GraphProjection";

import { Container, Cards } from "./styles";
import { Simulation } from "../../App";

interface ResultsProps extends CSSProperties {
    simulation: Simulation
}

export function Results({ simulation, visibility }: ResultsProps){
    function formatCurrency(currency = 0){
        return currency.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
        })
    }

    return (
        <Container style={{visibility: visibility}}>
            <h2>Resultado da Simulação</h2>

            <Cards>         
                <ResultCard title='Valor final Bruto' value={formatCurrency(simulation.valorFinalBruto)} />
                <ResultCard title='Alíquota do IR' value={`${simulation.aliquotaIR}%`} />
                <ResultCard title='Valor Pago em IR' value={formatCurrency(simulation.valorPagoIR)} />
                <ResultCard title='Valor Final Líquido' value={formatCurrency(simulation.valorFinalLiquido)} valueClass="liquido" />
                <ResultCard title='Valor Total Investido' value={formatCurrency(simulation.valorTotalInvestido)} />
                <ResultCard title='Ganho Líquido' value={formatCurrency(simulation.ganhoLiquido)} valueClass="liquido" />
            </Cards>

            {simulation.graficoValores && <GraphProjection values={simulation.graficoValores} />}
        </Container>
    )
}