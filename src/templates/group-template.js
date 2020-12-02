import React, { Fragment, useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { Container, Article, Section, Hero } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { SocialLinks } from '../components/social-links'
import { ArrowLink } from '../components/link'
import { List } from '../components/list'
import { ContributorsList, MembersList } from '../components/contributors'

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
                <SocialLinks url={ www.url } twitter={ www.twitter } github={ www.github } />

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
                                    <Article title="RENCI Team">
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
                url
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