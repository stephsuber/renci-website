import styled from 'styled-components'
import { Paragraph } from './paragraph'

export const Meta = styled(Paragraph)(({ theme }) => `
    // border: 1px solid #f99;
    font-size: 90%;
    font-style: italic;
    margin-bottom: ${ theme.spacing.small };
`)
