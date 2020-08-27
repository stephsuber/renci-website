import styled from 'styled-components'

export const Heading = styled.h2(({ theme }) => `
    text-align: ${ ({ center }) => center ? 'center' : 'left' };
    font-size: 1.75rem;
    @media (min-width: 600px) {
        font-size: 4.5vw;
    }
    @media (min-width: 992px) {
        font-size: 2.0rem;
    }
    color: ${ theme.color.darkgrey };
    padding: 0.25rem 0;
    margin: 0;
`)

export const Subheading = styled.h4`
    font-size: 175%;
    padding: 0.25rem 0;
    margin: 0;
    text-align: ${ ({ center }) => center ? 'center' : 'left' };
    display: flex;
    align-items: center;
`

