import React, { Fragment } from 'react'
import styled from 'styled-components'

export const Wrapper = styled.ul(({ theme, bullets, inline }) => `
  padding: ${ bullets === 'none' ? 0 : '0 0 0 1rem' };
  margin: ${ theme.spacing.small } 0;
  list-style-type: ${ bullets };
  & li {
    display: ${ inline === true ? 'inline' : 'block' };
    margin-right: ${ inline ? 0 : theme.spacing.small };
  }
`)

const ListItem = styled.li(({ theme }) => `
  padding: 0;
  margin: 0;
  margin-bottom: ${ theme.spacing.extraSmall };
`)

export const List = ({ items, bullets = 'none', inline = false, ...props }) => {
  return (
    <Wrapper bullets={ bullets } inline={ inline }>
      {
        items.map((item, i) => (
          <Fragment>
            <ListItem key={ item.key }>{ item }</ListItem>
            { inline && i + 1 < items.length && ', ' }
          </Fragment>
        ))
      }
    </Wrapper>
  )
}
