import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Subheading } from '../typography'
import { Link } from 'gatsby'

const Wrapper = styled.article(({ theme }) => `
  padding: 0 0 ${ theme.spacing.medium } 0;
  &:not(:first-child) {
    padding: ${ theme.spacing.large } 0;
    border-top: 2px solid ${ theme.color.lightgrey };
  }
`)

const Header = styled(Subheading)`
  margin: 0;
  padding: 0;
  font-weight: normal;
`

const Body = styled.div``

export const Article = ({ title, titleLink, children }) => {
  return (
    <Wrapper>
      { title && titleLink && <Header><Link to={ titleLink }>{title}</Link></Header> }
      { title && !titleLink && <Header>{title}</Header> }
      <Body>
        { children }
      </Body>
    </Wrapper>
  )
}


Article.propTypes = {
  title: PropTypes.string,
  titleLink: PropTypes.string,
  children: PropTypes.node,
}
