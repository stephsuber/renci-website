import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { Container, Article, Section, HorizontalRule } from '../components/layout'
import { Paragraph } from '../components/typography'
import { ArrowLink } from '../components/link'
import { ArticlePreview } from '../components/news'
import { Profile } from '../components/people'
import { useAvatar } from '../hooks'

export default ({ data, pageContext }) => {
    const {
        peopleYaml: { fullName, photo, title, email, phone, online_presence, bio, groups, collaborations, teams, news, authoredNews }
    } = data
    const avatar = useAvatar()
    const allNews = [].concat(news, authoredNews).filter(n => n !== null)

    return (
        <Container>

            <Profile
                name={ fullName }
                title={ title }
                email={ email }
                phone={ phone }
                online_presence={ online_presence }
                bio={ bio }
                photo={ photo ? photo.childImageSharp.fixed : avatar.childImageSharp.fixed }
            />

            <Section title="Contributions">
                {
                    groups && (
                        <Article title="Research Groups">
                            {
                                groups.map(group => (
                                    <Fragment key={ group.id }>
                                        <ArrowLink to={ group.fields.path } text={ group.name } /> <br/>
                                    </Fragment>
                                ))
                            }
                        </Article>
                    )
                }

                {
                    collaborations && (
                        <Article title="Collaborations">
                            {
                                collaborations.map(collaboration => (
                                    <Fragment key={ collaboration.id }>
                                        <ArrowLink to={ collaboration.fields.path } text={ collaboration.name } /> <br/>
                                    </Fragment>
                                ))
                            }
                        </Article>
                    )
                }

                {
                    teams && (
                        <Article title="Teams">
                            {
                                teams.map(team => (
                                    <Fragment key={ team.id }>
                                        <ArrowLink to={ team.fields.path } text={ team.name } /> <br/>
                                    </Fragment>
                                ))
                            }
                        </Article>
                    )
                }
            </Section>

            <Section title="About">
                <Paragraph>
                    { bio }
                </Paragraph>
            </Section>

            {
                allNews.length && (
                    <Section title="Recent News">
                        {
                            allNews.slice(0, 2).map((article, i) => (
                                <Fragment key={ article.id }>
                                    <ArticlePreview article={ article } path={ article.fields.path } compact />
                                    { i < allNews.length - 1 && <HorizontalRule /> }
                                </Fragment>
                            ))
                        }
                    </Section>
                )
            }

        </Container>
    )
}

export const personQuery = graphql`
    query($id: String!) {
        peopleYaml( id: { eq: $id }) {
            id
            fullName
            title
            email
            phone
            photo {
                childImageSharp {
                    fixed(width: 350, height: 350) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
            online_presence {
                twitter
                github
                instagram
                linkedin
                youtube
            }
            bio
            teams {
                id
                name
                fields {
                    path
                }
            }
            groups {
                id
                name
                fields {
                    path
                }
            }
            collaborations {
                id
                name
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
            authoredNews {
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