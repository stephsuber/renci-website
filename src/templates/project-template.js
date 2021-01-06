import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { Container, Article, Section, Hero, HorizontalRule } from '../components/layout'
import { Title } from '../components/typography'
import { SocialTray } from '../components/social-tray'
import { ArticlePreview } from '../components/news'
import { PeopleList } from '../components/people'
import { OrganizationsList } from '../components/organizations'
import { Link } from '../components/link'

export default ({ data, pageContext }) => {
  const { projectsYaml: {
    name,
    description,
    renciRole,
    featuredImage,
    group,
    members,
    partners,
    funding,
    www,
    news,
  }} = data

  const sortedPartners = partners ? [...partners].sort((p, q) => p.name > q.name ? 1 : -1) : null
  const sortedFunders = funding ? [...funding].sort((f, g) => f.name > g.name ? 1 : -1) : null
  const sortedNews = news ? [...news].sort((a, b) => a.frontmatter.publishDate > b.frontmatter.publishDate ? 1 : -1) : null
  
  return (
    <Fragment>
      <Hero backgroundImage={ featuredImage && featuredImage.childImageSharp.fluid }>
        { group && group[0] && <Link to={ group[0].fields.path }>{ group[0].name }</Link> }
        <Title>{ name }</Title>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </Hero>

      <Container>
        <SocialTray url={ www.url } twitter={ www.twitter } github={ www.github } />
        
        <Section title="RENCI's Role">
          <Article>
            <div dangerouslySetInnerHTML={{ __html: renciRole }} />
          </Article>
        </Section>


        {
          sortedNews && (
            <Section title="Recent News">
              {
                sortedNews.slice(-2).map((article, i) => {
                  return (
                    <Fragment key={ article.id }>
                      <ArticlePreview article={ article } path={ article.fields.path } compact />
                      { i < news.length - 1 && <HorizontalRule /> }
                    </Fragment>
                  )
                })
              }
            </Section>
          )
        }

        <Section title="Contributors">
          {
            members && (
              <Article title="RENCI Team">
                <PeopleList members={ members } />
              </Article>
            )
          }
          
          {
            sortedPartners && (
              <Article title="Partners">
                <OrganizationsList contributors={ sortedPartners } />
              </Article>
            )
          }
          
          {
            sortedFunders && (
              <Article title="Funding">
                <OrganizationsList contributors={ sortedFunders } />
              </Article>
            )
          }
        </Section>

      </Container>
    </Fragment>
  )
}

export const projectQuery = graphql`
  query($id: String!) {
    projectsYaml( id: { eq: $id }) {
      name
      email
      description
      renciRole
      featuredImage {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      group {
        id
        name
        fields {
          path
        }
      }
      www {
        url
        twitter
        github
      }
      members {
        id
        fullName
        role
        fields {
          path
        }
        photo {
          childImageSharp {
            fixed(width: 350, height: 350) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
      partners {
        id
        name
        url
      }
      funding {
        id
        name
        url
      }
      news {
        id
        fields {
          path
        }
        frontmatter {
          title
          publishDate(formatString: "MMMM DD, YYYY")
          featuredImage {
            childImageSharp {
              previewSize: fixed(width: 300, height: 300) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
        excerpt(pruneLength: 500)
      }
    }
  }
`