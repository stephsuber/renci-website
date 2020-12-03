import React from 'react'
import { List } from '../list'

export const OrganizationsList = ({ contributors }) => {
  return (
    <List items={ contributors.map(({ name, url }) => <a key={ name } href={ url } target="_blank" rel="noopener noreferrer">{ name }</a>) } />
  )
}
