import styled from 'styled-components'

export const Title = styled.h1(({ theme, center }) => `
    text-align: ${ center ? 'center' : 'left' };
    font-size: clamp(2rem, 5vw, 3rem);
    color: ${ theme.color.darkgrey };
    font-weight: 400;
    padding: 0.25rem 0.5rem;
    padding: 0;
    margin: ${ theme.spacing.medium } 0;
`)

export const Subtitle = styled.h2`
    font-size: 6vw;
    @media (min-width: 992px) {
        font-size: 2.0rem;
    }
    padding: 0.25rem 0.5rem;
    margin: 0;
    font-weight: normal;
    text-align: ${ ({ center }) => center ? 'center' : 'left' };
`

