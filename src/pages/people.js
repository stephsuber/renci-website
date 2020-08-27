import React, { useEffect } from "react"
import { SEO } from '../components/seo'
import { usePeople } from '../hooks'
import { Container, Section } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
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
            
            <Title>The RENCI Team</Title>
            
            <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                A, necessitatibus debitis sunt laboriosam, id vel molestias vero
                asperiores officiis impedit delectus eveniet dolores itaque est velit eos repellendus,
                esse veniam soluta doloribus voluptatum reiciendis.
                Excepturi hic corporis labore molestiae assumenda vitae nemo quas deleniti dolore aspernatur,
                maxime ipsam maiores iusto laborum consectetur culpa dolorum neque veniam repudiandae fuga inventore enim!
                Ratione enim explicabo odio minima possimus, laborum, quo voluptates harum sit magnam quos veniam voluptatem modi.
                Laborum accusantium voluptatem atque sint asperiores molestias quaerat voluptates.
                Laudantium reiciendis omnis explicabo voluptas, exercitationem error accusantium magnam,
                dolorum possimus nihil perferendis necessitatibus corrupti!
            </Paragraph>

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
