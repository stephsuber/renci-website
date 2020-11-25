import React from 'react'
import styled from 'styled-components'

export const Wrapper = styled.ul(({ theme, bullets }) => `
  padding: 0;
  margin: ${ theme.spacing.extraSmall } 0;
  list-style-type: ${ bullets };
`)

const ListItem = styled.li(({ theme }) => `
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
