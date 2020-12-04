import React from 'react'
import styled from 'styled-components'

export const Wrapper = styled.ul(({ theme, bullets }) => `
  padding: ${ bullets === 'none' ? 0 : '0 0 0 1rem' };
  margin: ${ theme.spacing.small } 0;
  list-style-type: ${ bullets };
`)

const ListItem = styled.li(({ theme }) => `
  padding: 0;
  margin: 0;
  margin-bottom: ${ theme.spacing.small };
`)

export const List = ({ items, bullets = 'none' }) => {
  return (
    <Wrapper bullets={ bullets }>
      { items.map(item => <ListItem key={ item.key }>{ item }</ListItem>) }
    </Wrapper>
  )
}
