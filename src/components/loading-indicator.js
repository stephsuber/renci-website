import React from 'react'
import PropTypes from 'prop-types'
import styled, { css, keyframes, useTheme } from 'styled-components'

const fadeIn = keyframes`
  0% { filter: opacity(0); }
  100% { filter: opacity(1); }
`

const AnimatedSvg = styled.svg`
  animation: ${ fadeIn } 500ms linear 1;
`

//

const flash = keyframes`
  0% { filter: opacity(0); }
  20% { filter: opacity(1); }
  100% { filter: opacity(0); }
`

const StyledRect = styled.rect(({ theme, duration, delay }) => css`
  animation: ${ flash } ${ duration } ease-out infinite;
  animation-delay: ${ delay };
  opacity: 0.5;
`)

//

 export const LoadingIndicator = ({ n, duration, width, height, gap }) => {
  const theme = useTheme()

  return (
    <AnimatedSvg
      version="1.1" xmlns="http://www.w3.org/2000/svg"
      fill={ theme.color.renciBlue }
      x="0px" y="0px"
      width={ `${ n * (width  + gap)}px` }
      height={ `${ n * (height  + gap)}px` }
      viewBox={ `0 0 ${ n * (width + gap) } ${ n * (height + gap) }` }
      n={ n }
    >
      {
        [...Array(n).keys()].map(row => {
          return [...Array(n).keys()].map(column => {
            return (
              <StyledRect
                x={ 0 } y={ 0 } rx={ 2 }
                width={ width } height={ height }
                transform={ `translate(${ column * (width + gap) }, ${ row * (height + gap) })` } duration={ `${ duration }ms` } delay={ `${ ( duration / (2 * n) ) * (row + column) }ms` }
              />
            )
          })
        })
      }
    </AnimatedSvg>
  )
}

LoadingIndicator.propTypes = {
  n: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  gap: PropTypes.number.isRequired,
}

LoadingIndicator.defaultProps = {
  n: 3,
  duration: 333,
  width: 20,
  height: 20,
  gap: 4,
}
