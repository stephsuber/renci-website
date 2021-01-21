import { graphql, useStaticQuery } from 'gatsby'

const newsQuery = graphql`{
    features: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/content\/news\/features/"}},
        sort: {fields: frontmatter___publishDate, order: DESC}
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
                    publishDate(formatString: "MMMM D, YYYY")
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
                fields {
                    path
                    newsType
                }
                html
                excerpt(pruneLength: 500)
            }
        }
    }
    blog: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/content\/news\/blog/"}},
        sort: {fields: frontmatter___publishDate, order: DESC}
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
                    publishDate(formatString: "MMMM D, YYYY")
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
                fields {
                    path
                    newsType
                }
                html
                excerpt(pruneLength: 500)
            }
        }
    }
}`

export const useNews = () => {
    const news = useStaticQuery(newsQuery)

    const features = news.features.edges.map(({ node }) => {
        // read date from the file path, and set client route
        const matches = node.fileAbsolutePath.match(/content\/news\/features\/(\d{4})\/(\d{2})\/.+\/index.md$/)
        if (matches) {
            const [, yyyy, dd] = matches
            const path = `/news/${ yyyy }/${ dd }/${ node.frontmatter.slug }`
            node.path = path
        }
        return node
    })

    const blog = news.blog.edges.map(({ node }) => {
        // read date from the file path, and set client route
        const matches = node.fileAbsolutePath.match(/content\/news\/blog\/(\d{4})\/(\d{2})\/.+\/index.md$/)
        if (matches) {
            const [, yyyy, dd] = matches
            const path = `/blog/${ yyyy }/${ dd }/${ node.frontmatter.slug }`
            node.path = path
        }
        return node
    })

    const articles = [...features, ...blog]
      .sort((a, b) => new Date(b.frontmatter.publishDate) - new Date(a.frontmatter.publishDate))

    return articles
}

export const useNewsSpotlight = () => {
    const spotlightArticles = useNews().filter(article => article.frontmatter.spotlight === true)
    return spotlightArticles
}
