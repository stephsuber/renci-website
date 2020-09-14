import styled from 'styled-components'

export const Heading = styled.h2(({ theme }) => `
    text-align: ${ ({ center }) => center ? 'center' : 'left' };
    font-size: clamp(1.5rem, 3vw, 1.75rem);
    color: ${ theme.color.darkgrey };
    line-height: 1.5;
`)

export const Subheading = styled.h4`
    font-size: clamp(1.33rem, 2.75vw, 1.5rem);
    padding: 0.25rem 0;
    margin: 0;
    text-align: ${ ({ center }) => center ? 'center' : 'left' };
    display: flex;
    align-items: center;
`

