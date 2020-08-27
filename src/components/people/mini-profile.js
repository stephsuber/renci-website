import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { Subheading, Meta } from '../typography'

const Wrapper = styled.div`
    flex: 1;
    max-width: 200px;
    margin: 1rem;
    & .gatsby-image-wrapper {
        transition: filter 250ms;
        filter: saturate(0.6);
    }
    &:hover .gatsby-image-wrapper {
        filter: saturate(0.9);
    }
`

const Anchor = styled.a`
    display: block;
    position: relative;
    top: -6rem;
    visibility: hidden;
`

const StaffName = styled(Subheading)`
    font-size: 110%;
`

const StaffTitle = styled(Meta)`
    font-size: 80%;
`

export const MiniProfile = ({ name, title, path, photo, anchorId }) => {
    return (
        <Wrapper>
            { anchorId && <Anchor id={ anchorId } /> }
            <Img style={{ height: '200px', width: '200px' }} fixed={ photo } />
            <StaffName><Link to={ path }>{ name }</Link></StaffName>
            <StaffTitle>{ title }</StaffTitle>
        </Wrapper>
    )
}
