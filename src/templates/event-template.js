import React from 'react'
import { graphql } from 'gatsby'
import { Container } from '../components/layout'
import { Title } from '../components/typography'

export default ({ data, pageContext }) => {
    const { event } = data
    return (
        <Container>
            <Title>{ event.frontmatter.title }</Title>
            <pre>{ JSON.stringify(event.frontmatter, null, 2) }</pre>
        </Container>
    )
}

export const eventQuery = graphql`
    query($slug: String!) {
        event: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            id
            frontmatter {
                title
                slug
                dates {
                    start
                    end
                }
                spotlight
                location
                hosted_by_renci
            }
            fileAbsolutePath
            excerpt(pruneLength: 500)
            html
        }
    }`