import React, { Fragment } from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { Heading } from '../typography'
import { Container as Grid, Row, Col, Visible } from 'react-grid-system'
import { ArrowLink } from '../link'

const Wrapper = styled.article`
    // border: 1px solid #f99; * { border: 1px solid #99f; }
    margin: 1rem 0;
    padding: 0 !important;
`

const ArticleDate = styled.h2`
    font-size: 95%;
    font-weight: bold;
    text-transform: uppercase;
    margin: 0;
    line-height: 2.35;
`

const ArticleTitle = styled(Heading)(({ theme }) => `
    color: ${ theme.color.darkgrey };
`)

const BodyContainer = styled.div`
    overflow-y: hidden;
    padding: 1rem 0;
    @media (min-width: 992px) {
        padding: 0 1rem;
    }
    position: relative;
    &::after {
        content: "";
        position: absolute;
        background-image: linear-gradient(#ffffff00, #ffffff);
        bottom: 0;
        left: 0;
        right: 0;
        height: 3rem;
        max-height: 3rem;
    }
`

export const Spotlight = ({ article }) => {
    const hasFeaturedImage = article.frontmatter.featuredImage !== null
    return (
        <Grid component={ Wrapper } fluid>
            <Row nogutter>
                {
                    hasFeaturedImage && (
                        <Fragment>
                            <Visible xs sm md>
                                <Col xs={ 12 } style={{ textAlign: 'left' }}>
                                    <Img
                                        fluid={ article.frontmatter.featuredImage.childImageSharp.fullSize }
                                        imgStyle={{ width: 'auto', height: '100%' }}
                                        alt="Featured image"
                                    />
                                </Col>
                            </Visible>
                            <Visible lg xl>
                                <Col lg={ 6 }>
                                    <Img
                                        fixed={ article.frontmatter.featuredImage.childImageSharp.previewSize }
                                        style={{ width: '100%', height: '350px' }}
                                        alt="Featured image"
                                    />
                                </Col>
                            </Visible>
                        </Fragment>
                    )
                }
                <Col xs={ 12 } lg={ hasFeaturedImage ? 6 : 12 }>
                    <BodyContainer>
                        <ArticleDate>{ article.frontmatter.publish_date }</ArticleDate>
                        <ArticleTitle>{ article.frontmatter.title }</ArticleTitle>
                        <div dangerouslySetInnerHTML={{ __html: article.excerpt }} />
                    </BodyContainer>
                    <ArrowLink to={ article.path } text="Continue Reading" float="right" />
                </Col>
            </Row>
        </Grid>
    )
}
