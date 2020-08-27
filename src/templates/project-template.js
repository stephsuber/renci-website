import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { Container, Article, Section, Hero, HorizontalRule } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { SocialLinks } from '../components/social-links'
import { ArticlePreview } from '../components/news'

export default ({ data, pageContext }) => {
    const { projectsYaml: {
        name,
        email,
        description,
        online_presence,
        news,
    }} = data
    
    return (
        <Fragment>
            <Hero>
                <Title>{ name }</Title>
                <div>{ email }</div>
                <Paragraph>
                    { description }
                </Paragraph>
            </Hero>

            <Container>
                <SocialLinks url={ online_presence.url } twitter={ online_presence.twitter } github={ online_presence.github } />
                
                <Section title="Project Details">
                    <Article title="Description">
                        <Paragraph>{ description }</Paragraph>
                    </Article>
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
            online_presence {
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