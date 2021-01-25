import React, { Fragment } from 'react'
import { useTheme } from 'styled-components'
import { graphql, Link } from 'gatsby'
import { Container, Hero, HorizontalRule, Section } from '../components/layout'
import { Meta, Title } from '../components/typography'
import { Visible } from 'react-grid-system'
import { Icon } from '../components/icon'
import { Tag, Tags, Label } from '../components/news/tag'
import { NewsDate } from '../components/news/news-date'

export default ({ data, pageContext }) => {
  const theme = useTheme()
  const { article: {
    frontmatter: {
      title, publishDate, author, featuredImage,
      people, groups, projects, teams, collaborations, organizations,
    },
    fields,
    html: articleHTML
  }} = data
  const { prevArticle, nextArticle } = pageContext
  // collect all related objects
  const tags = groups.concat(collaborations).concat(projects).concat(teams).concat(people)
    // turn into shape { id, name, path }
    .map(item => {
      if (item.__typename == 'PeopleYaml') {
        return ({ id: item.id, name: item.fullName, path: item.fields.path })
      }
      return ({ id: item.id, name: item.name, path: item.fields.path })
    })
    // alphabetize
    .sort((t, u) => t.name < u.name ? -1 : 1)

  return (
    <Fragment>
      { featuredImage && <Hero backgroundImage={ featuredImage && featuredImage.childImageSharp.fullSize }></Hero> }

      <Container>
        <Section title=" ">
          <NewsDate>{ publishDate }</NewsDate>

          <Label style={{ float: 'right' }}>{ fields.newsType }</Label>

          <Title>{ title }</Title>

          <Meta>Published on { publishDate } by&nbsp;
            { author ? <Link to={ `/people/${ author.id }` }>{ author.fullName }</Link> : 'Unknown'}
          </Meta>

          <Tags>
            { tags.map(tag => <Tag link to={ tag.path }>{ tag.name }</Tag>) }
          </Tags>

          <div style={{ padding: '1rem 0 0 0' }} dangerouslySetInnerHTML={{ __html: articleHTML }} />
        </Section>

        <HorizontalRule />

        <div style={{ display: 'flex', padding: '1rem 0' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            {
              prevArticle && (
                <Fragment>
                  <Link to={ prevArticle.path } style={{ display: 'inline-flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Icon icon="arrow-left" size={ 16 } fill={ theme.color.darkgrey } />
                    PREVIOUS <Visible md lg xl>ARTICLE</Visible><br/>
                  </Link>
                  <Meta style={{ paddingLeft: '1rem' }}>{ prevArticle.frontmatter.title }</Meta>
                </Fragment>
              )
            }
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
            {
              nextArticle && (
                <Fragment>
                  <Link to={ nextArticle.path } style={{ display: 'inline-flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    NEXT <Visible md lg xl>ARTICLE</Visible>
                    <Icon icon="arrow-right" size={ 16 } fill={ theme.color.darkgrey } />
                  </Link>
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
        featuredImage {
          childImageSharp {
            fullSize: fluid {
              ...GatsbyImageSharpFluid
            }
            previewSize: fixed(width: 300, height: 300) {
              ...GatsbyImageSharpFixed
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
      }
      fields {
        path
        newsType
      }
      html
    }
  }
`