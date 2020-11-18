import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

const Wrapper = styled.article(({ theme }) => `
  padding: 0 0 ${ theme.spacing.medium } 0;
  &:not(:first-child) {
    padding: ${ theme.spacing.large } 0;
    border-top: 2px solid ${ theme.color.lightgrey };
  }
`)

const Header = styled.h3`
  font-weight: bold;
  // text-transform: uppercase;
  margin: 0;
  line-height: 1.25;
`

const Body = styled.div``

export const Article = ({ title, titleLink, children }) => {
  return (
    <Wrapper>
      {
        titleLink
        ? <Header><Link to={ titleLink }>{title}</Link></Header>
        : <Header>{title}</Header>
      }
      <Body>
        {children}
      </Body>
    </Wrapper>
  )
}


Article.propTypes = {
  title: PropTypes.string,
  titleLink: PropTypes.string,
  children: PropTypes.node,
}
