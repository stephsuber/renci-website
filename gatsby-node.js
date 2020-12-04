const path = require(`path`)

const now = new Date()
const dateString = `${ now.getFullYear() }-${ now.getMonth() + 1 < 10 ? '0' : '' }${ now.getMonth() + 1 }-${ now.getDate()  < 10 ? '0' : '' }${ now.getDate() }`

console.log(`\n\nStarting build, ${ now }\n\n`)

exports.onCreateNode = ({ node, actions }) => {
  const { createNode, createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const matches = node.fileAbsolutePath.match(/data\/news\/(\d{4}\/\d{2})\/.+\/index.md$/)
    if (matches) {
      const [, yyyydd] = matches
      const path = `/news/${ yyyydd }/${ node.frontmatter.slug }`
      createNodeField({ node, name: 'path', value: path })
    }
  }
  if (node.internal.type === 'PeopleYaml') { createNodeField({ node, name: 'path', value: `/people/${ node.id }` }) }
  if (node.internal.type === 'GroupsYaml') { createNodeField({ node, name: 'path', value: `/research/${ node.id }` }) }
  if (node.internal.type === 'TeamsYaml') { createNodeField({ node, name: 'path', value: `/teams/${ node.id }` }) }
  if (node.internal.type === 'CollaborationsYaml') { createNodeField({ node, name: 'path', value: `/research/${ node.id }` }) }
  if (node.internal.type === 'ProjectsYaml') { createNodeField({ node, name: 'path', value: `/projects/${ node.id }` }) }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type PeopleYaml implements Node {
      teams: [TeamsYaml] @link(by: "members.id", from: "id")
      groups: [GroupsYaml] @link(by: "members.id", from: "id")
      collaborations: [CollaborationsYaml] @link(by: "members.id", from: "id")
      projects: [ProjectsYaml] @link(by: "members.id", from: "id")
      role: String
    }
    type OrganizationsYaml implements Node {
      id: ID!
      name: String!
      url: String!
    }
  `
  createTypes(typeDefs)
}

exports.createResolvers = ({ actions, createResolvers }) => {
  const { createNodeField } = actions
  const fullName = {
    type: "String",
    resolve(source, args, context, info) {
      return `${ source.name.first } ${ source.name.last }`
    }
  }
  const resolvers = {
    PeopleYaml: {
      fullName,
      teams: {
        type: ["TeamsYaml"],
        resolve(source, args, context, info) {
          return context.nodeModel.runQuery({
            query: { filter: { members: { elemMatch: { id: { eq: source.id } } } } },
            type: "TeamsYaml",
            firstOnly: false,
          })
        }
      },
      groups: {
        type: ["GroupsYaml"],
        resolve(source, args, context, info) {
          return context.nodeModel.runQuery({
            query: { filter: { members: { elemMatch: { id: { eq: source.id } } } } },
            type: "GroupsYaml",
            firstOnly: false,
          })
        }
      },
      collaborations: {
        type: ["CollaborationsYaml"],
        resolve(source, args, context, info) {
          return context.nodeModel.runQuery({
            query: { filter: { members: { elemMatch: { id: { eq: source.id } } } } },
            type: "CollaborationsYaml",
            firstOnly: false,
          })
        },
      },
      projects: {
        type: ["ProjectsYaml"],
        resolve(source, args, context, info) {
          return context.nodeModel.runQuery({
            query: { filter: { members: { elemMatch: { id: { eq: source.id } } } } },
            type: "ProjectsYaml",
            firstOnly: false,
          })
        },
      },
      news: {
        type: ["MarkdownRemark"],
        resolve(source, args, context, info) {
          return context.nodeModel.runQuery({
            query: { filter: { frontmatter: { people: { elemMatch: { id: { eq: source.id } } } } } },
            type: "MarkdownRemark",
            firstOnly: false,
          })
        }
      },
      authoredNews: {
        type: ["MarkdownRemark"],
        resolve(source, args, context, info) {
          return context.nodeModel.runQuery({
            query: { filter: { frontmatter: { author: { elemMatch: { id: { eq: source.id } } } } } },
            type: "MarkdownRemark",
            firstOnly: false,
          })
        }
      },
    },
    GroupsYaml: {
      news: {
        type: ["MarkdownRemark"],
        resolve(source, args, context, info) {
          return context.nodeModel.runQuery({
            query: {
              sort: { fields: ['frontmatter.publish_date'], order: ['DESC'] },
              filter: {
                frontmatter: {
                  publish_date: {  lte: dateString },
                  groups: { elemMatch: { id: { eq: source.id } } }
                }
              }
            },
            type: "MarkdownRemark",
            firstOnly: false,
          })
        }
      },
    },
    CollaborationsYaml: {
      news: {
        type: ["MarkdownRemark"],
        resolve(source, args, context, info) {
          return context.nodeModel.runQuery({
            query: { filter: { frontmatter: { collaborations: { elemMatch: { id: { eq: source.id } } } } } },
            type: "MarkdownRemark",
            firstOnly: false,
          })
        }
      },
    },
    ProjectsYaml: {
      members: {
        type: ["PeopleYaml"],
        resolve(source, args, context, info) {
          if (!source.members) { return [] }
          const memberIds = source.members.map(member => member.id)
          // console.log(source.members.map(({ id, role }) => `${ id } (${ role })`))
          return context.nodeModel.getNodesByIds({ ids: memberIds })
            .map(node => {
              const index = source.members.findIndex(member => member.id === node.id)
              if (index === -1) {
                return node
              }
              return ({ ...node, role: source.members[index].role })
            })
        }
      },
      news: {
        type: ["MarkdownRemark"],
        resolve(source, args, context, info) {
          return context.nodeModel.runQuery({
            query: { filter: { frontmatter: { projects: { elemMatch: { id: { eq: source.id } } } } } },
            type: "MarkdownRemark",
            firstOnly: false,
          })
        }
      },
      group: {
        type: ["GroupsYaml"],
        resolve(source, args, context, info) {
          return context.nodeModel.runQuery({
            query: { filter: { projects: { elemMatch: { id: { eq: source.id } } } } },
            type: "GroupsYaml",
            firstOnly: false,
          })
        }
      },
    },
  }
  createResolvers(resolvers)
}
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const personTemplate = path.resolve(`src/templates/person-template.js`)
  const groupTemplate = path.resolve(`src/templates/group-template.js`)
  const teamTemplate = path.resolve(`src/templates/team-template.js`)
  const projectTemplate = path.resolve(`src/templates/project-template.js`)
  const collaborationTemplate = path.resolve(`src/templates/collaboration-template.js`)
  const newsArticleTemplate = path.resolve(`src/templates/news-article-template.js`)
  const eventTemplate = path.resolve(`src/templates/event-template.js`)
  const eventsFutureTemplate = path.resolve(`src/templates/events-future-template.js`)
  const eventsPastTemplate = path.resolve(`src/templates/events-past-template.js`)

  return graphql(`
    {
      people: allPeopleYaml(sort: {fields: id, order: ASC}) {
        edges {
          node {
            id
            name {
              first
              last
            }
          }
        }
      }
      groups: allGroupsYaml(sort: {fields: name, order: ASC}) {
        edges {
          node {
            id
            name
          }
        }
      }
      teams: allTeamsYaml(sort: {fields: name, order: ASC}) {
        edges {
          node {
            id
            name
          }
        }
      }
      projects: allProjectsYaml(sort: {fields: name, order: DESC}) {
        edges {
          node {
            id
            name
          }
        }
      }
      collaborations: allCollaborationsYaml(sort: {fields: name, order: ASC}) {
        edges {
          node {
            id
            name
          }
        }
      }
      news: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/news/"}},
        sort: {fields: frontmatter___publish_date, order: DESC}
      ) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              slug
              title
              publish_date(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }
      events: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/events/"}},
        sort: {fields: frontmatter___dates___start, order: ASC}
      ) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              slug
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    
    /**
     * Create person pages
     */

    const people = result.data.people.edges
    console.log(`\nCreating staff pages...`)
    people.forEach(({ node }) => {
      const path = `/people/${ node.id }`
      console.log(` - ${ node.name.first } ${ node.name.last } (${ path })`)
      createPage({
        id: node.id,
        path: path,
        component: personTemplate,
        context: { // additional data passed via context
          id: node.id,
        },
      })
    })

    /**
     * Create group pages
     */

    const groups = result.data.groups.edges
    console.log(`\nCreating group pages...`)
    groups.forEach(({ node }) => {
      const path = `/research/${ node.id }`
      console.log(` - ${ node.name } (${ path })`)
      createPage({
        id: node.id,
        path: path,
        component: groupTemplate,
        context: { // additional data passed via context
          id: node.id,
        },
      })
    })

    /**
     * Create project pages
     */

    const projects = result.data.projects.edges
    console.log(`\nCreating project pages...`)
    projects.forEach(({ node }) => {
      const path = `/projects/${ node.id }`
      console.log(` - ${ node.name } (${ path })`)
      createPage({
        id: node.id,
        path: path,
        component: projectTemplate,
        context: { // additional data passed via context
          id: node.id,
        },
      })
    })

    /**
     * Create team pages
     */

    const teams = result.data.teams.edges
    console.log(`\nCreating team pages...`)
    teams.forEach(({ node }) => {
      const path = `/teams/${ node.id }`
      console.log(` - ${ node.name } (${ path })`)
      createPage({
        id: node.id,
        path: path,
        component: teamTemplate,
        context: { // additional data passed via context
          id: node.id,
        },
      })
    })

    /**
     * Create collaboration pages
     */

    const collaborations = result.data.collaborations.edges
    console.log(`\nCreating collaboration pages...`)
    collaborations.forEach(({ node }) => {
      const path = `/research/${ node.id }`
      console.log(` - ${ node.name } (${ path })`)
      createPage({
        id: node.id,
        path: path,
        component: collaborationTemplate,
        context: { // additional data passed via context
          id: node.id,
        },
      })
    })

    /**
     * Create news article pages
     */

    const articles = result.data.news.edges
    console.log(`\nCreating news pages...`)
    articles.forEach(({ node }, index) => {
      const matches = node.fileAbsolutePath.match(/data\/news\/(\d{4}\/\d{2})\/.+\/index.md$/)
      if (matches) {
        const [, yyyydd] = matches
        const path = `/news/${ yyyydd }/${ node.frontmatter.slug }`
        node.path = path
        console.log(` - ${ node.frontmatter.title } (${ path })`)
        createPage({
          path: path,
          component: newsArticleTemplate,
          context: { // additional data passed via context
            slug: node.frontmatter.slug,
            prevArticle: index === 0 ? null : articles[index - 1].node,
            nextArticle: index === articles.length - 1 ? null : articles[index + 1].node,
          },
        })
      }
    })

    /**
     * Create event pages
     */

    const events = result.data.events.edges
    console.log(`\nCreating event pages...`)
    events.forEach(({ node }, index) => {
      const matches = node.fileAbsolutePath.match(/data\/events\/(\d{4}\/\d{2})\/.+.md$/)
      if (matches) {
        const [, yyyydd] = matches
        const path = `/events/${ yyyydd }/${ node.frontmatter.slug }`
        console.log(` - ${ node.frontmatter.title } (${ path })`)
        createPage({
          path: path,
          component: eventTemplate,
          context: { // additional data passed via context
            slug: node.frontmatter.slug,
            prev: index === 0 ? null : events[index - 1].node,
            next: index === events.length - 1 ? null : events[index + 1].node,
          },
        })
      }
    })

    /**
     * Create events pages
     */

    console.log(`\nCreating events list pages...`)

    console.log(` - Future events (/events)`)
    createPage({
      path: '/events',
      component: eventsFutureTemplate,
      context: {
        todaysDate: dateString,
      },
    })
    
    console.log(` - Past events (/events/archive)`)
    createPage({
      path: '/events/archive',
      component: eventsPastTemplate,
      context: {
        todaysDate: dateString,
      },
    })

    return [
      ...people,
      ...groups,
      ...projects,
      ...teams,
      ...collaborations,
      ...articles,
      ...events,
    ]
  })
}