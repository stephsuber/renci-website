import styled from 'styled-components'

export const HorizontalRule = styled.hr(({ theme }) => `
    border: 0;
    height: 2px;
    margin: 1rem auto;
    width: 100%;
    background: ${ theme.color.lightgrey };
`)
