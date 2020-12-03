import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Container } from '../layout'

const reveal = keyframes`
    0% { display: none; opacity: 0.0; }
    1% { display: block; opacity: 0.0; }
    100% { display: block; opacity: 1.0; }
`

const Wrapper = styled.nav(({ theme }) => css`
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    width: 100%;
    border-width: 1px 0;
    border-style: solid;
    border-color: ${ theme.color.lightgrey };
    padding: ${ theme.spacing.small } ${ theme.spacing.large };
    background-color: ${ theme.color.whitish };
    pointer-events: auto;
    transform-origin: top center;
    animation: 250ms ${ reveal };
    &::before {
        // border: 1px solid red;
        content: "";
        background-color: transparent;
        width: 100%;
        height: 1.5rem;
        position: absolute;
        left: 0;
        bottom: 100%;
    }
`)

export const Tray = ({ children, ...props }) => {
    return (
        <Wrapper { ...props }>
            <Container>
                { children }
            </Container>
        </Wrapper>
    )
}