import React, { Fragment, useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { Container, Article, Section, Hero, HorizontalRule } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { SocialLinks } from '../components/social-links'
import { ArrowLink } from '../components/link'
import { ArticlePreview } from '../components/news'

export default ({ data, pageContext }) => {
    const { groupsYaml: {
        name,
        lead,
        members,
        online_presence,
        projects,
        news,
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
                <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid incidunt quaerat distinctio est, inventore. Asperiores ex repudiandae quam saepe, blanditiis sed temporibus est dolore aperiam nobis? Aliquam eveniet, sit assumenda.
                </Paragraph>
            </Hero>

            <Container>
                <SocialLinks url={ online_presence.url } twitter={ online_presence.twitter } github={ online_presence.github } />

                {
                    news && (
                        <Section title="Recent News">
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
                
                {
                    projects && (
                        <Section title="Projects">
                            {
                                currentProjects.length > 0 && (
                                    <Article title="Current">
                                        {
                                            currentProjects.map(project => (
                                                <Fragment key={ project.id }>
                                                    <ArrowLink to={ `/projects/${ project.id }` } text={ project.name } /> <br/>
                                                </Fragment>
                                            ))
                                        }
                                    </Article>
                                )
                            }
                            {
                                pastProjects.length > 0 && (
                                    <Article title="Past">
                                        {
                                            pastProjects.map(project => (
                                                <Fragment key={ project.id }>
                                                    <ArrowLink to={ `/projects/${ project.id }` } text={ project.name } /> <br/>
                                                </Fragment>
                                            ))
                                        }
                                    </Article>
                                )
                            }
                        </Section>
                    )
                }

                {
                    members && (
                        <Section title="Contributors">
                            {
                                members.map(person => (
                                    <Fragment key={ person.id }>
                                        <ArrowLink to={ `/people/${ person.id }` } text={ `${ person.fullName } ${ person.id === lead.id ? '(lead)' : '' }` } /> <br/>
                                    </Fragment>
                                ))
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
            featuredImage {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            lead {
                id
                fullName
            }
            members {
                id
                fullName
            }
            online_presence {
                url
                twitter
                github
            }
            projects {
                id
                name
                archived
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