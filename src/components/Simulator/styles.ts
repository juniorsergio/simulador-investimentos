import styled from 'styled-components'

export const Container = styled.form`
    display: grid;
    gap: 20px;

    @media (max-width: 940px) {
        width: 100%;
    }
`

export const InputsContainer = styled.div`
    display: flex;
    justify-content: space-between;

    @media (max-width: 940px) {
        flex-direction: column;
        gap: 20px;
    }
`

export const Fields = styled.div`
    display: grid;
    gap: 20px;

    span {
        font-size: 0.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
            width: 20px;
            height: 20px;
        }

        .info {
            display: none;
        }

        .info:hover, img:hover + .info {
            display: block;
            position: fixed;

            max-width: 40%;
            font-size: 1rem;

            padding: 10px;

            border: 2px solid var(--orange);
            border-radius: 10px;
            background: var(--grey-light);
        }
    }

    input {
        background: transparent;
        font-size: 1rem;

        border: 0;
        border-bottom: 1px solid black;

        padding-bottom: 10px;
        outline: 0;
    }
`

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 20px;

    button {
        width: 250px;
        padding: 15px;

        border-radius: 10px;
        border: 1.5px solid black;

        font-size: 1.125rem; // 18px
        font-weight: bold;

        cursor: pointer;
        transition: all 0.2s;
        
        @media (max-width: 940px) {
            width: 50%;
        }

        &.submit-form {       
            background-color: var(--orange);
            border: none;

            &:hover:not(:disabled) {
                filter: brightness(1.2);
            }

            &:disabled {
                background-color: var(--grey-dark);
                cursor: not-allowed;
            }
        }

        &.reset-form:hover {
            border: 1.5px solid var(--orange);
        }
    }
`

export const List = styled.ul`
    display: flex;
    min-width: 80%;
  
    li {
        border: 1.5px solid black;
        
        flex: auto;
        padding: 15px;

        list-style: none;
        text-align: center;
        font-weight: bold;

        cursor: pointer;
        transition: all 0.2s;
    
        &:first-child {
            padding-left: 20px;
            border-bottom-left-radius: 10px;
            border-top-left-radius: 10px;
        }

        &:last-child {
            padding-right: 20px;
            border-bottom-right-radius: 10px;
            border-top-right-radius: 10px;
        }

        &:hover:not(.active) {
            border: 1.5px solid var(--orange);
        }

        &.active {
            background: var(--orange);
            color: white;
            cursor: auto;
        }
    }
`