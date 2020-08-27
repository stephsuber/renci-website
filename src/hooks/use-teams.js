import { graphql, useStaticQuery } from 'gatsby'

const teamsQuery = graphql`{
    teams: allTeamsYaml {
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
            }
        }
    }
}`

export const useTeams = () => {
    const { teams } = useStaticQuery(teamsQuery)
    return teams.edges.map(({ node }) => node)
}
