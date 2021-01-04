import React from 'react'
import { graphql } from 'gatsby'
import { Container } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { ArrowLink } from '../components/link'

export default ({ data, pageContext }) => {
    // const events = data.events.edges

    return (
        <Container>
            <Title>Upcoming Events at RENCI</Title>

            <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quas in, repellat fugit suscipit dolores possimus, eos nihil
                praesentium unde cumque ea omnis veritatis quaerat id.
                Libero aperiam, adipisci cum natus eaque officiis consequatur, laboriosam?
                Alias fugiat similique officiis eaque minima, vitae atque! Iure nemo,
                nesciunt cum possimus nulla aut tenetur!
            </Paragraph>

            <pre>{ JSON.stringify(data, null, 2) }</pre>
            
            <div>
                <ArrowLink to="/events/archive" text="View Past Events" float="right" />
            </div>
        </Container>
    )
}

export const futureEventsQuery = graphql`
    query($todaysDate: Date!) {
        events: allMarkdownRemark(
            filter: {
                fileAbsolutePath: {regex: "/content\/events/"}
                frontmatter: {dates: {start: {gte: $todaysDate}}}
            }
            sort: {fields: [frontmatter___dates___start], order: ASC},
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        slug
                        title
                        dates {
                            start
                            end
                        }
                    }
                    fileAbsolutePath
                    excerpt(pruneLength: 500)
                    html
                }
            }
        }
    }`