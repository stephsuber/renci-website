import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { Icon } from '../icons'

const Wrapper = styled(Link)(({ theme, float }) => `
    display: inline-flex;
    align-items: center;
    float: ${ float ? float : 'none' };
    & .arrow-right {
        fill: ${ theme.color.darkgrey };
        margin-left: 0.1rem;
        transition: transform 100ms, opacity 250ms;
        transform: translateX(0rem);
        opacity: 0.5;
    }
    &:hover, &:focus {
        transition: transform 250ms, opacity 100ms;
        & .arrow-right {
            transform: translateX(0.1rem);
            opacity: 1.0;
        }
    }
`)

export const ArrowLink = ({ text, ...props }) => (
    <Wrapper { ...props }>
        { text } <Icon icon="arrow-right" className="arrow-right" size={ 14 } />
    </Wrapper>
)
