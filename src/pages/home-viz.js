import React, { Fragment } from "react"
import styled from 'styled-components'
import { SEO } from '../components/seo'
import { Link } from 'gatsby'
import { Container } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import HomeGraphic from '../images/home-graphic.png'

const LearnMoreButton = styled(Link)``

const HomeVizPage = () => {
  return (
    <Container>
      <SEO title="Home Page Visualization" />

      <Title>Home Page Visualization</Title>

      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Paragraph>

    </Container>
  )
}

export default HomeVizPage
