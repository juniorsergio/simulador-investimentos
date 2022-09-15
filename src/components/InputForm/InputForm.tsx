import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import { Container } from "./styles";

interface InputFormProps {
    title: string,
    name: string,
    register: UseFormRegister<FieldValues>,
    errorMessage?: string
}

export function InputForm({ title, name, register, errorMessage }: InputFormProps){
    return (
        <Container>
            <span className={errorMessage ? 'error' : ''}>{title}</span>
            <input aria-label={title} {...register(name)} />
            {errorMessage && <span className="error">{String(errorMessage)}</span>}
        </Container>
    )
}