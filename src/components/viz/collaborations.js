import React, { Fragment, useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import loadable from '@loadable/component'

const ForceGraph2D = loadable(() => import('./force-graph'))

const Wrapper = styled.div(({ theme }) => `
  margin: 2rem 0;
  border: 1px solid #eee;
  overflow: hidden;
  & .graph-tooltip {
    font-size: 66% !important;
    background-color: ${ theme.color.black } !important;
    padding: ${ theme.spacing.xs } !important;
    line-height: 1.5 !important;
  }
`)

export const CollaborationsNetwork = () => {
  const theme = useTheme()
  const data = useStaticQuery(collaborationsQuery)
  const [networkData, setNetworkData] = useState({ nodes: [], edges: [] })

  const groupNode = (id, name) => ({
    type: 'group',
    id: id,
    name: name,
    color: theme.color.renciBlue,
    val: 20,
  })

  const collaborationNode = (id, name) => ({
    type: 'collaboration',
    id: id,
    name: name,
    color: theme.color.carolinaBlue,
    val: 20,
  })

  const projectNode = (id, name) => ({
    type: 'project',
    id: id,
    name: name,
    color: theme.color.extended.contessa,
    val: 10,
  })

  const organizationNode = (id, name) => ({
    type: 'organization',
    id: id,
    name: name,
    color: theme.color.extended.sherbet,
    val: 5,
  })

  useEffect(() => console.log(networkData), [networkData])

  useEffect(() => {
    let nodes = []
    let edges = []

    const groups = data.groups.edges.map(({ node }) => node)
    const collaborations = data.collaborations.edges.map(({ node }) => node)

    // add group nodes
    groups.forEach(group => nodes.push(groupNode(group.id, group.name)))
    // add collaboration nodes
    collaborations.forEach(collaboration => nodes.push(collaborationNode(collaboration.id, collaboration.name)))

    groups.concat(collaborations).forEach(group => {
      console.log(group)
      if (group.partners) {
        group.partners.forEach(partner => {
          // add partner node
          const nodeIndex = nodes.findIndex(node => node.id === partner.id)
          if (nodeIndex === -1) {
            nodes.push(organizationNode(partner.id, partner.name))
          }
          // add project--partner edges
          const edgeIndex = edges.findIndex(edge => edge.source === group.id && edge.target === partner.id)
          if (edgeIndex === -1) {
            edges.push({ source: group.id, target: partner.id, value: 10 })
          }
        })
      }

      if (group.funding) {
        group.funding.forEach(funder => {
          // add funder node
          const nodeIndex = nodes.findIndex(node => node.id === funder.id)
          if (nodeIndex === -1) {
            nodes.push(organizationNode(funder.id, funder.name))
          }
          // add project--funder edges
          const edgeIndex = edges.findIndex(edge => edge.source === group.id && edge.target === funder.id)
          if (edgeIndex === -1) {
            edges.push({ source: group.id, target: funder.id, value: 15 })
          }
        })
      }
      if (group.projects) {
        group.projects.forEach(project => {
          // add project node
          const nodeIndex = nodes.findIndex(node => node.id === project.id)
          if (nodeIndex === -1) {
            nodes.push(projectNode(project.id, project.name))
          }

          // add group--project edges
          const edgeIndex = edges.findIndex(edge => edge.source === group.id && edge.target === project.id)
          if (edgeIndex === -1) {
            edges.push({ source: group.id, target: project.id, value: 5 })
          }

          if (project.partners) {
            project.partners.forEach(partner => {
              // add partner node
              const nodeIndex = nodes.findIndex(node => node.id === partner.id)
              if (nodeIndex === -1) {
                nodes.push(organizationNode(partner.id, partner.name))
              }
              // add project--partner edges
              const edgeIndex = edges.findIndex(edge => edge.source === project.id && edge.target === partner.id)
              if (edgeIndex === -1) {
                edges.push({ source: project.id, target: partner.id, value: 10 })
              }
            })
          }

          if (project.funding) {
            project.funding.forEach(funder => {
              // add funder node
              const nodeIndex = nodes.findIndex(node => node.id === funder.id)
              if (nodeIndex === -1) {
                nodes.push(organizationNode(funder.id, funder.name))
              }
              // add project--funder edges
              const edgeIndex = edges.findIndex(edge => edge.source === project.id && edge.target === funder.id)
              if (edgeIndex === -1) {
                edges.push({ source: project.id, target: funder.id, value: 15 })
              }
            })
          }
        })
      }
    })
    console.log(nodes)
    console.log(edges)
    setNetworkData({ nodes: nodes, links: edges })
  }, [])

  return (
    <Wrapper>
      {
        networkData.nodes && networkData.links && (
          <ForceGraph2D
            height={ 800 }
            width={ 750 }
            graphData={ networkData }
            nodeLabel={ node => node.name }
            nodeVal={ node => node.val }
            nodeRelSize={ 3 }
            nodeColor={ node => node.color }
            onNodeClick={
              node => {
                console.log(node)
              }
            }
          />
        )
      }
    </Wrapper>
  )
}

const collaborationsQuery = graphql`{
  groups: allGroupsYaml {
    edges {
      node {
        id
        name
        projects {
          id
          name
          partners {
            id
            name
          }
          funding {
            id
            name
          }
        }
      }
    }
  }
  collaborations: allCollaborationsYaml {
    edges {
      node {
        id
        name
        partners {
            id
            name
        }
        funding {
            id
            name
        }
        projects {
          id
          name
          partners {
            id
            name
          }
          funding {
            id
            name
          }
        }
      }
    }
  }
}`