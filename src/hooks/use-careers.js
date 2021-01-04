import { graphql, useStaticQuery } from 'gatsby'

const careersQuery = graphql`{
    careers: allMarkdownRemark(
        filter: {
            fileAbsolutePath: {regex: "/content\/careers/"}
            frontmatter: {active: {eq: true }}
        },
        sort: {fields: frontmatter___title, order: DESC}
    ) {
        edges {
            node {
                id
                frontmatter {
                    title
                    publish_date(formatString: "dddd, MMMM Do, YYYY")
                    unc_position_number
                }
                excerpt(pruneLength: 500)
                html
            }
        }
    }
}`

export const useCareers = () => {
    const { careers } = useStaticQuery(careersQuery)
    return careers.edges.map(({ node }) => node)
}
