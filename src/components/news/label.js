import React, { Fragment } from 'react'
import styled from 'styled-components'
import { BaseTag } from './tag'

export const Label = styled(BaseTag)(({ theme }) => `
  padding: ${ theme.spacing.small } ${ theme.spacing.extraSmall };
  border: 0;
  background-color: ${ theme.color.renciBlue };
  color: ${ theme.color.white };
  line-height: ${ theme.spacing.extraSmall };
  text-transform: uppercase;
  font-size: 65%;
  font-weight: bold;
  letter-spacing: 1px;
  filter: brightness(1.0);
  cursor: default;
  &.news { background-color: ${ theme.color.renciBlue } }
  &.blog { background-color: ${ theme.color.extended.contessa } }
  &:hover {
    filter: brightness(1.2);
  }
`)
