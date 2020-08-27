import styled from 'styled-components'
import { Link } from 'gatsby'

export const TextLink = styled(Link)(({ theme }) => `
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
    text-decoration: underline;
    text-decoration-color: ${ theme.color.primary.light };
    text-underline-offset: 0.2rem;
    color: ${ theme.color.primary.main };
    position: relative;
`)
