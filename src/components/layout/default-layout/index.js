import React, { useEffect, useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { Header }from './header'
import { Main } from './main'
import { Footer } from './footer'
import { Container } from '../container'
import { Menu, MobileMenu, ResearchSubmenu } from '../../menu'
import { Link } from '../../link'
import { useBrand, useWindow } from '../../../hooks'
import { Container as Grid, Row, Col } from 'react-grid-system'
import { asciiLogo } from '../../../data/ascii-logo'

import "../../../styles/base.css"

export const Page = styled.div(({ theme }) => `
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    color: ${ theme.color.primary.main };
    width: 100%;
    margin: auto;
    // overflow: auto;
`)

const FooterContents = () => {
    const { light: logo } = useBrand()

    return (
        <Grid fluid>
            <Row>
                <Col xs={ 12 }>
                    <Img fixed={ logo } style={{ width: '82.5px', height: '54px', margin: 0 }} /> <br/>
                </Col>
                <Col xs={ 12 } md={ 6 } lg={ 3 }>
                    <p>
                        RENCI Anchor at Europa Center <br/>
                        100 Europa Drive, Suite 540 <br/>
                        Chapel Hill, NC  27517
                    </p>
                    <p>media@renci.org</p>
                    <p>919-445-9540</p>
                </Col>
                <Col xs={ 12 } md={ 6 } lg={ 3 }>
                    <strong>More</strong>
                    <p>
                        <Link to="/about">About</Link> <br/>
                        <Link to="/branding">Branding</Link> <br/>
                        <Link to="/careers">Careers</Link> <br/>
                        Room Reservations
                    </p>
                </Col>
                <Col xs={ 12 } md={ 6 } lg={ 3 }>
                    <strong>Partners</strong>
                    <p>
                        <Link to="https://www.unc.edu/">UNC-Chapel Hill</Link> <br/>
                        <Link to="https://www.ncsu.edu/">NC State University</Link> <br/>
                        <Link to="https://duke.edu/">Duke University</Link>
                    </p>
                </Col>
                <Col xs={ 12 } md={ 6 } lg={ 3 }>
                    <strong>Connect</strong>
                    <p>
                        Twitter <br/>
                        Facebook <br/>
                        LinkedIn <br/>
                        Instagram <br/>
                        YouTube <br/>
                        RSS
                    </p>
                </Col>
                <Col xs={ 12 }>
                    &copy; { new Date().getFullYear() }
                </Col>
            </Row>
        </Grid>
    )
}

const menuItems = [
    { path: '/about', text: 'About' },
    { path: '/research', text: 'Research', submenu: ResearchSubmenu },
    { path: '/people', text: 'People' },
    { path: '/news', text: 'News' },
    // { path: '/events', text: 'Events' },
    // { path: '/publications', text: 'Publications' },
]

export const DefaultLayout = ({ children, currentPath }) => {
    const { windowWidth } = useWindow()
    const [darkHeader, setDarkHeader] = useState(1)
    const [compact, setCompact] = useState(windowWidth < 1000)
    const logos = useBrand()

    useEffect(() => console.log(asciiLogo), [])

    useEffect(() => setCompact(windowWidth < 1000), [windowWidth])

    useLayoutEffect(() => {
        setDarkHeader(currentPath === '/' ? 1 : 0)
    }, [currentPath])

    return (
        <Page>
            <Header dark={ darkHeader }>
                <Link to="/" alt="Navigate to RENCI Home">
                    {
                        darkHeader
                        ? <Img fixed={ logos.dark } style={{ width: '180px', margin: '6px 1rem' }} imgStyle={{ width: 'auto', height: '100%' }} alt="Navigate to RENCI Home" />
                        : <Img fixed={ logos.light } style={{ width: '180px', margin: '6px 1rem' }} imgStyle={{ width: 'auto', height: '100%' }} alt="Navigate to RENCI Home" />
                    }
                </Link>
                { compact ? <MobileMenu items={ menuItems } /> : <Menu items={ menuItems } dark={ darkHeader } /> }
            </Header>
            <Main>{ children }</Main>
            <Footer>
                <Container>
                    <FooterContents />
                </Container>
            </Footer>
        </Page>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
}
