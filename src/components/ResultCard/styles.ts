import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    width: 30%;
    gap: 30px;
    padding: 5px 0;
    margin: 10px 0;

    background-color: white;
    border: 1px solid var(--grey-dark);

    .liquido {
        color: var(--green);
    }
`