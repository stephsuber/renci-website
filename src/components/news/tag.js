import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'

export const Tag = styled(Link)(({ theme }) => `
  margin: 0;
  padding: ${ theme.spacing.extraSmall } ${ theme.spacing.small };
  border-radius: ${ theme.border.radius };
  border: 1px solid ${ theme.color.grey };
  text-decoration: none !important;
  transition: background-color 250ms;
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

export const Label = styled(Link)(({ theme }) => `
  margin: 0;
  padding: ${ theme.spacing.extraSmall } ${ theme.spacing.small };
  border: 1px solid ${ theme.color.grey };
  border-radius: ${ theme.border.radius };
  text-decoration: none !important;
  transition: background-color 250ms;
  background-color: ${ theme.color.white };
  color: ${ theme.color.darkgrey };
  font-size: 75%;
  line-height: ${ theme.spacing.medium };
  filter: brightness(1.1);
  transition: filter 250ms;
  &:hover {
    filter: brightness(1.0);
  }
`)

export const Tags = styled.div(({ theme }) => `
  display: flex;
  gap: ${ theme.spacing.small };
`)