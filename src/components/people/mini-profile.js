import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { Subheading, Meta } from '../typography'

const Wrapper = styled.div`
  flex: 1;
  max-width: 200px;
  margin: 0;
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

const Name = styled(Subheading)`
  font-size: 110%;
  line-height: 1.5;
`

const StaffTitle = styled(Meta)`
  font-size: 80%;
`

export const MiniProfile = ({ name, title, path, photo, anchorId }) => {
  return (
    <Wrapper>
      { anchorId && <Anchor id={ anchorId } /> }
      <Link to={ path }>
        <Img style={{ height: '200px', width: '200px' }} fixed={ photo } />
        <Name>{ name }</Name>
      </Link>
      <StaffTitle>{ title }</StaffTitle>
    </Wrapper>
  )
}
