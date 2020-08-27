import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { Container, Article, Section, Hero } from '../components/layout'
import { Title } from '../components/typography'
import { ArrowLink } from '../components/link'
import { StaffList } from '../components/people'

export default ({ data, pageContext }) => {
    const { teamsYaml: {
        name,
        description,
        members,
        lead,
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
                        { description }
                    </Article>
                    
                    <Article title="Members">
                        {
                            members.map(person => (
                                <Fragment key={ person.id }>
                                    <ArrowLink
                                        to={ `/people/${ person.id }` }
                                        text={ `${ person.fullName } ${ lead && person.id === lead.id ? '(lead)' : '' }` }
                                    /> <br/>
                                </Fragment>
                            ))
                        }
                    </Article>
                </Section>

                <Section title="Team Members">
                    <StaffList staff={ members } />    
                </Section>

            </Container>
        </Fragment>
    )
}

export const groupQuery = graphql`
    query($id: String!) {
        teamsYaml( id: { eq: $id }) {
            name
            description
            lead {
                id
                name {
                    first
                    last
                }
            }
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
            }
        }
    }
`