import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { Container, Article, Section, Hero } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { ArrowLink } from '../components/link'
import { MembersList } from '../components/contributors'

export default ({ data, pageContext }) => {
    const { teamsYaml: {
        name,
        description,
        members,
        featuredImage
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
                <Section title="Team Details">
                    <Article title="Description">
                        <Paragraph>
                            { description }
                        </Paragraph>
                    </Article>
                </Section>

                <Section title="Team Members">
                    <Article>
                        <MembersList members={ members } />
                    </Article>
                </Section>

            </Container>
        </Fragment>
    )
}

export const teamQuery = graphql`
    query($id: String!) {
        teamsYaml( id: { eq: $id }) {
            name
            description
            members {
                id
                fullName
                name {
                    first
                    last
                }
                title
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
        }
    }
`