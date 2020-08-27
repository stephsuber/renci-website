import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Wrapper = styled(Link)(({ theme }) => `
    margin: 0 0.25rem;
    padding: ${ theme.spacing.extraSmall } ${ theme.spacing.small };
    border-radius: ${ theme.border.radius };
    text-decoration: none !important;
    transition: background-color 250ms;
    background-color: ${ theme.color.lightgrey };
    &:hover {
        background-color: ${ theme.color.grey };
    }
`)

export const TagLink = ({ children, ...props }) => (
    <Wrapper { ...props }>
        { children }
    </Wrapper>
)
