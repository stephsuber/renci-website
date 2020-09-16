import styled from 'styled-components'

export const Heading = styled.h2(({ theme }) => `
    text-align: ${ ({ center }) => center ? 'center' : 'left' };
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    color: ${ theme.color.darkgrey };
    line-height: 1.5;
    font-weight: 400;
`)

export const Subheading = styled.h3`
    font-size: clamp(1.1rem, 2vw, 1.25rem);
    padding: 0.25rem 0;
    margin: 0;
    text-align: ${ ({ center }) => center ? 'center' : 'left' };
    display: flex;
    align-items: center;
    font-weight: 500;
`

