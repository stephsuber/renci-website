import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { Container, Article, Section, HorizontalRule } from '../components/layout'
import { Paragraph } from '../components/typography'
import { ArrowLink } from '../components/link'
import { ArticlePreview } from '../components/news'
import { Profile } from '../components/people'
import { useAvatar } from '../hooks'
import { List } from '../components/list'

export default ({ data, pageContext }) => {
    const {
        peopleYaml: {
            fullName,
            photo,
            title,
            email,
            phone,
            www,
            bio,
            groups,
            collaborations,
            teams,
        }
    } = data
    const avatar = useAvatar()

    return (
        <Container>

            <Profile
                name={ fullName }
                title={ title }
                email={ email }
                phone={ phone }
                www={ www }
                bio={ bio }
                photo={ photo ? photo.childImageSharp.fixed : avatar.childImageSharp.fixed }
            />

            <Section title="Contributions">
                {
                    groups && (
                        <Article title="Research Groups">
                            <List items={ groups.map(group => <ArrowLink key={ group.id } to={ group.fields.path } text={ group.name } />) } />
                        </Article>
                    )
                }

                {
                    collaborations && (
                        <Article title="Collaborations">
                            <List items={ collaborations.map(collaboration => <ArrowLink key={ collaboration.id } to={ collaboration.fields.path } text={ collaboration.name } />) } />
                        </Article>
                    )
                }

                {
                    teams && (
                        <Article title="Teams">
                            <List items={ teams.map(team => <ArrowLink key={ team.id } to={ team.fields.path } text={ team.name } />) } />
                        </Article>
                    )
                }
            </Section>

            <Section title="About">
                <Paragraph>
                    { bio }
                </Paragraph>
            </Section>

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
            www {
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
        }
    }
`