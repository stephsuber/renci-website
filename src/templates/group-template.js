import React, { Fragment, useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { Container, Article, Section, Hero } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { SocialTray } from '../components/social-tray'
import { ArrowLink } from '../components/link'
import { List } from '../components/list'
import { PeopleList } from '../components/people'
import { OrganizationsList } from '../components/organizations'

export default ({ data, pageContext }) => {
  const { groupsYaml: {
    name,
    description,
    members,
    partners,
    funding,
    www,
    projects,
    featuredImage,
  }} = data

  const [currentProjects, setCurrentProjects] = useState([])
  const [pastProjects, setPastProjects] = useState([])

  useEffect(() => {
    if (projects) {
      setCurrentProjects(projects.filter(project => !project.archived))
      setPastProjects(projects.filter(project => project.archived))
    }
  }, [projects])

  return (
    <Fragment>
      <Hero backgroundImage={ featuredImage && featuredImage.childImageSharp.fluid }>
        <Title>{ name }</Title>
        <Paragraph>{ description }</Paragraph>
      </Hero>

      <Container>
        <SocialTray twitter={ www.twitter } github={ www.github } />

        {
          projects && (
            <Section title="Current Projects">
              {
                currentProjects.length > 0 && (
                  <Article>
                    <List items={ currentProjects.map(project => <ArrowLink key={ project.id } to={ project.fields.path } text={ project.name } />) } />
                  </Article>
                )
              }
            </Section>
          )
        }

        {
          (members || partners || funding) && (
            <Section title="Contributors">
              {
                members && (
                  <Article>
                    <PeopleList members={ members.sort((p, q) => p.name.last > q.name.last ? 1 : -1) } />
                  </Article>
                )
              }
              {
                partners && (
                  <Article title="Partners">
                    <OrganizationsList contributors={ partners } />
                  </Article>
                )
              }
              {
                funding && (
                  <Article title="Funding">
                    <OrganizationsList contributors={ funding } />
                  </Article>
                )
              }
            </Section>
          )
        }
        
        {
          pastProjects && (
            <Section title="Past Projects">
              {
                pastProjects.length > 0 && (
                  <Article title="Past Projects">
                    <List items={ pastProjects.map(project => <ArrowLink key={ project.id } to={ project.fields.path } text={ project.name } />) } />
                  </Article>
                )
              }
            </Section>
          )
        }

      </Container>
      
    </Fragment>
  )
}

export const groupQuery = graphql`
  query($id: String!) {
    groupsYaml( id: { eq: $id }) {
      id
      name
      description
      featuredImage {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      fields {
        path
      }
      members {
        id
        name {
          first
          last
        }
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
        name
        url
      }
      funding {
        name
        url
      }
      www {
        twitter
        github
      }
      projects {
        id
        name
        archived
        fields {
          path
        }
      }
    }
  }
`