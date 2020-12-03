import React from 'react'
import { SEO } from '../components/seo'
import { Container, Section } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { useCareers } from '../hooks'
import { JobPosting } from '../components/careers'

const CareersPage = () => {
  const careers = useCareers()
  
  return (
    <Container>
      <SEO title="RENCI Careers" />
      
      <Title>Careers</Title>

      <Paragraph>
        RENCI's inclusive, creative ethod transcende disciplinary boundaries to catalyze data-driven discovery and innovation for the public good.
        A career at RENCI offers a stimulating, collaborative environment where you can unleash your intellectual potential to advance technology and accelereate research.
        We look forward to meeting you!
      </Paragraph>

      <Section title="Open Positions">
        {
          careers.map(posting => (
            <JobPosting
              key={ posting.id }
              title={ posting.frontmatter.title }
              publishDate={ posting.frontmatter.publish_date }
              positionNumber={ posting.frontmatter.unc_position_number }
              description={ posting.html }
              url={ `http://unc.peopleadmin.com/postings/${ posting.frontmatter.unc_position_number }` }
            />
          ))
        }
      </Section>

    </Container>
  )
}

export default CareersPage
