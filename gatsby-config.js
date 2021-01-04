module.exports = {
    siteMetadata: {
        title: `RENCI`,
        description: `Renaissance Computing Institute`,
        author: `mbwatson`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-styled-components`,
        {
          resolve: 'gatsby-transformer-yaml-full',
          options: {
            plugins: [
              {
                resolve: 'gatsby-yaml-full-markdown',
                options: {
                  unwrapSingleLine: true
                }
              }
            ],
          },
        },
        { resolve: `gatsby-source-filesystem`, options: { name: `images`, path: `${ __dirname }/src/images` }, },
        { resolve: `gatsby-source-filesystem`, options: { name: `content`, path: `${ __dirname }/src/content` }, },
        { resolve: `gatsby-source-filesystem`, options: { name: `people`, path: `${ __dirname }/src/content/people` } },
        { resolve: `gatsby-source-filesystem`, options: { name: `teams`, path: `${ __dirname }/src/content/teams` } },
        { resolve: `gatsby-source-filesystem`, options: { name: `groups`, path: `${ __dirname }/src/content/research/groups` } },
        { resolve: `gatsby-source-filesystem`, options: { name: `projects`, path: `${ __dirname }/src/content/research/projects` } },
        { resolve: `gatsby-source-filesystem`, options: { name: `collaborations`, path: `${ __dirname }/src/content/research/collaborations` } },
        { resolve: `gatsby-source-filesystem`, options: { name: `news`, path: `${ __dirname }/src/content/news` } },
        { resolve: `gatsby-source-filesystem`, options: { name: `events`, path: `${ __dirname }/src/content/events` } },
        { resolve: `gatsby-source-filesystem`, options: { name: `careers`, path: `${ __dirname }/src/content/careers` } },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                commonmark: true, // CommonMark mode (default: true)
                footnotes: true, // Footnotes mode (default: true)
                pedantic: true, // Pedantic mode (default: true)
                gfm: true, // GitHub Flavored Markdown mode (default: true)
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 800,
                        },
                    },
                ], // Plugins configs
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `RENCI - Renaissance Computing Institute`,
                short_name: `RENCI`,
                start_url: `/`,
                background_color: `#00abc7`,
                theme_color: `#00abc7`,
                display: `minimal-ui`,
                icon: `src/images/favicon.png`, // This path is relative to the root of the site.
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
    mapping: {
        // Show members as people objects in full for team, group, and collaboration queries--not just the corresponding id
        "TeamsYaml.members": `PeopleYaml`, // Link team members to people // defaults to PeopleYaml.id unless specified otherwise
        "TeamsYaml.lead": `PeopleYaml`, // Link team leads to person
        // GROUPS
        "GroupsYaml.members": `PeopleYaml`, // Link group members to people
        "GroupsYaml.partners": `OrganizationsYaml`, // Link group partners to organizations
        "GroupsYaml.funding": `OrganizationsYaml`, // Link group funders to organizations
        "GroupsYaml.projects": `ProjectsYaml`, // Show projects in full for group queries
        // COLLABORATIONS
        "CollaborationsYaml.members": `PeopleYaml`, // Link collaboration members to people
        "CollaborationsYaml.partners": `OrganizationsYaml`, // Link project partners to organizations
        "CollaborationsYaml.funding": `OrganizationsYaml`, // Link project funders to organizations
        "CollaborationsYaml.projects": `ProjectsYaml`, // Show projects in full for collaboration queries
        // PROJECTS
        "ProjectsYaml.members": `PeopleYaml`, // Link project members to people
        "ProjectsYaml.funding": `OrganizationsYaml`, // Link project funders to organizations
        "ProjectsYaml.partners": `OrganizationsYaml`, // Link project partners to organizations
        // NEWS
        "MarkdownRemark.frontmatter.author": "PeopleYaml",
        "MarkdownRemark.frontmatter.people": "PeopleYaml",
        "MarkdownRemark.frontmatter.groups": "GroupsYaml",
        "MarkdownRemark.frontmatter.projects": "ProjectsYaml",
        "MarkdownRemark.frontmatter.teams": "TeamsYaml",
        "MarkdownRemark.frontmatter.collaborations": "CollaborationsYaml",
        "MarkdownRemark.frontmatter.organizations": "OrganizationsYaml",
    },
}
