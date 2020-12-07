import React from 'react'
import styled from 'styled-components'

export const Wrapper = styled.ul(({ theme, bullets, inline }) => `
  padding: ${ bullets === 'none' ? 0 : '0 0 0 1rem' };
  margin: ${ theme.spacing.small } 0;
  list-style-type: ${ bullets };
  & li {
    display: inline;
    margin-right: ${ theme.spacing.small };
  }
`)

const ListItem = styled.li(({ theme }) => `
  padding: 0;
  margin: 0;
  margin-bottom: ${ theme.spacing.small };
`)

export const List = ({ items, bullets = 'none', inline = false, ...props }) => {
  return (
    <Wrapper bullets={ bullets } inline={ inline }>
      { items.map(item => <ListItem key={ item.key }>{ item }</ListItem>) }
    </Wrapper>
  )
}
