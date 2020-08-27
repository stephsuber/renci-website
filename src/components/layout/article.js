import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

const Wrapper = styled.article`
    margin: 0;
`

const Header = styled.h3`
    font-weight: bold;
    // text-transform: uppercase;
    margin: 0;
    line-height: 2.35;
`

const Body = styled.div``

export const Article = ({ title, titleLink, children }) => {
    return (
        <Wrapper>
            {
                titleLink
                ? <Header><Link to={ titleLink }>{title}</Link></Header>
                : <Header>{title}</Header>
            }
            <Body>
                {children}
            </Body>
        </Wrapper>
    )
}


Article.propTypes = {
    title: PropTypes.string,
    titleLink: PropTypes.string,
    children: PropTypes.node,
}
