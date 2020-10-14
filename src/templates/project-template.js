import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { Container, Article, Section, Hero, HorizontalRule } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { SocialLinks } from '../components/social-links'
import { ArticlePreview } from '../components/news'
import { MembersList } from '../components/contributors'

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
                
                <Section title="Project Details">
                    <Article title="Description">
                        <Paragraph dangerouslySetInnerHTML={{ __html: renci_role }} />
                    </Article>
                    {
                        members && <Article title="Contributors"><MembersList members={ members } /></Article>
                    }
                    {
                        partners && (
                            <Article title="Partners">
                                <pre>{ JSON.stringify(partners, null, 2) }</pre>
                            </Article>
                        )
                    }

                    {
                        funding && (
                            <Article title="Funding">
                                <pre>{ JSON.stringify(funding, null, 2) }</pre>
                            </Article>
                        )
                    }
                </Section>



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
            funding
            partners
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