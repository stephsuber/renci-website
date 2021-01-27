import React, { Fragment } from 'react'
import { useTheme } from 'styled-components'
import { graphql, Link } from 'gatsby'
import { Container, Hero, HorizontalRule, Section } from '../components/layout'
import { Meta, Title, Subtitle } from '../components/typography'
import { Visible } from 'react-grid-system'
import { Icon } from '../components/icon'
import { ArrowLink } from '../components/link'
import { Tag, Tags } from '../components/news/tag'
import { Label } from '../components/news/label'
import { NewsDate } from '../components/news/news-date'

export default ({ data, pageContext }) => {
  const theme = useTheme()
  const { article: {
    frontmatter: {
      title, subtitle, publishDate, author, featuredImage, previewImage,
      people, groups, projects, teams, collaborations, organizations, tags
    },
    fields,
    html: articleHTML
  }} = data
  const { prevArticle, nextArticle } = pageContext
  // collect all related objects
  const articleTags = groups.concat(collaborations).concat(projects).concat(teams).concat(people)
    // turn into array of objects with shape { id, name, path }
    .map(item => {
      if (item.__typename == 'PeopleYaml') {
        return ({ id: item.id, name: item.fullName, path: item.fields.path })
      }
      return ({ id: item.id, name: item.name, path: item.fields.path })
    })
    .concat(tags.map((item, i) => ({ id: item.id, name: item.name, path: `/news?tag=${ item.id }` })))
    // alphabetize
    .sort((t, u) => t.name < u.name ? -1 : 1)

  return (
    <Fragment>
      { featuredImage && <Hero backgroundImage={ featuredImage && featuredImage.childImageSharp.fluid } /> }

      <Container>
        <Section>
          <NewsDate>{ publishDate }</NewsDate>

          <Label style={{ float: 'right' }}>{ fields.newsType }</Label>

          <Title>{ title }</Title>

          {
            subtitle && (
              <Fragment>
                <Subtitle>{ subtitle }</Subtitle>
              </Fragment>
            )
          }

          <br />

          <Meta>
            Published on { publishDate } by&nbsp;
            { author ? <Link to={ `/people/${ author.id }` }>{ author.fullName }</Link> : 'Unknown'}
          </Meta>

          <Tags>
            { articleTags.map(tag => <Tag link to={ tag.path } key={ tag.path }>{ tag.name }</Tag>) }
          </Tags>

          <br />
          <HorizontalRule />
          <br />

          <div dangerouslySetInnerHTML={{ __html: articleHTML }} />
        </Section>

        <HorizontalRule />

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '1rem 0' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            {
              prevArticle && (
                <Fragment>
                  <ArrowLink to={ prevArticle.fields.path } text="PREVIOUS ARTICLE" arrowPlacement="left" />
                  <Meta style={{ paddingLeft: '1rem' }}>{ prevArticle.frontmatter.title }</Meta>
                </Fragment>
              )
            }
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
            {
              nextArticle && (
                <Fragment>
                  <ArrowLink to={ nextArticle.fields.path } text="NEXT ARTICLE" arrowPlacement="right" />
                  <Meta style={{ paddingRight: '1rem' }}>{ nextArticle.frontmatter.title }</Meta>
                </Fragment>
              )
            }
          </div>
        </div>
      </Container>
    </Fragment>
  )
}

export const newsQuery = graphql`
  query($slug: String!) {
    article: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        subtitle
        featuredImage {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        previewImage {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        publishDate(formatString: "MMMM D, YYYY")
        author {
          id
          fullName
          fields {
            path
          }
        }
        people {
          id
          __typename
          fullName
          fields {
            path
          }
        }
        groups {
          id
          __typename
          name
          fields {
            path
          }
        }
        projects {
          id
          __typename
          name
          fields {
            path
          }
        }
        teams {
          id
          __typename
          name
          fields {
            path
          }
        }
        collaborations {
          id
          __typename
          name
          fields {
            path
          }
        }
        organizations {
          id
          __typename
          name
          url
        }
        tags {
          id
          name
        }
      }
      fields {
        path
        newsType
      }
      html
    }
  }
`
