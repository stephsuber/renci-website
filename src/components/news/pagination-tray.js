import React from 'react'
import styled from 'styled-components'
import { Link } from '../link'
import { Icon } from '../icon'
import { useNewsContext } from './news-context'
import { useLocation } from '@reach/router'

const Wrapper = styled.nav(({ theme }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${ theme.spacing.extraSmall };
`)

const PageLink = styled(Link)(({ theme }) => `
  text-decoration: none;
  padding: ${ theme.spacing.small } ${ theme.spacing.extraSmall };
  min-width: 2rem;
  text-align: center;
  border-radius 4px;
  font-size: 80%;
  transition: background-color 500ms, color 250ms;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${ theme.color.lightgrey };
  }
  &.active {
    transition: background-color 250ms, color 250ms;
    background-color: ${ theme.color.grey };
    color: ${ theme.color.white };
  }
`)

export const PaginationTray = () => {
  const { page, prevPage, nextPage, pageCount, paginationRadius, filters, filtersUrl } = useNewsContext()
  const location = useLocation()

  return (
    <Wrapper>
      <PageLink to={ filtersUrl({ page: 1, ...filters }) }><Icon icon="first-page" /></PageLink>
      <PageLink to={ filtersUrl({ page: prevPage, ...filters }) }><Icon icon="chevron-left" /></PageLink>
      <Icon icon="ellipsis" fill={ page > paginationRadius + 1 ? '#ccc' : 'transparent' } />

      {
        [...Array(pageCount).keys()].map(index => {
          // we only want three page links on either side f the current link if possible
          // for pages 1, 2, 3, this means shifting the viewing window accordingly:
          //  page 2: [1, (2), 3, 4, 5, 6, 7]
          //  page 3: [1, 2, (3), 4, 5, 6, 7]
          //  page 4: [1, 2, 3, (4), 5, 6, 7]
          //  page 5: [2, 3, 4, (5), 6, 7, 8]
          //  page 6: [3, 4, 5, (6), 7, 8, 9]
          const i = index + 1
          let minPage = page - paginationRadius
          let maxPage = page + paginationRadius
          
          // are we low in the pages?
          if (page <= paginationRadius) { [minPage, maxPage] = [1, 2 * paginationRadius + 1] }
          
          // are we near the end?
          if (page >= pageCount - paginationRadius) { [minPage, maxPage] = [pageCount - 2 * paginationRadius, pageCount]}
          
          // omit page links outsie out viewing window
          if (i < minPage || maxPage < i ) {
            return null
          }
          
          return (
            <PageLink
              key={ `page-${ i }` }
              to={ filtersUrl({ page: i, ...filters }) }
              className={ i === page ? 'active' : undefined }
            >
              { i }
            </PageLink>
          )
        })
      }
      <Icon icon="ellipsis" fill={ pageCount > 2 * paginationRadius - 1 && page < pageCount - paginationRadius ? '#ccc' : 'transparent' } />
      <PageLink to={ filtersUrl({ page: nextPage, ...filters }) }><Icon icon="chevron-right" /></PageLink>
      <PageLink to={ filtersUrl({ page: pageCount, ...filters }) }><Icon icon="last-page" /></PageLink>
    </Wrapper>
  )
}
