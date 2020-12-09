import React from 'react'
import { SEO } from '../components/seo'
import { Container, Article, Section } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { List } from '../components/list'
import { ArrowLink } from '../components/link'
import { useOrganizations } from '../hooks'
import { OrganizationsList } from '../components/organizations'
import { CollaborationsNetwork } from '../components/viz'

const TeamSciencePage = () => {
  const organizations = useOrganizations()
  return (
    <Container>
      <SEO title="Team Science at RENCI" />
  
      <Title>Team Science at RENCI</Title>

      <CollaborationsNetwork width={ 950 } height={ 600 } />

    </Container>
  )
}

export default TeamSciencePage
