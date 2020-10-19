import { graphql, useStaticQuery } from 'gatsby'

const newsQuery = graphql`{
    news: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/data\/news/"}},
        sort: {fields: frontmatter___publish_date, order: DESC}
    ) {
        edges {
            node {
                id
                fileAbsolutePath
                frontmatter {
                    title
                    slug
                    spotlight
                    featuredImage {
                        childImageSharp {
                            fullSize: fluid {
                                ...GatsbyImageSharpFluid
                            }
                            previewSize: fixed(width: 300, height: 300) {
                                ...GatsbyImageSharpFixed
                            }
                        }
                    }
                    publish_date(formatString: "dddd, MMMM Do, YYYY")
                    author {
                        id
                        name {
                            first
                            last
                        }
                    }
                    groups {
                        id
                    }
                    projects {
                        id
                    }
                }
                html
                excerpt(pruneLength: 500)
            }
        }
    }
}`

export const useNews = () => {
    const { news } = useStaticQuery(newsQuery)
    news.edges.forEach(({ node }) => {
        const matches = node.fileAbsolutePath.match(/data\/news\/(\d{4})\/(\d{2})\/.+\/index.md$/)
        if (matches) {
            const [, yyyy, dd] = matches
            node.path = `/news/${ yyyy }/${ dd }/${ node.frontmatter.slug }`
        }
    })
    return news.edges.map(({ node }) => node)
}

export const useNewsSpotlight = () => {
    const spotlightArticles = useNews().filter(article => article.frontmatter.spotlight === true)
    return spotlightArticles
}
