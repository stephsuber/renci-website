module.exports = `
  {
    people: allPeopleYaml(sort: {fields: id, order: ASC}) {
      edges {
        node {
          id
          name {
            first
            last
          }
          fields {
            path
          }
        }
      }
    }
    groups: allGroupsYaml(sort: {fields: name, order: ASC}) {
      edges {
        node {
          id
          name
          fields {
            path
          }
        }
      }
    }
    teams: allTeamsYaml(sort: {fields: name, order: ASC}) {
      edges {
        node {
          id
          name
          fields {
            path
          }
        }
      }
    }
    projects: allProjectsYaml(sort: {fields: name, order: DESC}) {
      edges {
        node {
          id
          name
          fields {
            path
          }
        }
      }
    }
    collaborations: allCollaborationsYaml(sort: {fields: name, order: ASC}) {
      edges {
        node {
          id
          name
          fields {
            path
          }
        }
      }
    }
    news: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/content\/news\/features/"}},
      sort: {fields: frontmatter___publishDate, order: DESC}
    ) {
      edges {
        node {
          fileAbsolutePath
          frontmatter {
            slug
            title
            publishDate(formatString: "MMMM DD, YYYY")
          }
          fields {
            path
          }
        }
      }
    }
    blog: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/content\/news\/blog/"}},
      sort: {fields: frontmatter___publishDate, order: DESC}
    ) {
      edges {
        node {
          fileAbsolutePath
          frontmatter {
            slug
            title
            publishDate(formatString: "MMMM DD, YYYY")
          }
          fields {
            path
          }
        }
      }
    }
    events: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/content\/events/"}},
      sort: {fields: frontmatter___dates___start, order: ASC}
    ) {
      edges {
        node {
          fileAbsolutePath
          frontmatter {
            slug
            title
          }
          fields {
            path
          }
        }
      }
    }
  }
`