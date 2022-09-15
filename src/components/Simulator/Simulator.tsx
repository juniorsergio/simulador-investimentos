import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
    Container,
    InputsContainer, 
    Fields,
    ButtonsContainer,
    List
} from "./styles";
import { InputForm } from "../InputForm/InputForm";

const schema = Yup.object().shape({
    initialTransfer: Yup.number().required().typeError('Aporte deve ser um número'),
    timeInMonths: Yup.number().required().typeError('Prazo deve ser um número'),
    monthlyTransfer: Yup.number().required().typeError('Aporte deve ser um número'),
    investimentReturn: Yup.number().required().typeError('Rentabilidade deve ser um número')
})

const incomeOptions = {
    'bruto': 'Bruto',
    'liquido': 'Líquido'
}

const indexTypeOptions = {
    'pre': 'PRÉ',
    'pos': 'PÓS',
    'ipca': 'IPCA'
}

interface SimulatorProps {
    getSimulationResults: (indexType: string, income: string) => void
}

export function Simulator({ getSimulationResults }: SimulatorProps){
    const [ income, setIncome ] = useState('bruto')
    const [ indexType, setIndexType ] = useState('pos')
    const [ cdi, setCdi ] = useState(0)
    const [ ipca, setIpca ] = useState(0)

    const {
        register,
        handleSubmit,
        reset,
        formState: { isValid, errors }
    } = useForm({ resolver: yupResolver(schema), mode: "onChange" })

    function handleSimulation(){
        getIndicators()
        getSimulationResults(indexType, income)
        reset()
    }

    async function getIndicators(){
        const data = await fetch('http://localhost:3000/indicadores')

        if (data.status !== 200){
            return
        }

        const indicators = await data.json()
        setCdi(indicators[0].valor)
        setIpca(indicators[1].valor)
    }

    useEffect(() => {
        getIndicators()
    }, [])

    return (
        <Container onSubmit={handleSubmit(handleSimulation)}>
            <h2>Simulador</h2>

            <InputsContainer>
                <Fields>
                    <span>
                        Rendimento
                        <img src="info-icon.svg" alt="Ícone de informações" />
                        <div className="info">
                            O rendimento bruto de um investimento é o resultado de uma aplicação financeira sem nenhum tipo de desconto, nem de taxas, nem de impostos. Já o rendimento líquido é esse mesmo resultado, descontando taxas ou impostos.
                        </div>
                    </span>

                    <List>
                        {Object.entries(incomeOptions).map(([key, value]) => (
                            <li
                                key={key}
                                aria-label={key}
                                className={income === key ? 'active' : ''}
                                onClick={() => setIncome(key)}
                            >
                                {value}
                            </li>
                        ))}
                    </List>
                    
                    <InputForm
                        title='Aporte Inicial'
                        name='initialTransfer'
                        register={register}
                        errorMessage={errors.initialTransfer && String(errors.initialTransfer.message)}
                    />
                    
                    <InputForm
                        title='Prazo (em meses)'
                        name='timeInMonths'
                        register={register}
                        errorMessage={errors.timeInMonths && String(errors.timeInMonths.message)}
                    />

                    <span>IPCA (ao ano)</span>
                    <input aria-label="ipca" value={`${ipca}%`} readOnly />
                </Fields>

                <Fields>                
                    <span>
                        Tipos de indexação
                        <img src="info-icon.svg" alt="Ícone de informações" />
                        <div className="info">
                            <p>Investimentos prefixados têm rentabilidade fixa, enquanto os pós-fixados seguem algum indicador financeiro, como o IPCA (inflação) ou o CDI.</p>
                            <br />
                            <p>Ou seja, nos títulos prefixados o investidor sabe exatamente quanto o dinheiro vai render, desde que respeite o prazo acordado. Já nos pós-fixados, a rentabilidade exata só será descoberta no momento do resgate do título.</p>
                        </div>
                    </span>

                    <List>
                        {Object.entries(indexTypeOptions).map(([key, value]) => (
                            <li
                                key={key}
                                aria-label={key}
                                className={indexType === key ? 'active' : ''}
                                onClick={() => setIndexType(key)}
                            >
                                {value}
                            </li>
                        ))}
                    </List>
                    
                    <InputForm
                        title='Aporte Mensal'
                        name='monthlyTransfer'
                        register={register}
                        errorMessage={errors.monthlyTransfer && String(errors.monthlyTransfer.message)}
                    />
                    
                    <InputForm
                        title='Rentabilidade'
                        name='investimentReturn'
                        register={register}
                        errorMessage={errors.investimentReturn && String(errors.investimentReturn.message)}
                    />

                    <span>CDI (ao ano)</span>
                    <input aria-label='cdi' value={`${cdi}%`} readOnly />
                </Fields>
            </InputsContainer>

            <ButtonsContainer>
                <button className="reset-form" type="reset" onClick={() => reset({keepErros: false})}>Limpar campos</button>
                <button className="submit-form" type="submit" disabled={!isValid}>Simular</button>
            </ButtonsContainer>
        </Container>
    )
}