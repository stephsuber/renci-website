import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { Icon } from '../icon'

const Wrapper = styled.span(({ theme, float }) => `
  float: ${ float ? float : 'none' };
  & .icon {
    fill: ${ theme.color.darkgrey };
    transition: transform 100ms, opacity 250ms;
    transform: translateX(0rem) scale(0.9) translateX(0.1rem);
    transform-origin: 0% 50%;
    opacity: 0.25;
    padding-top: 2px;
  }
  &:hover, &:focus {
    transition: transform 250ms, opacity 100ms;
    & .icon {
      transform: translateX(0.1rem) scale(1.0) translateX(0.2rem);
      opacity: 1.0;
    }
  }
`)

export const ArrowLink = ({ text, float, ...props }) => (
  <Wrapper float={ float }>
    <Link { ...props }>
      { text }
    </Link>
    <Icon icon="arrow-right" className="icon" size={ 14 } />
  </Wrapper>
)
