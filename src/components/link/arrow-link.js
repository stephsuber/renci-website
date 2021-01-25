import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { Icon } from '../icon'

const Wrapper = styled.span(({ theme, float }) => `
  float: ${ float ? float : 'none' };
  & .icon {
    fill: ${ theme.color.darkgrey };
    transition: transform 100ms, opacity 250ms;
    transform: translateX(0rem) scale(0.9) translate(0.2rem);
    transform-origin: 0% 50%;
    opacity: 0.25;
  }
  &:hover, &:focus {
    transition: transform 250ms, opacity 100ms;
    & .icon {
      transform: translateX(0.1rem) scale(1.0) translate(0.3rem);
      opacity: 1.0;
    }
  }
`)

export const ArrowLink = ({ text, ...props }) => (
  <Wrapper>
    <Link { ...props }>
      { text }
    </Link>
    <Icon icon="arrow-right" className="icon" size={ 14 } />
  </Wrapper>
)
