import React, { useCallback, useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { Button } from '../buttons'
import loadable from '@loadable/component'

const ForceGraph2D = loadable(() => import('./force-graph'))

const equalArrays = (arr1, arr2) => JSON.stringify([...arr1].sort()) === JSON.stringify([...arr2].sort())

const Wrapper = styled.div(({ theme }) => `
  border: 1px solid ${ theme.color.grey };
  margin: 2rem 0;
  overflow: hidden;
  display: flex;
  & .graph-tooltip {
    font-size: 66% !important;
    text-align: center;
    background-color: ${ theme.color.black } !important;
    padding: ${ theme.spacing.xs } !important;
    line-height: 1.5 !important;
  }
  & .legend {
    border-right: 1px solid ${ theme.color.grey };
    padding: ${ theme.spacing.medium };
    & > button {
      margin: ${ theme.spacing.medium } 0;
      &:first-child { margin-top: 0; }
      &:last-child { margin-bottom: 0; }
    }
  }
  & .graph {
    flex: 1;    
  }
`)

export const CollaborationsNetwork = ({ height = 800, width = 750 }) => {
  const theme = useTheme()
  const data = useStaticQuery(collaborationsQuery)
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] })
  const groups = data.groups.edges.map(({ node }) => node)
  const collaborations = data.collaborations.edges.map(({ node }) => node)
  const [selectedNodes, setSelectedNodes] = useState(new Set())
  const [selectedRootNode, setSelectedRootNode] = useState(null)
  const [fundingParticles, setFundingParticles] = useState(false)

  const nodeStyles = {
    person: {
      val: 20,
      color: {
        main: theme.color.renciBlue,
        dim: `${ theme.color.renciBlue }99`,
      },
    },
    group: {
      val: 20,
      color: {
        main: theme.color.renciBlue,
        dim: `#66ACBA`,
      },
    },
    collaboration: {
      val: 20,
      color: {
        main: theme.color.carolinaBlue,
        dim: `#93C3E4`,
      },
    },
    project: {
      val: 10,
      color: {
        main: theme.color.extended.contessa,
        dim: `#DAA59D`,
      },
    },
    organization: {
      val: 5,
      color: {
        main: theme.color.extended.sherbet,
        dim: `#FFCBAA`,
      },
    },
  }

  const edgeStyles = {
    'group-project': {
      color: {
        main: theme.color.renciBlue,
        dim: `${ theme.color.renciBlue }99`,
      }
    },
    'collaboration-project': {
      color: {
        main: theme.color.black,
        dim: `${ theme.color.black }99`,
      }
    },
    'partner': {
      color: {
        main: theme.color.extended.contessa,
        dim: `${ theme.color.extended.contessa }66`,
      }
    },
    'funding': {
      color: {
        main: theme.color.extended.sherbet,
        dim: `${ theme.color.extended.sherbet }66`,
      },
      particle: {
        color: theme.color.extended.orange,
      }
    },
  }

  const getNeighborhood = node => {
    if (!node) return 
    let neighborhood = new Set()
    indicentEdges(node).forEach(edge => {
      if (!neighborhood.has(edge.source)) { neighborhood.add(edge.source) }
      if (!neighborhood.has(edge.target)) { neighborhood.add(edge.target) }
    })
    return neighborhood
  }

  const indicentEdges = useCallback(node => {
    return graphData.links.filter(({ source, target }) => source.id === node.id || node.id === target.id)
  }, [graphData])

  const nodeHighlight = useCallback(({ x, y, val }, context) => {
    context.fillStyle = '#fff'
    context.beginPath()
    context.arc(x, y, Math.sqrt(15 * val), 0, 2 * Math.PI, false)
    context.lineWidth = 1
    context.strokeStyle = '#f33'
    context.stroke()
    // context.shadowOffsetX = 2
    // context.shadowOffsetY = 2
    // context.shadowBlur = 2
    // context.shadowColor = "rgba(0, 0, 0, 0.5)";
    context.fill()
  }, [selectedNodes])

  const handleNodeClick = node => {
    if (selectedRootNode && selectedRootNode === node) {
      setSelectedRootNode(null)
      setSelectedNodes(new Set())
    } else {
      setSelectedRootNode(node)
    }
  }
  
  //

  const createNode = useCallback((type, id, name) => ({ id: id, name: name, type: type, ...nodeStyles[type] }), [theme.color])
  const createEdge = useCallback((edgeType, sourceID, targetID) => ({ type: edgeType, source: sourceID, target: targetID, value: 10 }), [theme.color])

  useEffect(() => {
    let nodes = []
    let edges = []

    // add group & collaboration nodes
    groups.forEach(group => nodes.push(createNode('group', group.id, group.name)))
    collaborations.forEach(collaboration => nodes.push(createNode('collaboration', collaboration.id, collaboration.name)))

    groups.concat(collaborations).forEach(group => {
      if (group.partners) {
        group.partners.forEach(partner => {
          // add partner node & project--partner edges
          nodes.findIndex(node => node.id === partner.id) === -1 && nodes.push(createNode('organization', partner.id, partner.name))
          edges.findIndex(edge => edge.source === group.id && edge.target === partner.id) === -1 && edges.push(createEdge('partner', group.id, partner.id))
        })
      }

      if (group.funding) {
        group.funding.forEach(funder => {
          // add funder node & project--funder edges
          nodes.findIndex(node => node.id === funder.id) === -1 && nodes.push(createNode('organization', funder.id, funder.name))
          edges.findIndex(edge => edge.source === group.id && edge.target === funder.id) === -1 && edges.push(createEdge('funding', group.id, funder.id))
        })
      }
      if (group.projects) {
        group.projects.forEach(project => {
          // add project node & group--project edges
          nodes.findIndex(node => node.id === project.id) === -1 && nodes.push(createNode('project', project.id, project.name))
          edges.findIndex(edge => edge.source === group.id && edge.target === project.id) === -1 && edges.push(createEdge('group-project', group.id, project.id))

          if (project.partners) {
            project.partners.forEach(partner => {
              // add partner node & project--partner edges
              nodes.findIndex(node => node.id === partner.id) === -1 && nodes.push(createNode('organization', partner.id, partner.name))
              edges.findIndex(edge => edge.source === project.id && edge.target === partner.id) === -1 && edges.push(createEdge('partner', project.id, partner.id))
            })
          }

          if (project.funding) {
            project.funding.forEach(funder => {
              // add funder node & project--funder edges
              nodes.findIndex(node => node.id === funder.id) === -1 && nodes.push(createNode('organization', funder.id, funder.name))
              edges.findIndex(edge => edge.source === project.id && edge.target === funder.id) === -1 && edges.push(createEdge('funding', project.id, funder.id))
            })
          }
        })
      }
    })
    setGraphData({ nodes: nodes, links: edges })
  }, [])

  useEffect(() => {
    setSelectedNodes(new Set())
    if (!selectedRootNode) return
    let neighborhood = getNeighborhood(selectedRootNode)
    setSelectedNodes(equalArrays(neighborhood, selectedNodes) ? new Set() : neighborhood)
  }, [selectedRootNode])

  const edgeParticles = d => {
    switch (d.type) {
      case 'funding':
        return 10
      default:
        return 0
    }
  }

  const edgeParticlesSpeed = d => {
    switch (d.type) {
      case 'funding':
        return 1 - d.value * 0.0001
      default:
        return 0
    }
  }

  return (
    <Wrapper>
      <div className="legend">
        <Button small variant={ fundingParticles ? 'warning' : '' } style={{ width: '100%' }} onClick={ () => setFundingParticles(!fundingParticles) }>Funding</Button>
      </div>
      <div className="graph">
        {
          graphData.nodes && graphData.links && (
            <ForceGraph2D
              height={ height }
              width={ width }
              graphData={ graphData }
              nodeLabel={ node => node.name }
              nodeVal={ node => node.val }
              nodeRelSize={ 3 }
              nodeColor={ node => selectedNodes.size ? selectedNodes.has(node) ? node.color.main : node.color.dim : node.color.main }
              linkColor="black"
              linkWidth={ edge => selectedNodes.size ? (selectedNodes.has(edge.source) && selectedNodes.has(edge.target)) ? 1.5 : 0.5 : 1.5 }
              onNodeClick={ handleNodeClick }
              nodeCanvasObjectMode={ node => selectedRootNode === node ? 'before' : undefined }
              nodeCanvasObject={ nodeHighlight }
              linkDirectionalParticles={ fundingParticles ? edgeParticles : null }
              linkDirectionalParticleSpeed={ fundingParticles ? edgeParticlesSpeed : null }
              linkDirectionalParticleColor={ e => fundingParticles && edgeStyles[e.type].particle.color }
              linkLineDash={ e => e.type === 'partner' ? [2, 2] : [1,0] }
            />
          )
        }
      </div>
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