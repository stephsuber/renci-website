import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { Container, Article, Section, Hero, HorizontalRule } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { SocialLinks } from '../components/social-links'
import { ArticlePreview } from '../components/news'
import { ContributorsList, MembersList } from '../components/contributors'

export default ({ data, pageContext }) => {
  const { projectsYaml: {
    name,
    description,
    renci_role,
    featuredImage,
    group,
    members,
    partners,
    funding,
    email,
    www,
    news,
  }} = data
  
  return (
    <Fragment>
      <Hero backgroundImage={ featuredImage && featuredImage.childImageSharp.fluid }>
        <strong>{ group && group[0].name }</strong>
        <Title>{ name }</Title>
        <Paragraph dangerouslySetInnerHTML={{ __html: description }} />
      </Hero>

      <Container>
        <SocialLinks url={ www.url } twitter={ www.twitter } github={ www.github } />
        
        {
          news && (
            <Section title="News">
              {
                news.slice(0, 2).map((article, i) => {
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

        <Section title="RENCI's Role">
          <Article>
            <Paragraph dangerouslySetInnerHTML={{ __html: renci_role }} />
          </Article>
        </Section>

        <Section title="Contributors">
          {
            members && (
              <Article title="RENCI Team">
                <MembersList members={ members } />
              </Article>
            )
          }
          
          {
            partners && (
              <Article title="Partners">
                <ContributorsList contributors={ partners.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase()) } />
              </Article>
            )
          }
          
          {
            funding && (
              <Article title="Funding">
                <ContributorsList contributors={ funding.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase()) } />
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
      renci_role
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
      members {
        id
        fullName
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
      funding {
        id
        name
        url
      }
      partners {
        id
        name
        url
      }
      www {
        url
        twitter
        github
      }
      news {
        id
        fields {
          path
        }
        frontmatter {
          title
          publish_date(formatString: "MMMM DD, YYYY")
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