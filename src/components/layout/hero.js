import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { useScrollPosition } from '../../hooks'
import { Container } from './container'

const Content = styled.div(({ theme }) => `
  color: ${ theme.color.white };
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: ${ theme.spacing.large };
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 100%;
  max-width: 1200px;
  background-color: #000000cc;
  letter-spacing: 1px;
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
  opacity: 0.1;
`)

const Wrapper = styled.div(({ theme, backgroundColor }) => `
  position: relative;
  min-height: 500px;
  overflow: hidden;
  background-color: ${ backgroundColor };
  background-image: linear-gradient(30deg, ${ theme.color.black } 12%, transparent 12%, transparent 87%, ${ theme.color.black } 87%, ${ theme.color.black }),
  linear-gradient(150deg, ${ theme.color.black } 12%, transparent 12%, transparent 87%, ${ theme.color.black } 87%, ${ theme.color.black }),
  linear-gradient(30deg, ${ theme.color.black } 12%, transparent 12%, transparent 87%, ${ theme.color.black } 87%, ${ theme.color.black }),
  linear-gradient(150deg, ${ theme.color.black } 12%, transparent 12%, transparent 87%, ${ theme.color.black } 87%, ${ theme.color.black }),
  linear-gradient(60deg, ${ theme.color.darkgrey } 25%, transparent 25.5%, transparent 75%, ${ theme.color.darkgrey } 75%, ${ theme.color.darkgrey }), 
  linear-gradient(60deg, ${ theme.color.darkgrey } 25%, transparent 25.5%, transparent 75%, ${ theme.color.darkgrey } 75%, ${ theme.color.darkgrey });
  background-size:40px 70px;
  background-position: 0 0, 0 0, 20px 35px, 20px 35px, 0 0, 20px 35px;
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
      {
        children && (
          <Content>
            <Container>
              { children }
            </Container>
          </Content>
        )
      }
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
  backgroundColor: '#000',
  overlayColor: '#000',
}
