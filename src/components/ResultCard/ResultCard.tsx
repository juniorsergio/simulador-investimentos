import { Container } from "./styles";

interface ResultCardProps {
    title: string,
    value: string,
    valueClass?: string
}

export function ResultCard({ title, value, valueClass='' }: ResultCardProps){
    return (
        <Container>
            <strong>{title}</strong>
            <span className={valueClass}>{value}</span>
        </Container>
    )
}