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
  & .content {
    // padding: ${ theme.spacing.medium } 0;
  }
`)

export const Article = ({ title, titleLink, children }) => {
  return (
    <Wrapper>
      { title && titleLink && <Subheading><Link to={ titleLink }>{title}</Link></Subheading> }
      { title && !titleLink && <Subheading>{title}</Subheading> }
      <div className="content">
        { children }
      </div>
    </Wrapper>
  )
}


Article.propTypes = {
  title: PropTypes.string,
  titleLink: PropTypes.string,
  children: PropTypes.node,
}
