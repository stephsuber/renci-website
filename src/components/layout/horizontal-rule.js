import styled from 'styled-components'

export const HorizontalRule = styled.hr(({ theme }) => `
  border: 0;
  height: 1px;
  margin: ${ theme.spacing.medium } auto;
  width: 100%;
  background: ${ theme.color.lightgrey };
`)
