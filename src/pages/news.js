import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { SEO } from '../components/seo'
import styled, { useTheme } from 'styled-components'
import { navigate, useLocation } from '@reach/router'
import { Container, Section, HorizontalRule } from '../components/layout'
import { Title } from '../components/typography'
import { useNews, useWindow } from '../hooks'
import { ArticlePreview, NewsFilterForm, PaginationTray, NewsContext } from '../components/news'

// constants
const PER_PAGE = 10
const PAGINATION_RADIUS = {
  mobile: 1,
  desktop: 2,
}
const INITIAL_FILTERS = {
  group: '',
  project: '',
  topic: '',
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
  & nav svg {
    transition: opacity 250ms;
    opacity: 0.4;
  }
  &:hover svg {
    opacity: 1.0;
  }
`

const filtersUrl = (params, basePath = '/news') => {
  if (Object.values(params).join('') === '')
    return basePath
  const q = Object.keys(params)
    .filter(key => params[key] !== '')
    .map(key => `${ key }=${ params[key] }`).join('&')
  return basePath + '?' + q
}

const NewsPage = () => {
  const theme = useTheme()
  const location = useLocation()
  const { windowWidth } = useWindow()
  const articles = useNews() // all articles
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [filteredArticles, setFilteredArticles] = useState(articles)
  const [news, setNews] = useState([]) // articles to render
  const [page, setPage] = useState(1) // page number currently beingviewed
  const [paginationRadius, setPaginationRadius] = useState(PAGINATION_RADIUS.mobile)

  const changeFilterSelect = filterKey => event => {
    navigate(filtersUrl({ ...filters, page: 1, [filterKey]: event.target.value }))
  }

  const clearFilters = event => {
    setFilters(INITIAL_FILTERS)
    setPage(1)
  }

  const pageCount = useMemo(() => Math.ceil(filteredArticles.length / PER_PAGE), [filteredArticles.length])
  const prevPage = useMemo(() => Math.max(1, page - 1), [page, pageCount])
  const nextPage = useMemo(() => Math.min(pageCount, page + 1), [page, pageCount])

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const queryPage = +queryParams.get('page') || 1
    const queryGroup = queryParams.get('group') || ''
    const queryProject = queryParams.get('project') || ''
    const queryTopic = queryParams.get('topic') || ''
    setPage(queryPage)
    setFilters({
      ...filters,
      group: queryGroup,
      project: queryProject,
      topic: queryTopic,
    })
  }, [location.search])

  useEffect(() => {
    setPaginationRadius(windowWidth < 600 ? PAGINATION_RADIUS.mobile : PAGINATION_RADIUS.desktop)
  }, [windowWidth])

  useEffect(() => {
    let newArticles = [...articles]
    if (filters.group) {
      newArticles = newArticles.filter(article => {
        const groupMatch = article.frontmatter.groups && article.frontmatter.groups.findIndex(g => g.id === filters.group) > -1
        const collaborationMatch = article.frontmatter.collaborations && article.frontmatter.collaborations.findIndex(c => c.id === filters.group) > -1
        return groupMatch || collaborationMatch
      })
    }
    if (filters.project) {
      newArticles = newArticles.filter(article => article.frontmatter.projects && article.frontmatter.projects.map(p => p.id).includes(filters.project))
    }
    if (filters.topic) {
      newArticles = newArticles.filter(article => article.frontmatter.tags && article.frontmatter.tags.map(t => t.id).includes(filters.topic))
    }
    setFilteredArticles(newArticles)
  }, [page, filters])

  useEffect(() => {
    const pageOfNews = filteredArticles.slice((page - 1) * PER_PAGE, page * PER_PAGE)
    setNews(pageOfNews)
  }, [page, filteredArticles])

  //

  return (
    <Container className="container">
      <NewsContext.Provider value={{ news, page, prevPage, nextPage, pageCount, paginationRadius, filters, changeFilterSelect, clearFilters, filtersUrl }}>
        <SEO title="RENCI News" />
        
        <FlexHeader>
          <Title>RENCI News</Title>
          { pageCount > 1 && <PaginationTray /> }
        </FlexHeader>
        
        <HorizontalRule />

        <NewsFilterForm />
        
        <Section title={ `${ filteredArticles.length } News Item${ filteredArticles.length === 1 ? '' : 's' }` }>
          {
            news.map((article, i) => (
              <Fragment key={ article.id }>
                <ArticlePreview article={ article } path={ article.fields.path } />
                { i < articles.length - 1 && <HorizontalRule /> }
              </Fragment>
            ))
          }
        </Section>

        { pageCount > 0 && <PaginationTray /> }

        <br />

      </NewsContext.Provider>
    </Container>
  )
}

export default NewsPage
