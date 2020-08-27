import styled from 'styled-components'

export const TextInput = styled.input(({ theme }) => `
    flex: 1;
    padding: 0.5rem;
    outline: none;
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: ${ theme.color.grey };
    transition: border-color 250ms;
    padding: 0 2rem 0 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    &::placeholder {
        color: ${ theme.color.darkgrey };
        transition: opacity 250ms;
        opacity: 1.0;
    }
    &:focus::placeholder {
        opacity: 0.25;
    }
    &:focus, &:hover {
        border-color: ${ theme.color.black };
    }
`)
