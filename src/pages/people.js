import React, { useEffect } from "react"
import { SEO } from '../components/seo'
import { usePeople } from '../hooks'
import { Container, Section } from '../components/layout'
import { Title } from '../components/typography'
import { StaffList } from '../components/people'

const PeoplePage = () => {
    const { staff, ood, management, chiefScientists } = usePeople()

    useEffect(() => {
        const handleKeyDown = event => {
            // only if the pressed key is that of a letter, a to z
            if (65 <= event.keyCode && event.keyCode <= 90) {
                // strip off the #anchor-id if there is one in the URL
                const [basePath, ] = window.location.href.split('#')
                // replace the window location with the current page, but a new #anchor-id
                window.location = `${ basePath }#${ event.key }`
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <Container>
            <SEO title="RENCI Staff" />
            
            <br />
            <Title>Our Team</Title>
            <br />
            
            <Section title="Office of the Director" fullWidth>
                <StaffList staff={ ood } />
            </Section>

            <Section title="Management Team" fullWidth>
                <StaffList staff={ management } />
            </Section>

            <Section title="Chief Scientists" fullWidth>
                <StaffList staff={ chiefScientists } />
            </Section>

            <Section title="All Staff" fullWidth>
                <StaffList staff={ staff } nav />
            </Section>

        </Container>
    )
}

export default PeoplePage
