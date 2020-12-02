import React, { useCallback, useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import loadable from '@loadable/component'

const ForceGraph2D = loadable(() => import('./force-graph'))

const Wrapper = styled.div(({ theme }) => `
  margin: 2rem 0;
  border: 1px solid #eee;
  overflow: hidden;
  & canvas circle {
    cursor: pointer;
  }
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
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] })
  const groups = data.groups.edges.map(({ node }) => node)
  const collaborations = data.collaborations.edges.map(({ node }) => node)
  const [selectedNodeIDs, setSelectedNodeIDs] = useState(new Set())

  const groupNode = useCallback((id, name) => ({
    type: 'group',
    id: id,
    name: name,
    color: {
      main: theme.color.renciBlue,
      dim: `${ theme.color.renciBlue }99`,
    },
    val: 20,
  }), [theme.color])

  const collaborationNode = useCallback((id, name) => ({
    type: 'collaboration',
    id: id,
    name: name,
    color: {
      main: theme.color.carolinaBlue,
      dim: `${ theme.color.carolinaBlue }99`,
    },
    val: 20,
  }), [theme.color])

  const projectNode = useCallback((id, name) => ({
    type: 'project',
    id: id,
    name: name,
    color: {
      main: theme.color.extended.contessa,
      dim: `${ theme.color.extended.contessa }99`,
    },
    val: 10,
  }), [theme.color])

  const organizationNode = useCallback((id, name) => ({
    type: 'organization',
    id: id,
    name: name,
    color: {
      main: theme.color.extended.sherbet,
      dim: `${ theme.color.extended.sherbet }99`,
    },
    val: 5,
  }), [theme.color])

  const indicentEdges = useCallback(node => {
    return graphData.links.filter(({ source, target }) => source.id === node.id || target.id === node.id)
  }, [graphData])

  useEffect(() => console.log(graphData), [graphData])

  useEffect(() => {
    let nodes = []
    let edges = []

    // add group & collaboration nodes
    groups.forEach(group => nodes.push(groupNode(group.id, group.name)))
    collaborations.forEach(collaboration => nodes.push(collaborationNode(collaboration.id, collaboration.name)))

    groups.concat(collaborations).forEach(group => {
      if (group.partners) {
        group.partners.forEach(partner => {
          // add partner node & project--partner edges
          nodes.findIndex(node => node.id === partner.id) === -1 && nodes.push(organizationNode(partner.id, partner.name))
          edges.findIndex(edge => edge.source === group.id && edge.target === partner.id) === -1 && edges.push({ source: group.id, target: partner.id, value: 10 })
        })
      }

      if (group.funding) {
        group.funding.forEach(funder => {
          // add funder node & project--funder edges
          nodes.findIndex(node => node.id === funder.id) === -1 && nodes.push(organizationNode(funder.id, funder.name))
          edges.findIndex(edge => edge.source === group.id && edge.target === funder.id) === -1 && edges.push({ source: group.id, target: funder.id, value: 15 })
        })
      }
      if (group.projects) {
        group.projects.forEach(project => {
          // add project node & group--project edges
          nodes.findIndex(node => node.id === project.id) === -1 && nodes.push(projectNode(project.id, project.name))
          edges.findIndex(edge => edge.source === group.id && edge.target === project.id) === -1 && edges.push({ source: group.id, target: project.id, value: 5 })

          if (project.partners) {
            project.partners.forEach(partner => {
              // add partner node & project--partner edges
              nodes.findIndex(node => node.id === partner.id) === -1 && nodes.push(organizationNode(partner.id, partner.name))
              edges.findIndex(edge => edge.source === project.id && edge.target === partner.id) === -1 && edges.push({ source: project.id, target: partner.id, value: 10 })
            })
          }

          if (project.funding) {
            project.funding.forEach(funder => {
              // add funder node & project--funder edges
              nodes.findIndex(node => node.id === funder.id) === -1 && nodes.push(organizationNode(funder.id, funder.name))
              edges.findIndex(edge => edge.source === project.id && edge.target === funder.id) === -1 && edges.push({ source: project.id, target: funder.id, value: 15 })
            })
          }
        })
      }
    })
    setGraphData({ nodes: nodes, links: edges })
  }, [])

  const highlightNode = useCallback(({ id, x, y, val, color }, context) => {
    context.fillStyle = '#222'
    context.beginPath()
    context.arc(x, y, Math.sqrt(15 * val), 0, 2 * Math.PI, false)
    context.lineWidth = 1
    context.strokeStyle = '#333'
    context.stroke()
    context.fill()
  }, [selectedNodeIDs])

  const handleNodeClick = node => {
    setSelectedNodeIDs(new Set())
    if (!node) return
    console.log(node)
    let neighbors = new Set()
    indicentEdges(node).forEach(edge => {
      if (!neighbors.has(edge.source.id)) { neighbors.add(edge.source.id) }
      if (!neighbors.has(edge.target.id)) { neighbors.add(edge.target.id) }
    })
    setSelectedNodeIDs(JSON.stringify([...neighbors].sort()) === JSON.stringify([...selectedNodeIDs].sort()) ? new Set() : neighbors)
  }

  return (
    <Wrapper>
      {
        graphData.nodes && graphData.links && (
          <ForceGraph2D
            height={ 800 }
            width={ 750 }
            graphData={ graphData }
            nodeLabel={ node => node.name }
            nodeVal={ node => node.val }
            nodeRelSize={ 3 }
            nodeColor={ node => selectedNodeIDs.size ? selectedNodeIDs.has(node.id) ? node.color.main : node.color.dim : node.color.main }
            linkColor={ edge => selectedNodeIDs.size  ? (selectedNodeIDs.has(edge.source.id) && selectedNodeIDs.has(edge.target.id)) ? `#666` : `#ccc` : `#999`}
            onNodeClick={ handleNodeClick }
            nodeCanvasObjectMode={ node => selectedNodeIDs.has(node.id) ? 'before' : undefined }
            nodeCanvasObject={ highlightNode }
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