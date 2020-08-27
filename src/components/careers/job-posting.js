import React from 'react'
import { Article } from '../layout'
import { ArrowLink, ExternalLink } from '../link'

export const JobPosting = ({ title, publishDate, positionNumber, description, url }) => {
    return (
        <Article title={ title }>
            <div><ExternalLink to={ url }>#{ positionNumber }</ExternalLink></div>
            <div dangerouslySetInnerHTML={{ __html: description }} />
            <ArrowLink to={ url } text="Apply Now" float="right" />
            <br/>
        </Article>
    )
}
