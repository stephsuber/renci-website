import React from 'react'
import styled from 'styled-components'
import { Container as Grid, Row, Col } from 'react-grid-system'
import { Heading } from '../../components/typography'
import { useCollaborations, useGroups } from '../../hooks'
import { ArrowLink } from '../../components/link'

const NavColumn = styled.div`
    padding: 1rem;
`

const NavHeading = styled(Heading)`
    font-size: 150% !important;
`

const NavList = styled.ul`
    list-style-type: none;
    margin: 0;
`

const NavListItem = styled.li`
    margin: 5px 0;
`

export const ResearchSubmenu = () => {
    const groups = useGroups()
    const collaborations = useCollaborations()

    return (
        <Grid fluid component="nav" style={{ width: '100%' }}>
            <Row>
                <Col xs={ 12 } md={ 6 } component={ NavColumn }>
                    <NavHeading>Research Groups</NavHeading>
                    <NavList style={{ listStyleType: 'none' }}>
                        { groups.map((group, i) => <NavListItem key={ group.id }><ArrowLink to={ `/research/${ group.id }` } text={ group.name } /></NavListItem>) }
                    </NavList>
                </Col>
                <Col xs={ 12 } md={ 6 } component={ NavColumn }>
                    <NavHeading>Collaborations & Team Science</NavHeading>
                    <NavList style={{ listStyleType: 'none' }}>
                        { collaborations.map((collaboration, i) => <NavListItem key={ collaboration.id }><ArrowLink to={ `/collaborations/${ collaboration.id }` } text={ collaboration.name } /></NavListItem>) }
                    </NavList>
                </Col>
            </Row>
        </Grid>
    )
}
