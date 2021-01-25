import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'

export const BaseTag = styled.span(({ theme }) => `
  margin: 0;
  padding: ${ theme.spacing.extraSmall } ${ theme.spacing.small };
  border-radius: ${ theme.border.radius };
  border: 1px solid ${ theme.color.grey };
  text-decoration: none !important;
  background-color: ${ theme.color.lightgrey };
  color: ${ theme.color.darkgrey };
  font-size: 75%;
  line-height: ${ theme.spacing.medium };
  filter: brightness(1.1);
  transition: filter 250ms;
  &:hover {
    filter: brightness(1.05);
  }
`)

export const Label = styled(BaseTag)(({ theme }) => `
  padding: ${ theme.spacing.small } ${ theme.spacing.extraSmall };
  border: 1px solid ${ theme.color.grey };
  background-color: ${ theme.color.white };
  line-height: ${ theme.spacing.extraSmall };
  text-transform: uppercase;
`)

//

export const Tag = ({ link, ...props }) => {
  if (link) {
    return <BaseTag as={ Link } { ...props }/>
  }
  return <BaseTag { ...props } />
}

Tag.propTypes = {
  link: PropTypes.bool.isRequired,
}

Tag.defaultProps = {
  link: false,
}

//

// simple flexible tray for tags
export const Tags = styled.div(({ theme }) => `
  display: flex;
  gap: ${ theme.spacing.small };
`)
