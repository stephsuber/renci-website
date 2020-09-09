import React from 'react'
import styled from 'styled-components'

export const Wrapper = styled.ul(({ theme, bullets }) => `
  padding: 0;
  margin: 0;
  margin-bottom: ${ theme.spacing.medium };
  list-style-type: ${ bullets };
`)

export const ListItem = styled.li(({ theme }) => `
  padding: 0;
  margin: 0;
`)

export const List = ({ items, bullets = 'none' }) => {
  return (
    <Wrapper bullets={ bullets }>
      { items.map(item => <ListItem key={ item.key }>{ item }</ListItem>) }
    </Wrapper>
  )
}
