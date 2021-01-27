import { graphql, useStaticQuery } from 'gatsby'

const tagsQuery = graphql`{
  tags: allTagsYaml(sort: {order: ASC, fields: name}) {
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
