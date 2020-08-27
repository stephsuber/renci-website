import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { Container, Section, Hero, HorizontalRule } from '../components/layout'
import { Title } from '../components/typography'
import { SocialLinks } from '../components/social-links'
import { ArrowLink } from '../components/link'
import { ArticlePreview } from '../components/news'

export default ({ data, pageContext }) => {
    const { collaborationsYaml: {
        name,
        members,
        online_presence,
        featuredImage,
        news,
    }} = data
    
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

                <Section title="Contributors">
                    { members.map(person => <div key={ person.id }><ArrowLink to={ `/people/${ person.id }` } text={ person.fullName } /></div>) }
                </Section>
                
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
            }
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