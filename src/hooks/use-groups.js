import { graphql, useStaticQuery } from 'gatsby'

const groupsQuery = graphql`{
    groups: allGroupsYaml(sort: {fields: name, order: ASC}) {
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
                online_presence {
                    url
                    github
                    twitter
                }
                projects {
                    id
                    name
                    description
                }
                fields {
                    path
                }
            }
        }
    }
}`

export const useGroups = () => {
    const { groups } = useStaticQuery(groupsQuery)
    return groups.edges.map(({ node }) => node).sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase())
}
