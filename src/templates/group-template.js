import React, { Fragment, useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { Container, Article, Section, Hero, HorizontalRule } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { SocialLinks } from '../components/social-links'
import { ArrowLink } from '../components/link'
import { ArticlePreview } from '../components/news'
import { MembersList } from '../components/people'
import { List } from '../components/list'

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
                        <Section title="News & Events">
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
                                        <List items={ currentProjects.map(project => <ArrowLink key={ project.id } to={ project.fields.path } text={ project.name } />) } />
                                    </Article>
                                )
                            }
                            {
                                pastProjects.length > 0 && (
                                    <Article title="Past">
                                        <List items={ pastProjects.map(project => <ArrowLink key={ project.id } to={ project.fields.path } text={ project.name } />) } />
                                    </Article>
                                )
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
            fields {
                path
            }
            lead {
                id
                fullName
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
            online_presence {
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