import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { useScrollPosition } from '../../hooks'

const Content = styled.div(({ theme }) => `
  color: ${ theme.color.white };
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: ${ theme.spacing.large };
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: transparent;
  & a {
    color: ${ theme.color.white };
    text-decoration-color: ${ theme.color.white };
  }
`)

const Overlay = styled.div(({ theme, color }) => `
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${ color };
  opacity: 0.25;
`)

const Wrapper = styled.div(({ theme, backgroundColor }) => `
  position: relative;
  min-height: 500px;
  overflow: hidden;
  // width: 1400px;
  // margin: auto;
  background-color: ${ backgroundColor };
`)

export const Hero = ({ backgroundImage, backgroundColor, overlayColor, children }) => {
  const { scrollPosition } = useScrollPosition()

  return (
    <Wrapper backgroundColor={ backgroundColor }>
      {
        backgroundImage && (
          <Img
            fluid={ backgroundImage }
            style={{ height: '500px' }}
            imgStyle={{ transform: `translateY(${ scrollPosition / 2 }px)` }}
          />
        )
      }
      <Overlay color={ overlayColor } />
      <Content>
        { children }
      </Content>
    </Wrapper>
  )
}

Hero.propTypes = {
  backgroundImage: PropTypes.object,
  backgroundColor: PropTypes.string,
  overlayColor: PropTypes.string.isRequired,
  children: PropTypes.node,
}

Hero.defaultProps = {
  backgroundColor: '#eee',
  overlayColor: '#fff',
}
