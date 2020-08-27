import React from 'react'
import { Container } from '../components/layout'
import { SEO } from '../components/seo'

const NotFoundPage = () => (
    <Container>
        <SEO title="404: Not found" />
        <h1>NOT FOUND</h1>
        <p>Keep moving. Nothing to see here.</p>
    </Container>
)

export default NotFoundPage
