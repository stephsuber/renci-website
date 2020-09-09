import React, { Fragment, useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { Container, Article, Section, Hero, HorizontalRule } from '../components/layout'
import { Title } from '../components/typography'
import { SocialLinks } from '../components/social-links'
import { ArrowLink } from '../components/link'
import { ArticlePreview } from '../components/news'
import { MembersList } from '../components/people'

export default ({ data, pageContext }) => {
    const { collaborationsYaml: {
        name,
        members,
        online_presence,
        projects,
        featuredImage,
        news,
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
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid incidunt quaerat distinctio est, inventore. Asperiores ex repudiandae quam saepe, blanditiis sed temporibus est dolore aperiam nobis? Aliquam eveniet, sit assumenda.
                </p>
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
                    members && (
                        <Section title="Contributors">
                            <MembersList members={ members } />
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
            </Container>
        </Fragment>
    )
}

export const collaborationQuery = graphql`
    query($id: String!) {
        collaborationsYaml( id: { eq: $id }) {
            name
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