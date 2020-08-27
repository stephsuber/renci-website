import styled from 'styled-components'

export const Button = styled.button(({ theme }) => `
    background-color: ${ theme.color.white };
    border-radius: 4px;
    display: inline-block;
    border-width: 1px;
    border-style: solid;
    border-color: ${ theme.color.darkgrey };
    color: ${ theme.color.darkgrey };
    padding: ${ theme.spacing.extraSmall } ${ theme.spacing.medium };
    text-decoration: none !important;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 250ms;
    opacity: 1.0;
    &:hover, &:focus {
        background-color: ${ theme.color.lightgrey };
        color: ${ theme.color.black };
    }
    &:disabled {
        opacity: 0.33;
        cursor: default;
    }
`)
