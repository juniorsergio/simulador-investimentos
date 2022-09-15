import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root {
        --grey-light: #EFEFEF;
        --grey-dark: #969696;
        --orange: #ED8E53;
        --red: #EF5050;
        --green: #43A233;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: var(--grey-light);
    }
`

export const Container = styled.div`
    height: 100vh;
    width: 90vw;
    
    margin: auto;
    padding: 50px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    @media (max-width: 940px) {
        height: auto;
        width: 90vw;
        padding: 50px 0;
        gap: 50px;
    }

    h1 {
        text-align: center;
    }
`

export const Main = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;

    gap: 50px;

    @media (max-width: 940px) {
        flex-direction: column;
        width: 100%;
    }
`