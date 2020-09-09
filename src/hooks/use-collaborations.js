import { graphql, useStaticQuery } from 'gatsby'

const collaborationsQuery = graphql`{
    collaborations: allCollaborationsYaml {
        edges {
            node {
                id
                name
                description
                members {
                    id
                    name {
                        first
                        last
                    }
                    email
                    title
                }
                projects {
                    id
                    name
                    description
                }
                online_presence {
                    url
                    github
                    twitter
                }
                fields {
                    path
                }
            }
        }
    }
}`

export const useCollaborations = () => {
    const { collaborations } = useStaticQuery(collaborationsQuery)
    return collaborations.edges.map(({ node }) => node)
}
