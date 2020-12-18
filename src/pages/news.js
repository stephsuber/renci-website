import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { SEO } from '../components/seo'
import styled from 'styled-components'
import { useLocation } from '@reach/router'
import { Container, Section, HorizontalRule } from '../components/layout'
import { Title } from '../components/typography'
import { useNews, useWindow } from '../hooks'
import { ArticlePreview, NewsFilterForm, PaginationTray, NewsContext } from '../components/news'

// constants
const PER_PAGE = 10
const PAGINATION_RADIUS = {
  mobile: 1,
  desktop: 3,
}
const INITIAL_FILTERS = {
  group: '',
  project: '',
}

const FlexHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 1000px) {
    flex-direction: row;
    align-items: flex-end;
  }
`

const NewsPage = () => {
  const location = useLocation()
  const { windowWidth } = useWindow()
  const articles = useNews() // all articles
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [filteredArticles, setFilteredArticles] = useState(articles)
  const [news, setNews] = useState([]) // articles to render
  const [page, setPage] = useState(1) // page number currently viewing
  const [paginationRadius, setPaginationRadius] = useState(PAGINATION_RADIUS.mobile)

  const filterChange = filterKey => event => {
    setFilters({ ...filters, [filterKey]: event.target.value })
    setPage(1)
  }

  const pageCount = useMemo(() => Math.ceil(filteredArticles.length / PER_PAGE), [filteredArticles.length])
  const prevPage = useMemo(() => Math.max(1, page - 1), [page, pageCount])
  const nextPage = useMemo(() => Math.min(pageCount, page + 1), [page, pageCount])

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    setPage(+queryParams.get('page') || 1)
  }, [location])

  useEffect(() => {
    setPaginationRadius(windowWidth < 600 ? PAGINATION_RADIUS.mobile : PAGINATION_RADIUS.desktop)
  }, [windowWidth])

  useEffect(() => {
    let newArticles = [...articles]
    if (filters.group || filters.project) {
      if (filters.group) {
        newArticles = newArticles.filter(article => article.frontmatter.groups.map(g => g.id).includes(filters.group))
      }
      if (filters.project) {
        newArticles = newArticles.filter(article => article.frontmatter.projects.map(p => p.id).includes(filters.project))
      }
    }
    setFilteredArticles(newArticles)
  }, [page, filters])

  useEffect(() => {
    const pageOfNews = filteredArticles.slice((page - 1) * PER_PAGE, page * PER_PAGE)
    setNews(pageOfNews)
  }, [page, filteredArticles])

  // debugging
  useEffect(() => console.table(filters), [filters])
  useEffect(() => console.log(filteredArticles), [filters])
  useEffect(() => console.log('pageCount', pageCount), [pageCount, filters])
  
  //

  return (
    <Container className="container">
      <NewsContext.Provider value={{ news, page, prevPage, nextPage, pageCount, paginationRadius, filters, filterChange }}>
        <SEO title="RENCI News" />
        
        <FlexHeader>
          <Title>RENCI News</Title>
          <PaginationTray />
        </FlexHeader>
        
        <HorizontalRule />

        <NewsFilterForm />
        
        <Section fullWidth>
          {
            news.map((article, i) => (
              <Fragment key={ article.id }>
                <ArticlePreview article={ article } path={ article.path } />
                { i < articles.length - 1 && <HorizontalRule /> }
              </Fragment>
            ))
          }
        </Section>
      </NewsContext.Provider>
    </Container>
  )
}

export default NewsPage
