import React, { Fragment, useEffect, useState } from 'react'
import { SEO } from '../components/seo'
import { Container, Section, HorizontalRule } from '../components/layout'
import { Title } from '../components/typography'
import { useNews } from '../hooks'
import { ArticlePreview } from '../components/news'
import { NewsFilterForm } from '../components/news'

const NewsPage = () => {
    const articles = useNews()
    const [projectId, setProjectId] = useState('')
    const [groupId, setGroupId] = useState('')
    const [filteredNews, setFilteredNews] = useState(articles)

    const handleGroupChange = event => setGroupId(event.target.value)
    const handleProjectChange = event => setProjectId(event.target.value)

    useEffect(() => {
        if (groupId || projectId) {
            let newArticles = [...articles]
            if (groupId) {
                newArticles = newArticles.filter(article => article.frontmatter.groups.map(g => g.id).includes(groupId))
            }
            if (projectId) {
                newArticles = newArticles.filter(article => article.frontmatter.projects.map(p => p.id).includes(projectId))
            }
            setFilteredNews(newArticles)
        } else {
            setFilteredNews(articles)
        }
    }, [articles, groupId, projectId])

    return (
        <Container className="container">
            <SEO title="RENCI News" />
            
            <Title>RENCI News</Title>
            
            <HorizontalRule />
            
            <NewsFilterForm
                projectId={ projectId }
                changeProjectHandler={ handleProjectChange }
                groupId={ groupId }
                changeGroupHandler={ handleGroupChange }
            />
            
            <Section fullWidth>
                {
                    filteredNews.map((article, i) => (
                        <Fragment key={ article.id }>
                            <ArticlePreview article={ article } path={ article.path } />
                            { i < articles.length - 1 && <HorizontalRule /> }
                        </Fragment>
                    ))
                }
            </Section>

        </Container>
    )
}

export default NewsPage
