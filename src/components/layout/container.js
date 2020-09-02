import styled, { keyframes } from 'styled-components'

const unfade = keyframes`
    0% {
        opacity: 0.0;
        // transform: translate3d(0, -1rem, 0);
    }
    100% {
        opacity: 1.0;
        // transform: translate3d(0, 0, 0);
    }
`

export const Container = styled.div`
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem;
    animation: ${ unfade } 500ms ease-out forwards;
`
