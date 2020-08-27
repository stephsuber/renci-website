import styled from 'styled-components'

export const Card = styled.div(({ theme }) => `
    border-radius: ${ theme.border.radius };
    margin-bottom: 2rem;
    background-color: ${ theme.color.white };
    border: 1px solid ${ theme.color.grey };
`)

export const CardHeader = styled.header(({ theme }) => `
    padding: 0.5rem 1rem;
    display: flex;
    border-bottom: 1px solid ${ theme.color.grey };
    display: flex;
    align-items: center;
`)

export const CardBody = styled.main`
    padding: 1rem;
`

export const CardFooter = styled.footer`
    border-top: 1px solid #eee;
    padding: 1rem;
`

