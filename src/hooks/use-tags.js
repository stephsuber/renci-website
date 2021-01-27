import { graphql, useStaticQuery } from 'gatsby'

const tagsQuery = graphql`{
  tags: allTagsYaml {
    edges {
      node {
        id
        name
      }
    }
  }
}`

export const useTags = () => {
  const { tags } = useStaticQuery(tagsQuery)
  return tags.edges.map(({ node }) => node)
}
