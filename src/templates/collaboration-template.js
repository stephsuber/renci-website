import React, { Fragment, useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { Container, Article, Section, Hero, HorizontalRule } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { SocialLinks } from '../components/social-links'
import { ArrowLink } from '../components/link'
import { ArticlePreview } from '../components/news'
import { ContributorsList, MembersList } from '../components/contributors'
import { List } from '../components/list'

export default ({ data, pageContext }) => {
    const { collaborationsYaml: {
        name,
        members,
        description,
        www,
        projects,
        featuredImage,
        partners,
        funding,
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
                <SocialLinks url={ www.url } twitter={ www.twitter } github={ www.github } />
                
                {
                    <Section title="RENCI's Role">
                        <Paragraph>{ description }</Paragraph>
                    </Section>
                }

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
            description
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
            partners {
                name
                url
            }
            funding {
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