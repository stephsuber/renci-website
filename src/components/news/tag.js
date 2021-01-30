import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'

export const BaseTag = styled.span(({ theme }) => `
  margin: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${ theme.spacing.extraSmall } ${ theme.spacing.small };
  border-radius: ${ theme.border.radius };
  border: 1px solid ${ theme.color.grey };
  text-decoration: none !important;
  background-color: ${ theme.color.lightgrey };
  color: ${ theme.color.darkgrey };
  font-size: 80%;
  line-height: ${ theme.spacing.medium };
  filter: brightness(1.1);
  transition: filter 250ms;
  white-space: nowrap;
  &:hover {
    filter: brightness(1.05);
  }
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
  flex-wrap: wrap;
  gap: ${ theme.spacing.small };
`)
