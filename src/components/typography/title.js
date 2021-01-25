import PropTypes from 'prop-types'
import styled from 'styled-components'

export const Title = styled.h1(({ theme, center }) => `
  text-align: ${ center ? 'center' : 'left' };
  font-size: clamp(1.5rem, 5vw, 3rem);
  font-weight: 400;
  padding: 0.25rem 0.5rem;
  padding: 0;
  margin: ${ theme.spacing.medium } 0;
`)

export const Subtitle = styled.h2(({ theme, center }) => `
  font-size: clamp(1.25rem, 4vw, 1.5rem);
  padding: 0;
  margin: 0;
  font-weight: normal;
  // font-style: italic;
  text-align: ${ center ? 'center' : 'left' };
`)

//

const propTypes = {
  children: PropTypes.node.isRequired,
  center: PropTypes.bool.isRequired,
}

const defaultProps = {
  center: false,
}


Title.propTypes = propTypes
Title.defaultProps = defaultProps
Subtitle.propTypes = propTypes
Subtitle.defaultProps = defaultProps
