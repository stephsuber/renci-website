import { graphql, useStaticQuery } from 'gatsby'

const orgsQuery = graphql`{
    orgs: allOrganizationsYaml {
        edges {
            node {
                name
                id
                url
            }
        }
    }
}`

export const useOrganizations = () => {
    const { orgs } = useStaticQuery(orgsQuery)
    return orgs.edges.map(({ node }) => node)
}
