import React from 'react'
import { graphql } from 'gatsby'
import { Container } from '../components/layout'
import { Title } from '../components/typography'
import { ArrowLink } from '../components/link'

export default ({ data, pageContext }) => {
    const events = data.events.edges
    
    return (
        <Container>
            <Title>Events Archive</Title>
            <pre>{ JSON.stringify(events, null, 2) }</pre>
            <div>
                <ArrowLink to="/events" text="View Upcoming Events" float="right" />
            </div>
        </Container>
    )
}

export const pastEventsQuery = graphql`
    query($todaysDate: Date!) {
        events: allMarkdownRemark(
            filter: {
                fileAbsolutePath: { regex: "/content\/events/" }
                frontmatter: { dates: { start: { lt: $todaysDate } } }
            }
            sort: {fields: frontmatter___dates___start, order: DESC}
        ) {
            edges {
                node {
                    fileAbsolutePath
                    frontmatter {
                        slug
                        title
                        dates {
                            start
                            end
                        }
                    }
                }
            }
        }
    }`