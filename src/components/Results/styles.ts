import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: 940px) {
        height: auto;

        &:not([style*="visibility: visible"]) {
            display: none;
        }
    }
`

export const Cards = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`