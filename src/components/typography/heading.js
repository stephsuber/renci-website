import styled from 'styled-components'

export const Heading = styled.h2(({ theme, center }) => `
  text-align: ${ center ? 'center' : 'left' };
  font-size: 1.5rem;
  color: ${ theme.color.darkgrey };
  line-height: 1.5;
  font-weight: normal;
  padding: 0.25rem 0;
  margin: 0 0 ${ theme.spacing.small } 0;
`)

export const Subheading = styled.h3(({ theme, center }) => `
  line-height: 1.5;
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  padding: 0.25rem 0;
  margin: 0 0 1rem 0;
  text-align: ${ center ? 'center' : 'left' };
  display: flex;
  align-items: center;
  font-weight: normal;
`)
