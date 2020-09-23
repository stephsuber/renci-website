import React, { Fragment } from 'react'
import { List } from '../list'

export const ContributorsList = ({ contributors }) => {
  return (
    <List items={ contributors.map(({ name, url }) => <a href={ url } target="_blank" rel="noopener noreferrer">{ name }</a>) } />
  )
}
