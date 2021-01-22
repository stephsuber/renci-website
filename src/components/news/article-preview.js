import React, { Fragment } from 'react'
import styled, { useTheme } from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { Subheading } from '../typography'
import { Container as Grid, Row, Col, Visible } from 'react-grid-system'
import { ArrowLink } from '../link'
import { Tag, Label } from './tag'
import { NewsDate } from './news-date'

const Wrapper = styled.article`
  margin: 0 -1rem;
`


const ArticleTitle = styled(Subheading)(({ theme }) => `
  color: ${ theme.color.darkgrey };
  font-weight: normal;
  line-height: 1.25;
  font-size: 24px;
`)

const TitleContainer = styled.div`
  & .row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
`

const BodyContainer = styled.div`
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
    pointer-events: none;
  }
`

export const ArticlePreview = ({ article, path, compact = false }) => {
  const theme = useTheme()
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
              <div className="row">
                <NewsDate>{ article.frontmatter.publishDate }</NewsDate>
                &nbsp;&nbsp;
                <Label className="label">{ article.fields.newsType }</Label>
              </div>
              <Subheading className="title"><Link to={ path }>{ article.frontmatter.title }</Link></Subheading>
            </TitleContainer>
            <BodyContainer dangerouslySetInnerHTML={{ __html: article.excerpt }} />
            <ArrowLink to={ path } text="Continue Reading" float="right" />
          </Col>
        </Row>
      </Grid>
    </Wrapper>
  )
}
