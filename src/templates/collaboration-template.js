import React, { Fragment, useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { Container, Article, Section, Hero } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { SocialLinks } from '../components/social-links'
import { ArrowLink } from '../components/link'
import { ContributorsList, MembersList } from '../components/contributors'
import { List } from '../components/list'

export default ({ data, pageContext }) => {
    const { collaborationsYaml: {
        name,
        description,
        renciRole,
        members,
        www,
        projects,
        featuredImage,
        partners,
        funding,
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
                <SocialLinks url={ www.url } twitter={ www.twitter } github={ www.github } />
                
                {
                    <Section title="RENCI's Role">
                        <Paragraph dangerouslySetInnerHTML={{ __html: renciRole }} />
                    </Section>
                }

                {
                    projects && (
                        <Section title="Projects">
                            {
                                currentProjects.length > 0 && (
                                    <Article>
                                        <List items={ currentProjects.map(project => <ArrowLink key={ project.id } to={ project.fields.path } text={ project.name } />) } />
                                    </Article>
                                )
                            }
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

                {
                    (members || partners || funding) && (
                        <Section title="Contributors">
                            {
                                members && (
                                    <Article title="Members">
                                        <MembersList members={ members } />
                                    </Article>
                                )
                            }
                            {
                                partners && (
                                    <Article title="Partners">
                                        <ContributorsList contributors={ partners } />
                                    </Article>
                                )
                            }
                            {
                                funding && (
                                    <Article title="Funding">
                                        <ContributorsList contributors={ funding } />
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

export const collaborationQuery = graphql`
    query($id: String!) {
        collaborationsYaml( id: { eq: $id }) {
            name
            description
            renciRole
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
            featuredImage {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
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