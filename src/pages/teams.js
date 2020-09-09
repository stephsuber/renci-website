import React, { Fragment } from 'react'
import { SEO } from '../components/seo'
import { Container, Section, Hero, Article } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { ArrowLink } from '../components/link'
import { useCollaborations, useTeams } from '../hooks'

const TeamsPage = () => {
    const teams = useTeams()
    const collaborations = useCollaborations()

    return (
        <Fragment>
            <SEO title="RENCI Operational Teams" />

            <Hero>
                <Title>RENCI Operational Teams</Title>
                <Paragraph>
                    High-level view of RENCI Teams and teamwork, etc...
                    Libero aperiam, adipisci cum natus eaque officiis consequatur, laboriosam?
                    Nesciunt cum possimus nulla aut tenetur!
                </Paragraph>
            </Hero>

            <Container>
                <Section title="Overview">
                    <Article title="Teamwork">
                        <Paragraph>
                            More in-the-weeds stuff about teams and organization at RENCI.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, accusamus! Exercitationem sequi at hic explicabo facilis minus recusandae et. Perspiciatis sapiente maiores natus in mollitia reiciendis excepturi eius corporis officia.
                        </Paragraph>
                    </Article>

                    <Article title="Operations">
                        <Paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, accusamus! Exercitationem sequi at hic explicabo facilis minus recusandae et. Perspiciatis sapiente maiores natus in mollitia reiciendis excepturi eius corporis officia.
                        </Paragraph>
                    </Article>

                    <Article title="Operational Units">
                        <Paragraph>
                            {
                                teams.map(team => (
                                    <Fragment key={ team.id }>
                                        <ArrowLink to={ team.fields.path } text={ team.name } /> <br/>
                                    </Fragment>
                                ))
                            }
                        </Paragraph>
                    </Article>
                </Section>
                
            </Container>
        </Fragment>
    )
}

export default TeamsPage
