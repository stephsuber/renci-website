import React, { Fragment } from 'react'
import { useTheme } from 'styled-components'
import { graphql, Link } from 'gatsby'
import { Container, Hero, HorizontalRule } from '../components/layout'
import { Meta, Title } from '../components/typography'
import { Visible } from 'react-grid-system'
import { Icon } from '../components/icon'
import { TagLink } from '../components/link'

export default ({ data, pageContext }) => {
  const theme = useTheme()
  const { article: {
    frontmatter: {
      title, publish_date, author, featuredImage,
      people, groups, projects, teams, collaborations,
    },
    html: articleHTML
  }} = data
  const { limit, skip, pageCount, currentPage } = pageContext

  return (
    <Container>
      <Title>News at RENCI</Title>
      <hr />

    </Container>
  )
}

export const newsQuery = graphql`
  query articlesListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___publish_date,], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            path
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`