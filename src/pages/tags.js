import React, { Fragment } from 'react'
import { SEO } from '../components/seo'
import { Container, Article, Section } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { useTags } from '../hooks'

const TagsPage = () => {
  const tags = useTags()

  return (
    <Container>
      <SEO title="Tags" />

      <h1>Tags</h1>

      <pre>{ JSON.stringify(tags, null, 2) }</pre>

    </Container>
  )
}

export default TagsPage
