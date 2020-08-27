import React, { Fragment } from 'react'
import { SEO } from '../components/seo'
import { Container, Section, HorizontalRule } from '../components/layout'
import { Title } from '../components/typography'
import { useNews } from '../hooks'
import { ArticlePreview } from '../components/news'
import { NewsFilterForm } from '../components/news'

const NewsPage = () => {
    const articles = useNews()

    return (
        <Container className="container">
            <SEO title="RENCI News" />
            
            <Title>News at RENCI</Title>
            
            <HorizontalRule />
            
            <NewsFilterForm />
            
            <Section fullWidth>
                {
                    articles.map((article, i) => {
                        return (
                            <Fragment key={ article.id }>
                                <ArticlePreview article={ article } path={ article.path } />
                                { i < articles.length - 1 && <HorizontalRule /> }
                            </Fragment>
                        )
                    })
                }
            </Section>

        </Container>
    )
}

export default NewsPage
