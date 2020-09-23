import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { Title } from '../typography'
import { SocialLinks } from '../social-links'

const Wrapper = styled.div(({ theme }) => `
    display: grid;
    grid-template-columns: 100%;
    @media (min-width: 768px) {
        grid-template-columns: 380px auto;
    }
    column-gap: ${ theme.spacing.small };
    margin: ${ theme.spacing.large } 0;
`)

const PhotoContainer = styled.div(({ theme }) => `
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    justify-self: center;
    @media (min-width: 768px) {
        grid-row: 1 / 3;
        justify-self: start;
    }
    // margin: ${ theme.spacing.medium };
`)

const Details = styled.div`
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    justify-self: center;
    @media (min-width: 768px) {
        grid-row: 1 / 2;
        grid-column: 2 / 3;
        justify-self: start;
    }
`

const Detail = styled.p(({ theme, bold }) => `
    color: ${ theme.color.black };
    font-size: 150%;
    font-weight: ${ bold ? '500' : '100' };
`)

const Footer = styled.div`
    grid-row: 3 / 4;
    grid-column: 1 / 3;
    justify-self: center;
    @media (min-width: 768px) {
        grid-row: 2 / 3;
        grid-column: 2 / 3;
        justify-self: start;
    }
`

export const Profile = ({ name, title, email, www, photo, phone }) => {
    return (
        <Wrapper>
            <PhotoContainer>
                <Img style={{ width: '350px', height: '350px' }} fixed={ photo } />
            </PhotoContainer>
            <Details>
                <Title>{ name }</Title>
                <Detail>{ title }</Detail>
                <Detail bold><a href={ `mailto:${ email }` }>{ email }</a></Detail>
                <Detail>{ phone }</Detail>
            </Details>
            <Footer>
                <SocialLinks
                    url={ www.url }
                    twitter={ www.twitter }
                    github={ www.github }
                    instagram={ www.instagram }
                    linkedin={ www.linkedin }
                    youtube={ www.youtube }
                />                
            </Footer>
        </Wrapper>
    )
}

