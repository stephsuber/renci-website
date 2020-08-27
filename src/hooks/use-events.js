import { graphql, useStaticQuery } from 'gatsby'

const eventsQuery = graphql`{
    events: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/data\/events/"}},
        sort: {fields: frontmatter___dates___start, order: ASC}
    ) {
        edges {
            node {
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
        }
    }
}`

export const useEvents = () => {
    const { events } = useStaticQuery(eventsQuery)
    events.edges.forEach(({ node }) => {
        const matches = node.fileAbsolutePath.match(/data\/news\/(\d{4}\d{2})\/.+\/index.md$/)
        if (matches) {
            const [, yyyydd] = matches
            node.path = `/events/${ yyyydd }/${ node.frontmatter.slug }`
        }
    })
    console.log(events)
    return events.edges.map(({ node }) => node)
}
