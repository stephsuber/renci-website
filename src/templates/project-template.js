import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { Container, Article, Section, Hero, HorizontalRule } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { SocialLinks } from '../components/social-links'
import { ArticlePreview } from '../components/news'
import { ContributorsList, MembersList } from '../components/contributors'
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
    email,
    www,
  }} = data
  
  return (
    <Fragment>
      <Hero backgroundImage={ featuredImage && featuredImage.childImageSharp.fluid }>
        { group[0] && <Link to={ group[0].fields.path }>{ group[0].name }</Link> }
        <Title>{ name }</Title>
        <Paragraph dangerouslySetInnerHTML={{ __html: description }} />
      </Hero>

      <Container>
        <SocialLinks url={ www.url } twitter={ www.twitter } github={ www.github } />
        
        <Section title="RENCI's Role">
          <Article>
            <Paragraph dangerouslySetInnerHTML={{ __html: renciRole }} />
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
    }
  }
`