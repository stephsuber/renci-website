import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { Heading } from '../typography'
import { Container as Grid, Row, Col, Visible } from 'react-grid-system'
import { ArrowLink } from '../link'

const Wrapper = styled.article`
    margin: 0 -1rem;
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

const TitleContainer = styled.div``

const BodyContainer = styled.div`
    // border: 1px solid #f99;
    max-height: 150px;
    overflow-y: hidden;
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

export const ArticlePreview = ({ article, path, compact = false }) => {
    console.log(article)
    const hasFeaturedImage = (article.frontmatter.featuredImage !== null) && (compact === false)
    return (
        <Wrapper>
            <Grid fluid>
                <Row>
                    {
                        hasFeaturedImage && (
                            <Fragment>
                                <Visible sm>
                                    <Col xs={ 12 }>
                                        <Img
                                            fluid={ article.frontmatter.featuredImage.childImageSharp.fullSize }
                                            imgStyle={{ width: 'auto', height: '100%' }}
                                            alt="Featured image"
                                        />
                                    </Col>
                                </Visible>
                                <Visible md lg xl>
                                    <Col md={ 4 } lg={ 3 }>
                                        <Img
                                            fixed={ article.frontmatter.featuredImage.childImageSharp.previewSize }
                                            style={{ width: '100%', height: '250px' }}
                                            alt="Featured image"
                                        />
                                    </Col>
                                </Visible>
                            </Fragment>
                        )
                    }
                    <Col xs={ 12 } md={ hasFeaturedImage ? 8 : 12 } lg={ hasFeaturedImage ? 9 : 12 }>
                        <TitleContainer>
                            <ArticleDate>{ article.frontmatter.publish_date }</ArticleDate>
                            <ArticleTitle><Link to={ path }>{ article.frontmatter.title }</Link></ArticleTitle>
                        </TitleContainer>
                        <BodyContainer>
                            <div dangerouslySetInnerHTML={{ __html: article.excerpt }} />
                        </BodyContainer>
                        <ArrowLink to={ path } text="Continue Reading" float="right" />
                    </Col>
                </Row>
            </Grid>
        </Wrapper>
    )
}
